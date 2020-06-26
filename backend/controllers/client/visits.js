require("dotenv").config();
const { generateError } = require("../../helpers/");
const { getConnection } = require("../../helpers/db");
const { addPlateSchema, ratingSchema } = require("../../validations/client");

// GET - /visits/
async function getCart(req, res, next) {
	let connection;
	try {
		connection = await getConnection();

		// Check if there is an active cart
		let [
			[cart],
		] = await connection.query(
			`SELECT id FROM cart WHERE id_user=? and active=1`,
			[req.auth.id]
		);

		if (!cart) {
			throw generateError("There is no active cart to delete", 404);
		}

		// Get menu active on the user account
		[cart] = await connection.query(
			`SELECT p.name, p.id_shop, cp.id_plate, cp.ammount, cp.prize FROM 
			cart c JOIN cart_plates cp on cp.id_cart=c.id
			JOIN plates p on cp.id_plate=p.id
			WHERE c.id_user=? and cp.ammount<>0 and active`,
			[req.auth.id]
		);

		// Get one photo for each plate
		for (const plate of cart) {
			const [
				[photo],
			] = await connection.query(`SELECT name FROM photos WHERE id_plate=?`, [
				plate.id_plate,
			]);

			if (photo) plate.photo = photo.name;
			else plate.photo = null;
		}

		// if (!cart.length) {
		// 	throw generateError("There is no active cart", 404);
		// }

		res.send({ status: "ok", data: cart });
	} catch (error) {
		next(error);
	} finally {
		if (connection) connection.release();
	}
}

// POST - /visits/
async function addPlate(req, res, next) {
	let connection;
	try {
		// Validate body
		addPlateSchema.validate(req.body);
		let { plate_id, ammount } = req.body;

		if (ammount < 1) {
			ammount = "0";
		}

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

			if (oldPlate && oldPlate.id_shop != plate.id_shop) {
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
					`INSERT INTO cart(id_user, id_shop, last_modification_IP)
					VALUES (?, ?, ?)`,
					[req.auth.id, plate.id_shop, req.ip]
				)
			)[0].insertId;
		}

		// If the id_plate already exist increse ammount, else add plate to DB
		const [
			[existingPlateOnCart],
		] = await connection.query(
			`SELECT ammount FROM cart_plates WHERE id_plate=? and id_cart=?`,
			[plate.id, cartId]
		);

		if (existingPlateOnCart) {
			await connection.query(
				`UPDATE cart_plates SET
				ammount= ?
				WHERE id_plate=? and id_cart=?`,
				[ammount, plate.id, cartId]
			);
		} else {
			await connection.query(
				`INSERT INTO cart_plates (id_cart, id_plate, prize, ammount)
				VALUES(?, ?, ?, ?)`,
				[cartId, plate.id, plate.prize, ammount]
			);
		}

		res.send({ status: "ok" });
	} catch (error) {
		next(error);
	} finally {
		if (connection) connection.release();
	}
}

// DELETE - /visits/
async function deleteCartWithoutCheckout(req, res, next) {
	let connection;
	try {
		connection = await getConnection();

		// Check if there is an active cart
		const [
			[cart],
		] = await connection.query(
			`SELECT id FROM cart WHERE id_user=? and active=1`,
			[req.auth.id]
		);

		if (!cart) {
			throw generateError("There is no active cart to delete", 404);
		}

		// Get prizes of the cart
		const [prizes] = await connection.query(
			`SELECT  prize, ammount FROM cart_plates
			WHERE id_cart=?`,
			[cart.id]
		);

		const totalPrize = prizes.reduce((accumulator, currentValue) => {
			return accumulator + currentValue.prize * currentValue.ammount;
		}, 0);

		// Update DB
		await connection.query(
			`UPDATE cart SET
			active=0,
			last_modification_IP=?,
			total_prize=?`,
			[req.ip, totalPrize]
		);

		res.send({ status: "ok" });
	} catch (error) {
		next(error);
	} finally {
		if (connection) connection.release();
	}
}

// DELETE - /visits/:id/remove
async function reducePlateOnCart(req, res, next) {
	let connection;
	try {
		const { id } = req.params;
		const { reduce_completly } = req.body;
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

		// Reduce ammount on DB or update it to 0 if required
		if (reduce_completly) {
			await connection.query(
				`UPDATE cart_plates
				SET ammount=0
				WHERE id_cart=? and id_plate=?`,
				[cartId, id]
			);
		} else {
			await connection.query(
				`UPDATE cart_plates 
				SET ammount=ammount-1
				WHERE id_cart=? and id_plate=?`,
				[cartId, id]
			);
		}

		res.send({ status: "ok" });
	} catch (error) {
		next(error);
	} finally {
		if (connection) connection.release();
	}
}

// POST - /visits/checkout
async function checkout(req, res, next) {
	let connection;
	try {
		connection = await getConnection();

		// Check if there is an active cart
		const [
			[cart],
		] = await connection.query(
			`SELECT id FROM cart WHERE id_user=? and active=1`,
			[req.auth.id]
		);

		if (!cart) {
			throw generateError("There is no active cart to checkout", 404);
		}

		// Get the id of the table, if not passed try to get it from DB
		const { table_id } = req.body;

		if (!table_id) {
			try {
				table_id = (
					await connection.query(`SELECT table_id FROM cart WHERE id=?`, [
						cart.id,
					])
				)[0][0].table_id;
			} catch (error) {
				throw generateError("Plase pass the number of your table", 404);
			}
		}

		// Get prizes of the cart
		const [prizes] = await connection.query(
			`SELECT  prize, ammount FROM cart_plates
			WHERE id_cart=?`,
			[cart.id]
		);

		const totalPrize = prizes.reduce((accumulator, currentValue) => {
			return accumulator + currentValue.prize * currentValue.ammount;
		}, 0);

		// Update DB
		await connection.query(
			`UPDATE cart SET
			checkout=1,
			checkout_date=NOW(),
			active=0,
			last_modification_IP=?,
			total_prize=?,
			table_id=?
			WHERE id=?`,
			[req.ip, totalPrize, table_id, cart.id]
		);

		res.send({ status: "ok" });
	} catch (error) {
		next(error);
	} finally {
		if (connection) connection.release();
	}
}

// POST - /visits/paid
async function paid() {}

// POST - /visits/call
async function callWaiter() {}

// POST - /shop/:id/rate
async function rateShop(req, res, next) {
	let connection;
	try {
		// Extract id of the shop to rate and the rating data (and validate it)
		const { id } = req.params;

		ratingSchema.validate(req.body);
		const { rate, comment } = req.body;

		connection = await getConnection();

		// Check if the shop exists
		const [[shop]] = await connection.query(`SELECT id FROM shop WHERE id=?`, [
			id,
		]);

		if (!shop) {
			throw generateError("No shop found with that id", 404);
		}

		// Update DB
		await connection.query(
			`INSERT INTO user_shop (id_user, id_shop, rating, comment)
			VALUES (?, ?, ?, ?)`,
			[req.auth.id, id, rate, comment]
		);

		res.send({ status: "ok", data: req.body });
	} catch (error) {
		next(error);
	} finally {
		if (connection) connection.release();
	}
}

module.exports = {
	getCart,
	addPlate,
	deleteCartWithoutCheckout,
	reducePlateOnCart,
	checkout,
	paid,
	callWaiter,
	rateShop,
};
