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
	userIsSeller,
} = require("./controllers/users/auth");

// Seller controllers
const {
	newShop,
	editShop,
	deleteShop,
	getShops,
} = require("./controllers/seller/shop");
const {
	newMenu,
	editMenu,
	deleteMenu,
	getMenus,
} = require("./controllers/seller/menu");

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
app.post("/shops/", userIsAuthenticated, userIsSeller, newShop);
app.put("/shops/:id", userIsAuthenticated, userIsSeller, editShop);
app.delete("/shops/:id", userIsAuthenticated, userIsSeller, deleteShop);
app.get("/shops/:id", userIsAuthenticated, userIsSeller, getShops);

app.post("/menu/", userIsAuthenticated, userIsSeller, newMenu);
app.put("/menu/:id", userIsAuthenticated, userIsSeller, editMenu);
app.delete("/menu/:id", userIsAuthenticated, userIsSeller, deleteMenu);
app.get("/menu/:id", userIsAuthenticated, userIsSeller, getMenus);

// Client routes
app.get("/shops", userIsAuthenticated, searchShops);
app.get("/menu/:id", userIsAuthenticated, getMenu);

app.post("/visits", userIsAuthenticated, newVisit);
app.put("/visits/:id", userIsAuthenticated, addPlate);
app.post("/visits/:id", userIsAuthenticated, checkout);
app.post("/visits/:id/paid", userIsAuthenticated, paid);
app.post("/visits/:id/call", userIsAuthenticated, callWaiter);
app.post("/visits/:id/rate", userIsAuthenticated, rateVisit);

// Error middleware
app.use(errorMiddleware);

// Not found middleware
app.use(notFoundMiddleware);

// Server listener
app.listen(port, () => {
	console.log(`Server listening in http://${process.env.LOCAL_IP}:${port}`);
});
