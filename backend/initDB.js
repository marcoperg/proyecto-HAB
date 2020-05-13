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
		`INSERT INTO users (nick, pass_hash, first_name, last_name, email, last_modification_IPv4, last_modification_IPv6)
		VALUES ('admin', '${adminHash}', 'admin', 'admin', 'marcopg4@gmail.com', '${process.env.LOCAL_IPV4}', '${process.env.LOCAL_IPV6}')`
	);

	console.log("Done");
	connection.release();
	process.exit();
}

main();
