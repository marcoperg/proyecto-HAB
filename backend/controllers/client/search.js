require("dotenv").config();
const { getConnection } = require("../../helpers/db");
const { generateError } = require("../../helpers");

// GET - /shops
async function searchShops() {}

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

		res.send({ status: "ok", message: `Menu of shop ${id}`, data: menu });
	} catch (error) {
		next(error);
	} finally {
		if (connection) connection.release();
	}
}

module.exports = { searchShops, getMenu };
