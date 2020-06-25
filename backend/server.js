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
	getShop,
	getShopsFromSeller,
	uploadShopPhoto,
} = require("./controllers/seller/shop");
const {
	newPlate,
	editPlate,
	deletePlate,
	getPlate,
	uploadPlatePhoto,
} = require("./controllers/seller/plate");

// Client controllers
const {
	getCart,
	addPlate,
	deleteCartWithoutCheckout,
	reducePlateOnCart,
	checkout,
	paid,
	callWaiter,
	rateShop,
} = require("./controllers/client/visits");
const { getShops, getMenu } = require("./controllers/client/search");

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
app.get("/shops/:id", getShop);
app.get("/seller/:id/shops", getShopsFromSeller);
app.post("/shops/:id", userIsAuthenticated, userIsSeller, uploadShopPhoto);

app.post("/plate/", userIsAuthenticated, userIsSeller, newPlate);
app.put("/plate/:id", userIsAuthenticated, userIsSeller, editPlate);
app.delete("/plate/:id", userIsAuthenticated, userIsSeller, deletePlate);
app.get("/plate/:id", getPlate);
app.post("/plate/:id", userIsAuthenticated, userIsSeller, uploadPlatePhoto);

// Client routes
app.get("/shops", getShops);
app.get("/menu/:id", getMenu);

app.get("/visits/", userIsAuthenticated, getCart);
app.post("/visits/", userIsAuthenticated, addPlate);
app.delete("/visits", userIsAuthenticated, deleteCartWithoutCheckout);
app.delete("/visits/:id/remove", userIsAuthenticated, reducePlateOnCart);
app.post("/visits/checkout", userIsAuthenticated, checkout);
app.post("/visits/paid", userIsAuthenticated, paid);
app.post("/visits/call", userIsAuthenticated, callWaiter);
app.post("/shop/:id/rate", userIsAuthenticated, rateShop);

// Error middleware
app.use(errorMiddleware);

// Not found middleware
app.use(notFoundMiddleware);

// Server listener
app.listen(port, () => {
	console.log(`Server listening in http://${process.env.LOCAL_IP}:${port}`);
});
