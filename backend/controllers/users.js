require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { getConnection } = require("../helpers/db");
const { registrationSchema, loginSchema } = require("../validations/users");

const { generateError, processAndSavePhoto } = require("../helpers/");

// POST - /user/registration
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
			`SELECT nick, email FROM users WHERE nick=? or email=?`,
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

		//IMPLEMENTATE EMAIL

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
			`INSERT INTO users (nick, pass_hash, role, first_name, last_name, email, tlf, avatar, birthday, last_modification_IP, id_address, active)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, '1')`,
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
		SELECT id, role, pass_hash, active FROM users 
		WHERE nick=? or email=?`,
			[username, username]
		);

		if (!user.length) {
			throw generateError("Wrong username or password", 401);
		}

		if (!user[0].active) {
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

// VALIDATE USER

// GET - /users/:id
async function infoUser(req, res, next) {
	let connection;
	try {
		const { id } = req.params;
		connection = await getConnection();
		const [result] = await connection.query(
			`SELECT u.id, u.nick, u.role, u.first_name, u.last_name, u.email, u.tlf, u.avatar, u.birthday, u.creation_date, a.line1, a.line2, a.city, a.state, a.country
			FROM users u left join address a on u.id_address=a.id WHERE u.id=?`,
			[id]
		);

		// Throw 404 if no results
		if (!result.length) {
			throw generateError(`There is no user with the id ${id}`, 404);
		}

		const [userData] = result;

		console.log(userData.id);

		if (
			!req.auth ||
			!(userData.id === req.auth.id || req.auth.role === "admin")
		) {
			throw generateError("You do not have access to this information", 401);
		}

		res.send({ state: "ok", data: userData });
	} catch (error) {
		next(error);
	} finally {
		if (connection) connection.release();
	}
}

module.exports = {
	registration,
	login,
	infoUser,
};
