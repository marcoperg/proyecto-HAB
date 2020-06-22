require("dotenv").config();
const { getConnection } = require("../../helpers/db");

const { shopSchema, newShopSchema } = require("../../validations/seller");
const { generateError, processAndSavePhoto } = require("../../helpers");

// POST - /shops/
async function newShop(req, res, next) {
	let connection;
	try {
		// Validate body
		console.log(req.body.email);
		await newShopSchema.validateAsync(req.body);

		const {
			name,
			description,
			email,
			tlf,
			address_line1,
			address_line2,
			city,
			state,
			country,
		} = req.body;

		connection = await getConnection();

		// Check if the name of the shop alredy exists
		const [existingShop] = await connection.query(
			`SELECT id FROM shop WHERE name=? and id_seller=? and 
			(SELECT line1 FROM address WHERE id=id_address)=? and
			(SELECT city FROM address WHERE id=id_address)=? and
			(SELECT country FROM address WHERE id=id_address)=? and
			active=1`,
			[name, req.auth.id, address_line1, city, country]
		);

		if (existingShop.length) {
			throw generateError("You already added this shop", 400);
		}

		// Add data to DB
		const addressEntry = await connection.query(
			`INSERT INTO address (line1, line2, city, state, country)
			VALUES (?, ?, ?, ? , ?)`,
			[address_line1, address_line2, city, state, country]
		);

		await connection.query(
			`INSERT INTO shop (name, description, email, tlf, id_address, id_seller, last_modification_IP)
			VALUES (?, ?, ?, ?, ?, ?, ?)`,
			[
				name,
				description,
				email,
				tlf,
				addressEntry[0].insertId,
				req.auth.id,
				req.ip,
			]
		);

		connection.release();

		res.send({
			status: "ok",
			message: "Shop added succesfully",
			data: req.body,
		});
	} catch (error) {
		next(error);
	} finally {
		if (connection) connection.release();
	}
}

// PUT - /shops/:id
async function editShop(req, res, next) {
	let connection;
	try {
		const { id } = req.params;

		// Validate body
		await shopSchema.validateAsync(req.body);

		const {
			name,
			description,
			email,
			tlf,
			address_line1,
			address_line2,
			city,
			state,
			country,
		} = req.body;

		connection = await getConnection();

		// Check if the id correspond to a shop own by de user
		const [
			[shop],
		] = await connection.query(
			`SELECT id, id_address, id_seller FROM shop WHERE id=? and active=1`,
			[id]
		);

		if (!shop) {
			throw generateError("The shop to edit does not exists", 404);
		}

		if (
			!req.auth ||
			!(shop.id_seller == req.auth.id || req.auth.role === "admin")
		) {
			throw generateError("This shop does not belong to you", 401);
		}

		// Check if the name of the shop alredy exists
		const [existingShop] = await connection.query(
			`SELECT id FROM shop WHERE name=? and id_seller=? and 
			(SELECT line1 FROM address WHERE id=id_address)=? and
			(SELECT city FROM address WHERE id=id_address)=? and
			(SELECT country FROM address WHERE id=id_address)=?`,
			[name, req.auth.id, address_line1, city, country]
		);

		if (existingShop.length) {
			throw generateError("You already added this shop", 400);
		}

		// Update DB
		await connection.query(
			`UPDATE address SET
			line1=COALESCE(?, line1),
			line2=COALESCE(?, line2),
			city=COALESCE(?, city),
			state=COALESCE(?, state),
			country=COALESCE(?, country)
			WHERE id=?`,
			[address_line1, address_line2, city, state, country, shop.id_address]
		);

		await connection.query(
			`UPDATE shop SET
			name=COALESCE(?, name),
			description=COALESCE(?, description),
			email=COALESCE(?, email),
			tlf=COALESCE(?, tlf),
			last_modification_date=NOW(),
			last_modification_IP=?
			WHERE id=?`,
			[name, description, email, tlf, req.ip, id]
		);

		connection.release();

		res.send({
			status: "ok",
			message: "Shop edited succesfully",
			data: req.body,
		});
	} catch (error) {
		next(error);
	} finally {
		if (connection) connection.release();
	}
}

// DELETE - /shops/:id
async function deleteShop(req, res, next) {
	let connection;
	try {
		const { id } = req.params;

		connection = await getConnection();

		// Check if the id correspond to a shop own by de user
		const [
			[shop],
		] = await connection.query(
			`SELECT id, id_seller FROM shop WHERE id=? and active=1`,
			[id]
		);

		if (!shop) {
			throw generateError("The shop to remove does not exists", 404);
		}

		if (
			!req.auth ||
			!(shop.id_seller == req.auth.id || req.auth.role === "admin")
		) {
			throw generateError("This shop does not belong to you", 401);
		}

		// Update DB

		const [hola] = await connection.query(
			`UPDATE shop SET
			active=0,
			last_modification_date=NOW(),
			last_modification_IP=?
			WHERE id=?`,
			[req.ip, id]
		);

		connection.release();

		res.send({
			status: "ok",
			message: "Shop deleted succesfully",
		});
	} catch (error) {
		next(error);
	} finally {
		if (connection) connection.release();
	}
}

// GET - /shops/:id
async function getShop(req, res, next) {
	let connection;
	try {
		const { id } = req.params;

		connection = await getConnection();

		// Get data
		const [[shop]] = await connection.query(
			`SELECT s.id, s.name, s.description, s.email, s.tlf, 
			a.line1, a.line2, a.city, a.state, a.country, s.id_seller
			FROM shop s left join address a on s.id_address=a.id WHERE s.id=? and active=1`,
			[id]
		);

		// Get ratings for average
		const [
			rates,
		] = await connection.query(
			`SELECT rating  FROM user_shop WHERE id_shop=?`,
			[id]
		);

		const rate_average = rates.reduce((accum, currentVal) => {
			return accum + currentVal.rating;
		}, 0);

		// Get photos
		const [
			photos,
		] = await connection.query(`SELECT name FROM photos WHERE id_shop=?`, [id]);
		connection.release();

		// Throw error if the id does't correspond to a shop
		if (!shop) {
			throw generateError("The shop does not exists", 404);
		}

		res.send({
			status: "ok",
			message: "Shop info",
			data: { ...shop, average_rate: rate_average, photos: photos },
		});
	} catch (error) {
		next(error);
	} finally {
		if (connection) connection.release();
	}
}

// GET - /seller/:id/shops
async function getShopsFromSeller(req, res, next) {
	let connection;
	try {
		const { id } = req.params;

		connection = await getConnection();

		// Get data
		const [shops] = await connection.query(
			`SELECT s.id, s.name, s.description, s.email, s.tlf, 
			a.line1, a.line2, a.city, a.state, a.country, s.id_seller
			FROM shop s left join address a on s.id_address=a.id WHERE s.id_seller=? and active=1`,
			[id]
		);

		// Get photos of each shop
		for (const shop of shops) {
			const [
				photos,
			] = await connection.query(`SELECT name FROM photos WHERE id_shop=?`, [
				shop.id,
			]);

			shop.photos = photos;
		}

		connection.release();

		// Throw error if the id does't correspond to a shop
		if (!shops) {
			throw generateError("The seller does not have any shops", 404);
		}

		res.send({
			status: "ok",
			message: "Shop info",
			data: shops,
		});
	} catch (error) {
		next(error);
	} finally {
		if (connection) connection.release();
	}
}

// POST - /shops/:id
async function uploadShopPhoto(req, res, next) {
	let connection;
	try {
		const { id } = req.params;

		connection = await getConnection();

		// Check if the id correspond to a shop own by de user
		const [
			[shop],
		] = await connection.query(
			`SELECT id, id_seller FROM shop WHERE id=? and active=1`,
			[id]
		);

		if (!shop) {
			throw generateError("The shop to remove does not exists", 404);
		}

		if (
			!req.auth ||
			!(shop.id_seller == req.auth.id || req.auth.role === "admin")
		) {
			throw generateError("This shop does not belong to you", 401);
		}

		// For loop that repites the process for every photo on the req
		for (const photo in req.files) {
			// Save photo

			let savedFileName;
			try {
				savedFileName = await processAndSavePhoto(req.files[photo]);
			} catch (error) {
				const imageError = new Error(
					"Can not process upload image. Try again."
				);
				imageError.httpCode = 400;
				throw imageError;
			}

			// Add data to DB
			await connection.query(
				`INSERT INTO photos (id_shop, name)
				VALUES (?, ?)`,
				[id, savedFileName]
			);
		}

		connection.release();

		res.send({ status: "ok" });
	} catch (error) {
		next(error);
	} finally {
		if (connection) connection.release();
	}
}

module.exports = {
	newShop,
	editShop,
	deleteShop,
	getShop,
	getShopsFromSeller,
	uploadShopPhoto,
};
