require("dotenv").config();
const { generateError } = require("../../helpers/");
const { getConnection } = require("../../helpers/db");
const { addPlateSchema } = require("../../validations/client");

// POST - /visits/
async function addPlate(req, res, next) {
	let connection;
	try {
		// Validate body
		addPlateSchema.validate(req.body);
		const { plate_id } = req.body;

		connection = await getConnection();

		// Check if the plate exists
		const [[plate]] = await connection.query(
			`SELECT id, prize, id_shop
			FROM plates WHERE id=?`,
			[plate_id]
		);

		if (!plate) {
			throw generateError("The plate does not exists", 404);
		}

		// Check if already exists an active cart
		let cartId;
		try {
			cartId = (
				await connection.query(
					`SELECT id FROM cart WHERE id_user=? and active=1`,
					[req.auth.id]
				)
			)[0][0].id;
		} catch (error) {}

		// Check if the old cart corresponds to the right shop
		if (cartId) {
			const oldPlate = (
				await connection.query(
					`SELECT id_shop FROM plates WHERE 
					id in (SELECT id_plate FROM cart_plates WHERE id_cart=?)`,
					[cartId]
				)
			)[0][0];

			if (oldPlate.id_shop != plate.id_shop) {
				throw generateError(
					" You have a cart active from another shop, if you are no longer there deleted before creating a new one",
					400
				);
			}
		}

		// If there is no cart create one
		if (!cartId) {
			cartId = (
				await connection.query(
					`INSERT INTO cart(id_user, id_shop)
				VALUES (?, ?)`,
					[req.auth.id, plate.id_shop]
				)
			)[0].insertId;
		}

		// If the id_plate already exist ingrese ammoun, else add plate to DB
		const [
			[existingPlateOnCart],
		] = await connection.query(
			`SELECT ammount FROM cart_plates WHERE id_plate=?`,
			[plate.id]
		);

		if (existingPlateOnCart) {
			await connection.query(
				`UPDATE cart_plates SET
				ammount= COALESCE(ammount, 0) + 1
				WHERE id_plate=?`,
				[plate.id]
			);
		} else {
			await connection.query(
				`INSERT INTO cart_plates (id_cart, id_plate, prize)
				VALUES(?, ?, ?)`,
				[cartId, plate.id, plate.prize]
			);
		}

		res.send({ status: "ok" });
	} catch (error) {
		next(error);
	} finally {
		if (connection) connection.release();
	}
}

// POST - /visits/:id/remove
async function reducePlateOnCart(req, res, next) {
	let connection;
	try {
		const { id } = req.params;

		connection = await getConnection();

		// Get the cart Id
		let cartId;
		try {
			cartId = (
				await connection.query(
					`SELECT id FROM cart WHERE id_user=? and active=1`,
					[req.auth.id]
				)
			)[0][0].id;
		} catch (error) {
			throw generateError("You don't have any active cart", 404);
		}

		// Check if the plate exists in the cart
		const [
			[plate],
		] = await connection.query(
			`SELECT id_plate FROM cart_plates WHERE id_plate=? and id_cart=?`,
			[id, cartId]
		);

		if (!plate) {
			throw generateError("The plate does not exists", 404);
		}

		// Reduce ammount on DB
		await connection.query(
			`UPDATE cart_plates 
			SET ammount=ammount-1
			WHERE id_cart=? and id_plate=?`,
			[cartId, id]
		);

		res.send({ status: "ok" });
	} catch (error) {
		next(error);
	} finally {
		if (connection) connection.release();
	}
}

// POST - /visits/checkout
async function checkout() {}

// POST - /visits/paid
async function paid() {}

// POST - /visits/call
async function callWaiter() {}

// POST - /visits/:id/rate
async function rateVisit() {}

module.exports = {
	addPlate,
	checkout,
	paid,
	callWaiter,
	rateVisit,
	reducePlateOnCart,
};
