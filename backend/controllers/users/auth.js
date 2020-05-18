require("dotenv").config();
const jwt = require("jsonwebtoken");

const { getConnection } = require("../../helpers/db");
const { generateError } = require("../../helpers/");

async function userIsAuthenticated(req, res, next) {
	let connection;

	try {
		// Check if the authorization header is valid
		const { authorization } = req.headers;

		if (!authorization) {
			throw generateError("Non token found");
		}

		// Extract token from header
		const authorizationParts = authorization.split(" ");

		let token;
		if (authorizationParts.length === 1) {
			token = authorization;
		} else if (authorizationParts[0] === "Bearer") {
			token = authorizationParts[1];
		} else {
			throw generateError("The token cannot be readed");
		}

		// Decoded token
		let decoded;
		try {
			decoded = jwt.verify(token, process.env.SECRET);
		} catch (error) {
			throw new Error("The token is not well formed");
		}

		// Check if the token had been created after the last critical change of the user
		const { id, iat } = decoded;

		connection = await getConnection();

		const [
			user,
		] = await connection.query(
			"SELECT last_critical_update FROM users WHERE id=? and active=1",
			[id]
		);

		if (!user.length) {
			throw new Error("The user no longer exists");
		}

		if (new Date(iat * 1000) < new Date(user[0].last_critical_update)) {
			throw new Error("The token is outdated, please get a new one");
		}

		req.auth = decoded;
		next();
	} catch (error) {
		error.httpCode = 401;
		next(error);
	} finally {
		if (connection) connection.release();
	}
}

function userIsAdmin(req, res, next) {
	if (!req.auth || req.auth.role !== "admin") {
		return next(generateError("The user does not count with admin privileges"));
	}
	next();
}

function userIsSeller(req, res, next) {
	if (!req.auth || !(req.auth.role === "seller" || req.auth.role === "admin")) {
		return next(
			generateError(
				"This section is only avaiable for sellers, if you one to add your bussiness create a seller app."
			)
		);
	}
	next();
}

module.exports = {
	userIsAuthenticated,
	userIsAdmin,
	userIsSeller,
};
