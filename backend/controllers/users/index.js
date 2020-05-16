require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { getConnection } = require("../../helpers/db");
const { sendConfirmationEmail } = require("../../helpers/email");

const {
	registrationSchema,
	loginSchema,
	userInfoSchema,
	editPasswordUserSchema,
} = require("../../validations/users");

const { generateError, processAndSavePhoto } = require("../../helpers");

// POST - /users/sendconfirmationemail
async function confirmationEmail(req, res, next) {}

// POST - /users/registration
async function registration(req, res, next) {
	let connection;
	try {
		// Validate body and extract data
		await registrationSchema.validateAsync(req.body);
		const {
			nick,
			password,
			seller,
			first_name,
			last_name,
			email,
			tlf,
			birthday,
			address_line1,
			address_line2,
			city,
			state,
			country,
		} = req.body;

		connection = await getConnection();

		// Check if nick and email exists on database
		const [
			existing,
		] = await connection.query(
			`SELECT nick, email FROM users WHERE (nick=? or email=?) and active=1`,
			[nick, email]
		);

		if (existing.length) {
			// Check what data exists
			let existingData;
			if (nick === existing[0].nick) {
				existingData = "nick";
			} else {
				existingData = "email";
			}

			throw generateError(
				`The ${existingData} already exists on database`,
				409
			);
		}

		//  If exists extract avatar picture and save it to uploads dir
		let savedFileName;
		if (req.files && req.files.photo) {
			try {
				savedFileName = await processAndSavePhoto(req.files.photo);
			} catch (error) {
				const imageError = new Error(
					"Can not process upload image. Try again."
				);
				imageError.httpCode = 400;
				throw imageError;
			}
		}

		// Hash password
		const passHash = await bcrypt.hash(password, 10);

		// Adding address data to database
		let addressId;
		if (address_line1 || address_line2 || city || state || country) {
			const addressEntry = await connection.query(
				`INSERT INTO address (line1, line2, city, state, country)
				VALUES (?, ?, ?, ?, ?)`,
				[address_line1, address_line2, city, state, country]
			);
			addressId = addressEntry[0].insertId;
		}

		// Adding user data to database
		const [newUser] = await connection.query(
			`INSERT INTO users (nick, pass_hash, role, first_name, last_name, email, tlf, avatar, birthday, last_modification_IP, id_address)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			[
				nick,
				passHash,
				seller ? "seller" : "client",
				first_name,
				last_name,
				email,
				tlf,
				savedFileName,
				birthday,
				req.ip,
				addressId,
			]
		);

		await sendConfirmationEmail(email, newUser.insertId);

		connection.release();
		res.send({
			stats: "ok",
			message:
				"Account created succesfuly, please confirm your email, it may be in the spam folder.",
			data: { id: newUser.insertId, ...req.body },
		});
	} catch (error) {
		next(error);
	} finally {
		if (connection) connection.release();
	}
}

// POST - /users/login
async function login(req, res, next) {
	let connection;
	try {
		await loginSchema.validateAsync(req.body);
		const { username, password } = req.body;

		connection = await getConnection();

		// Search for username on DB
		const [user] = await connection.query(
			`
		SELECT id, role, pass_hash, confirmation_code FROM users 
		WHERE (nick=? or email=?) and active=1`,
			[username, username]
		);

		if (!user.length) {
			throw generateError("Wrong username or password", 401);
		}

		if (user[0].confirmation_code) {
			throw generateError(
				"Please confirm your account before login. Check your spam folder, the email could end up there.",
				400
			);
		}

		// Compare password
		const passwordMatch = await bcrypt.compare(password, user[0].pass_hash);
		if (!passwordMatch) {
			throw generateError("Wrong username or password", 401);
		}

		// Generate JWT
		const tokenPaylaod = { id: user[0].id, role: user[0].role };
		const token = jwt.sign(tokenPaylaod, process.env.SECRET, {
			expiresIn: "30d",
		});

		res.send({ stats: "ok", message: "Login succesful", data: { token } });
	} catch (error) {
		next(error);
	} finally {
		if (connection) connection.release();
	}
}

// GET - /users/validate
async function validateUser(req, res, next) {
	let connection;
	try {
		const { code } = req.query;
		connection = await getConnection();

		const [
			result,
		] = await connection.query(
			`UPDATE users SET confirmation_code=NULL WHERE confirmation_code=?`,
			[code]
		);

		if (result.affectedRows === 0) {
			throw generateError(
				"The code introduced is not correct, please retry",
				400
			);
		}
		res.send({ status: "ok", message: "Email confirmed" });
	} catch (error) {
		next(error);
	} finally {
		if (connection) connection.release();
	}
}

// GET - /users/:id
async function infoUser(req, res, next) {
	let connection;
	try {
		const { id } = req.params;

		// Check if auth user is the same as :id or is admin
		if (!req.auth || !(id == req.auth.id || req.auth.role === "admin")) {
			throw generateError("You do not have access to this information", 401);
		}

		connection = await getConnection();
		const [result] = await connection.query(
			`SELECT u.id, u.nick, u.role, u.first_name, u.last_name, u.email, u.tlf, u.avatar, u.birthday, u.creation_date, a.line1, a.line2, a.city, a.state, a.country
			FROM users u left join address a on u.id_address=a.id WHERE u.id=? and active=1`,
			[id]
		);

		// Throw 404 if no results
		if (!result.length) {
			throw generateError(`There is no user with the id ${id}`, 404);
		}

		const [userData] = result;

		res.send({ state: "ok", data: userData });
	} catch (error) {
		next(error);
	} finally {
		if (connection) connection.release();
	}
}

// PUT - /users/:id
async function changeUserData(req, res, next) {
	let connection;
	try {
		const { id } = req.params;
		// Validate body and extract data
		await userInfoSchema.validateAsync(req.body);
		const {
			nick,
			first_name,
			last_name,
			email,
			tlf,
			birthday,
			address_line1,
			address_line2,
			city,
			state,
			country,
		} = req.body;

		// Check if auth user is the same as :id or is admin
		if (!req.auth || !(id == req.auth.id || req.auth.role === "admin")) {
			throw generateError("You don't have permissions to edit this user", 401);
		}

		connection = await getConnection();

		// Check if the id correspond to an existing user
		const [
			userToChange,
		] = await connection.query(
			`SELECT id, id_address FROM users WHERE id=? and active=1`,
			[id]
		);

		if (!userToChange.length) {
			throw generateError(
				"Not user found that corresponds the ip requested",
				404
			);
		}

		// Check if the new nick and new email exists on database
		const [
			existing,
		] = await connection.query(
			`SELECT nick, email FROM users WHERE (nick=? or email=?) and active=1`,
			[nick, email]
		);

		if (existing.length) {
			// Check what data exists
			let existingData;
			if (nick === existing[0].nick) {
				existingData = "nick";
			} else {
				existingData = "email";
			}

			throw generateError(
				`The ${existingData} already exists on database`,
				409
			);
		}

		//  If exists extract avatar picture and save it to uploads dir
		let savedFileName;
		if (req.files && req.files.photo) {
			try {
				savedFileName = await processAndSavePhoto(req.files.photo);
			} catch (error) {
				const imageError = new Error(
					"Can not process upload image. Try again."
				);
				imageError.httpCode = 400;
				throw imageError;
			}
		}

		// Update or insert address info
		let addressId;
		if (address_line1 || address_line2 || city || state || country) {
			// If already exists a address entry update it
			if (userToChange[0].id_address) {
				await connection.query(
					`UPDATE address SET 
					line1=COALESCE(?, line1),
					line2=COALESCE(?, line2),
					city=COALESCE(?, city),
					state=COALESCE(?, state),
					country=COALESCE(?, country)
					WHERE id=?
					`,
					[
						address_line1,
						address_line2,
						city,
						state,
						country,
						userToChange[0].id_address,
					]
				);

				// If it does not exist create it
			} else {
				const newAddressEntry = await connection.query(
					`INSERT INTO address (line1, line2, city, state, country)
					VALUES (?, ?, ?, ?, ?)`,
					[address_line1, address_line2, city, state, country]
				);
				addressId = newAddressEntry[0].insertId;
			}
		}

		// Updating user data to database
		await connection.query(
			`UPDATE users SET
				nick=COALESCE(?, nick),
				first_name=COALESCE(?, first_name),
				last_name=COALESCE(?, last_name),
				email=COALESCE(?, email),
				tlf=COALESCE(?, tlf),
				avatar=COALESCE(?, avatar),
				birthday=COALESCE(?, birthday),
				last_modification_date=NOW(),
				last_modification_IP=?,
				id_address=COALESCE(?, id_address)
				WHERE id=?`,
			[
				nick,
				first_name,
				last_name,
				email,
				tlf,
				savedFileName,
				birthday,
				req.ip,
				addressId,
				id,
			]
		);

		connection.release();
		res.send({ state: "ok", data: req.body });
	} catch (error) {
		next(error);
	} finally {
		if (connection) connection.release();
	}
}

// POST - /users/:id/password
async function changePass(req, res, next) {
	let connection;

	try {
		const { id } = req.params;

		await editPasswordUserSchema.validateAsync(req.body);
		const { old_password, new_password } = req.body;

		connection = await getConnection();

		// Check if auth user is the same as :id or is admin
		if (!req.auth || !(id == req.auth.id || req.auth.role === "admin")) {
			throw generateError("You don't have permissions to edit this user", 401);
		}

		// Extract info from user
		const [
			user,
		] = await connection.query(
			`SELECT id, pass_hash from users where id=? and active=1`,
			[id]
		);

		if (!user.length) {
			throw generateError(`The user requested does not exists`, 404);
		}

		// Check password
		const passwordsMath = await bcrypt.compare(old_password, user[0].pass_hash);

		if (!passwordsMath) {
			throw generateError("Incorrect password", 401);
		}

		// Add new password
		const newPassword = await bcrypt.hash(new_password, 10);
		await connection.query(
			`UPDATE users SET pass_hash=?, 
			last_critical_update=NOW(), 
			last_modification_date=NOW(), 
			last_modification_IP=? 
			WHERE id=?`,
			[newPassword, req.ip, id]
		);

		res.send({
			status: "ok",
			message: "Password change succesfuly",
		});
	} catch (error) {
		next(error);
	} finally {
		if (connection) connection.release();
	}
}

// DELETE - /users/:id
async function deleteAccount(req, res, next) {
	let connection;
	try {
		const { id } = req.params;

		// Check if auth user is the same as :id or is admin
		if (!req.auth || !(id == req.auth.id || req.auth.role === "admin")) {
			throw generateError("You don't have permissions to edit this user", 401);
		}

		connection = await getConnection();

		// Check if the id correspond to an existing user
		const [
			userToRemove,
		] = await connection.query(
			`SELECT id, id_address FROM users WHERE id=? and active=1`,
			[id]
		);

		if (!userToRemove.length) {
			throw generateError(
				"Not user found that corresponds the ip requested",
				404
			);
		}

		await connection.query(
			`UPDATE users
			SET active=0
			WHERE id=?`,
			[id]
		);

		connection.release();
		res.send({ state: "ok" });
	} catch (error) {
		next(error);
	} finally {
		if (connection) connection.release();
	}
}

module.exports = {
	registration,
	validateUser,
	login,
	infoUser,
	changeUserData,
	changePass,
	deleteAccount,
};
