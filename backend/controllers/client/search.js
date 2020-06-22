require("dotenv").config();
const { getConnection } = require("../../helpers/db");
const { generateError } = require("../../helpers");
const nodeGeocoder = require("node-geocoder");

const geocoder = nodeGeocoder({
	provider: "opencage",
	apiKey: "29aa9cabeb224983a182c71fe7b4bfcb",
});

// GET - /shops
async function getShops(req, res, next) {
	let connection;
	try {
		const { city, name } = req.query;
		if (name) {
			connection = await getConnection();

			// Get shops with that name
			const [
				shops,
			] = await connection.query(
				`SELECT * FROM shop WHERE name LIKE ? and active`,
				[`%${name}%`]
			);

			res.send({ status: "ok", data: shops });
		} else if (city) {
			connection = await getConnection();

			// Get list of shops with that city
			const [shops] = await connection.query(
				`SELECT s.* FROM shop s JOIN address a 
			ON a.id = s.id_address WHERE a.city=? and s.active`,
				[city]
			);

			res.send({ status: "ok", data: shops });
		} else {
			connection = await getConnection();

			// Get list of addresses with shops
			const [addresses] = await connection.query(
				`SELECT * FROM address WHERE id in (
				SELECT id_address FROM shop WHERE active
			)`
			);

			const coords = [];

			for (const address of addresses) {
				coords.push(
					await geocoder.geocode(
						(address.line1 || " ") +
							(address.line2 || " ") +
							(address.city || " ") +
							(address.state || " ") +
							(address.country || " ")
					)
				);
			}

			res.send({ status: "ok", data: coords });
		}
	} catch (error) {
		next(error);
	} finally {
		if (connection) connection.release();
	}
}

// GET - /menu/:id
async function getMenu(req, res, next) {
	const { id } = req.params;
	let connection;
	try {
		connection = await getConnection();

		// Check if the shop exists
		const [
			[shop],
		] = await connection.query(`SELECT * FROM shop WHERE id=? and active=1`, [
			id,
		]);

		if (!shop) {
			throw generateError("The shop does not exists", 404);
		}

		const [menu] = await connection.query(
			`SELECT id, name, description, prize
			FROM plates WHERE id_shop=?`,
			[id]
		);

		for (const plate of menu) {
			[
				plate.photos,
			] = await connection.query(`SELECT name FROM photos WHERE id_plate=?`, [
				plate.id,
			]);
		}

		res.send({ status: "ok", message: `Menu of shop ${id}`, data: menu });
	} catch (error) {
		next(error);
	} finally {
		if (connection) connection.release();
	}
}

module.exports = { getShops, getMenu };
