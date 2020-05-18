require("dotenv").config();
const { getConnection } = require("../../helpers/db");

const { plateSchema, newPlateSchema } = require("../../validations/seller");
const { generateError, processAndSavePhoto } = require("../../helpers");

// POST - /plate/
async function newPlate(req, res, next) {
	let connection;
	try {
		// Validate body
		await newPlateSchema.validateAsync(req.body);

		const { name, description, prize, id_shop } = req.body;

		connection = await getConnection();

		// Check if the user owns the shop
		const [
			[shop],
		] = await connection.query(`SELECT id_seller FROM shop WHERE id=?`, [
			id_shop,
		]);

		if (!shop) {
			throw generateError("The shop does not exists", 404);
		}

		if (
			!req.auth ||
			!(shop.id_seller == req.auth.id || req.auth.role === "admin")
		) {
			throw generateError("This shop does not belong to you", 401);
		}

		// Check if the name of the plate alredy exists
		const [
			existingPlate,
		] = await connection.query(
			`SELECT id FROM plates WHERE name=? and prize=? and id_shop=?`,
			[name, prize, id_shop]
		);

		if (existingPlate.length) {
			throw generateError("You already added this plate", 400);
		}

		// Add data to DB
		const insertion = await connection.query(
			`INSERT INTO plates (name, description, prize, id_shop)
			VALUES (?, ?, ?, ?)`,
			[name, description, prize, id_shop]
		);

		connection.release();

		res.send({
			status: "ok",
			message: "Plate added succesfully",
			data: { id: insertion.insertId, ...req.body },
		});
	} catch (error) {
		next(error);
	} finally {
		if (connection) connection.release();
	}
}

// PUT - /plate/:id
async function editPlate(req, res, next) {
	let connection;
	try {
		const { id } = req.params;

		// Validate body
		await plateSchema.validateAsync(req.body);

		const { name, description, prize, id_shop } = req.body;

		connection = await getConnection();

		// Check if the plate exists
		const [[plate]] = await connection.query(
			`SELECT id FROM plates WHERE id=?`,
			[id]
		);
		if (!plate) {
			throw generateError("The plate does not exists", 404);
		}

		// Check if the user own the plate
		const [[shop]] = await connection.query(
			`SELECT id_seller FROM shop WHERE 
			id=(SELECT id_shop FROM plates WHERE id=?)`,
			[id]
		);

		if (
			!req.auth ||
			!(shop.id_seller == req.auth.id || req.auth.role === "admin")
		) {
			throw generateError("This plate does not belong to you", 401);
		}

		// Check if the name of the plate alredy exists
		const [
			existingPlate,
		] = await connection.query(
			`SELECT id FROM plates WHERE name=? and prize=? and id_shop=?`,
			[name, prize, id_shop]
		);

		if (existingPlate.length) {
			throw generateError("You already added this plate", 400);
		}

		// If there is a change of shop check if the new one belongs to the user
		if (id_shop) {
			const [
				newShop,
			] = await connection.query(`SELECT id_seller FROM shop WHERE id=?`, [
				id_shop,
			]);

			if (
				!req.auth ||
				!(newShop.id_seller == req.auth.id || req.auth.role === "admin")
			) {
				throw generateError("This shop does not belong to you", 401);
			}
		}

		// Update DB
		await connection.query(
			`UPDATE plates SET
			name=COALESCE(?, name),
			description=COALESCE(?, description),
			prize=COALESCE(?, prize)
			WHERE id=?`,
			[name, description, prize, id]
		);

		connection.release();

		res.send({
			status: "ok",
			message: "Plate edited succesfully",
			data: req.body,
		});
	} catch (error) {
		next(error);
	} finally {
		if (connection) connection.release();
	}
}

// DELETE - /plate/:id
async function deletePlate(req, res, next) {
	let connection;
	try {
		const { id } = req.params;

		// Validate body
		await plateSchema.validateAsync(req.body);

		const { name, description, prize, id_shop } = req.body;

		connection = await getConnection();

		// Check if the plate exists
		const [
			[plate],
		] = await connection.query(`SELECT id_shop FROM plates WHERE id=?`, [id]);
		if (!plate) {
			throw generateError("The plate does not exists", 404);
		}

		// Check if the user own the plate
		const [
			[shop],
		] = await connection.query(`SELECT id_seller FROM shop WHERE id=?`, [
			plate.id_shop,
		]);

		if (
			!req.auth ||
			!(shop.id_seller == req.auth.id || req.auth.role === "admin")
		) {
			throw generateError("This plate does not belong to you", 401);
		}

		// Update DB
		await connection.query(`DELETE FROM plates WHERE id=?`, [id]);

		connection.release();

		res.send({
			status: "ok",
			message: "Plate deleted succesfully",
		});
	} catch (error) {
		next(error);
	} finally {
		if (connection) connection.release();
	}
}

// GET - /plate/:id
async function getPlate(req, res, next) {
	let connection;
	try {
		const { id } = req.params;

		connection = await getConnection();

		// Get data
		const [[plate]] = await connection.query(
			`SELECT * FROM plates WHERE id=?`,
			[id]
		);

		// Get phots
		const [
			photos,
		] = await connection.query(`SELECT name FROM photos WHERE id_plate=?`, [
			id,
		]);

		// Throw error if the id does't correspond to a plate
		if (!plate) {
			throw generateError("The plate does not exists", 404);
		}

		connection.release();

		res.send({
			status: "ok",
			message: "Plate info",
			data: plate,
			photos: photos,
		});
	} catch (error) {
		next(error);
	} finally {
		if (connection) connection.release();
	}
}

// POST - /plate/:id
async function uploadPlatePhoto(req, res, next) {
	let connection;
	try {
		const { id } = req.params;

		connection = await getConnection();

		// Check if the plate exists
		const [
			[plate],
		] = await connection.query(`SELECT id_shop FROM plates WHERE id=?`, [id]);
		if (!plate) {
			throw generateError("The plate does not exists", 404);
		}

		// Check if the user own the plate
		const [
			[shop],
		] = await connection.query(`SELECT id_seller FROM shop WHERE id=?`, [
			plate.id_shop,
		]);

		if (
			!req.auth ||
			!(shop.id_seller == req.auth.id || req.auth.role === "admin")
		) {
			throw generateError("This plate does not belong to you", 401);
		}

		// If the input is not an array turn it into one
		if (!(req.files.photos instanceof Array)) {
			req.files.photos = new Array(req.files.photos);
		}

		// For loop that repites the process for every photo on the req
		for (const photo of req.files.photos) {
			// Save photo

			let savedFileName;
			try {
				savedFileName = await processAndSavePhoto(photo);
			} catch (error) {
				const imageError = new Error(
					"Can not process upload image. Try again."
				);
				imageError.httpCode = 400;
				throw imageError;
			}

			// Add data to DB
			await connection.query(
				`INSERT INTO photos (id_plate, name)
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
	newPlate,
	editPlate,
	deletePlate,
	getPlate,
	uploadPlatePhoto,
};
