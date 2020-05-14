async function errorMiddleware(error, req, res, next) {
	console.log(error);
	res.status(error.httpCode || 500).send({
		status: "error",
		message: error.message,
	});
}

async function notFoundMiddleware(req, res) {
	res.status(404).send("Not found!");
}

module.exports = {
	errorMiddleware,
	notFoundMiddleware,
};
