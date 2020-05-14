// Require modules
require("dotenv").config();

const express = require("express");

const morgan = require("morgan");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const app = express();
const port = process.env.PORT;

// CONTROLLER
// User controllers
const {
	registration,
	validateUser,
	login,
	infoUser,
	changeUserData,
	changePass,
	deleteAccount,
} = require("./controllers/users/");
const {
	userIsAuthenticated,
	userIsAdmin,
} = require("./controllers/users/auth");

// Seller controllers
const { newShop, editShop, deleteShop } = require("./controllers/seller/shop");
const { newMenu, editMenu, deleteMenu } = require("./controllers/seller/menu");

// Client controllers
const {
	newVisit,
	addPlate,
	checkout,
	paid,
	callWaiter,
	rateVisit,
} = require("./controllers/client/visits");
const { searchShops, getMenu } = require("./controllers/client/search");

// Miscellaneous ccontrollers
const {
	errorMiddleware,
	notFoundMiddleware,
} = require("./controllers/miscellaneous");

// MIDDLEWARES
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());
app.use(fileUpload());
app.use(express.static("./static/"));

// ROUTES
// User routes
app.post("/users/registration", registration);
app.get("/users/validate", validateUser);
app.post("/users/login", login);
app.get("/users/:id", userIsAuthenticated, infoUser);
app.put("/users/:id", userIsAuthenticated, changeUserData);
app.post("/users/:id/password", userIsAuthenticated, changePass);
app.delete("/users/:id", userIsAuthenticated, deleteAccount);

// Seller routes
app.post("/shops/new", newShop);
app.put("/shops/:id", editShop);
app.delete("/shops/:id", deleteShop);

app.post("/menu/new", newMenu);
app.put("/menu/:id", editMenu);
app.delete("/menu/:id", deleteMenu);

// Client routes
app.get("/shops", searchShops);
app.get("/menu/:id", getMenu);

app.post("/visits", newVisit);
app.put("/visits/:id", addPlate);
app.post("/visits/:id", checkout);
app.post("/visits/:id/paid", paid);
app.post("/visits/:id/call", callWaiter);
app.post("/visits/:id/rate", rateVisit);

// Error middleware
app.use(errorMiddleware);

// Not found middleware
app.use(notFoundMiddleware);

// Server listener
app.listen(port, () => {
	console.log(`Server listening in http://${process.env.LOCAL_IP}:${port}`);
});
