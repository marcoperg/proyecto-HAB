// Require modules
require("dotenv").config();

const express = require("express");

const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT;

// Controllers

// Middleware
app.use(bodyParser.json());
app.use(morgan("dev"));
// Routes

// Error middleware

app.use((error, req, res, next) => {
	console.log(error);
	res.status(error.httpCode || 500).send({
		status: "error",
		message: error.message,
	});
});

// Not found middleware

app.use((req, res) => {
	res.status(404).send("Not found!");
});

// Server listener
app.listen(port, () => {
	console.log(`Server listening in http://127.0.0.1:${port}`);
});
