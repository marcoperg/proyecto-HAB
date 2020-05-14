const { getConnection } = require("./helpers/db");
const fs = require("fs-extra");
const path = require("path");
const bcrypt = require("bcrypt");

async function getQuery(file) {
	return await fs.readFile(path.resolve(file), "utf-8");
}

async function main() {
	console.log("Reading .sql file...");
	const creationQuery = await getQuery("CREATE.sql");

	console.log("Establishing connection...");
	const connection = await getConnection();

	console.log("Creating tables and columns...");
	await connection.query(creationQuery);

	console.log("Inserting admin user...");
	const adminHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
	await connection.query(
		`INSERT INTO users (nick, pass_hash, role, first_name, last_name, email, last_modification_IP, active)
		VALUES ('admin', '${adminHash}', 'admin','admin', 'admin', 'marcopg4@gmail.com', '${process.env.LOCAL_IP}', true)`
	);

	console.log("Done");
	connection.release();
	process.exit();
}

main();
