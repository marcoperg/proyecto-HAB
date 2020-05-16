require("dotenv").config();
const { getConnection } = require("../../helpers/db");

const { shopSchema, newShopSchema } = require("../../validations/seller");
const { generateError } = require("../../helpers");

// POST - /shops/
async function newShop(req, res, next) {
	let connection;
	try {
		// Validate body
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
			`SELECT * FROM shop WHERE name=? and id_seller=? and 
			(SELECT line1 FROM address WHERE id=id_address)=? and
			(SELECT city FROM address WHERE id=id_address)=? and
			(SELECT country FROM address WHERE id=id_address)=?`,
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

		console.log(addressEntry.insertId);

		await connection.query(
			`INSERT INTO shop (name, description, email, tlf, id_address, id_seller)
			VALUES (?, ?, ?, ?, ?, ?)`,
			[name, description, email, tlf, addressEntry[0].insertId, req.auth.id]
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
async function editShop() {}

// DELETE - /shops/:id
async function deleteShop() {}

// GET - /shops/:id
async function getShops(req, res, next) {
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

		const [[shop]] = await connection.query(
			`SELECT s.name, s.description, s.email, s.tlf, 
			a.line1, a.line2, a.city, a.state, a.country, s.id_seller
			FROM shop s left join address a on s.id_address=a.id WHERE s.id=?`,
			[id]
		);
		connection.release();
		console.log(req.auth.role);

		// Check if auth user is the owner of the shop :id or is admin
		if (
			!req.auth ||
			!(shop.id_seller == req.auth.id || req.auth.role === "admin")
		) {
			throw generateError("You do not have access to this information", 401);
		}

		console.log(req.body);
		res.send({
			status: "ok",
			message: "Shop info",
			data: shop,
		});
	} catch (error) {
		next(error);
	} finally {
		if (connection) connection.release();
	}
}

module.exports = { newShop, editShop, deleteShop, getShops };
