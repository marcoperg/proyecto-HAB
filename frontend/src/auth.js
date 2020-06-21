import axios from 'axios';
import jwt from 'jwt-decode';

const AUTH_TOKEN_KEY = 'bearerToken';

// Login
export async function login(user, pass) {
	const url = process.env.VUE_APP_BACKEND_URL + '/users/login';

	const res = await axios
		.post(url, {
			username: user,
			password: pass
		})
		.catch(function(error) {
			return error.response;
		});

	if (res.status == 200) {
		saveAuthToken(res.data.data.token);
	}

	return res;
}

// Register
export async function register(data) {
	clean(data);
	console.log(data);
	const url = process.env.VUE_APP_BACKEND_URL + '/users/registration';

	const res = await axios.post(url, data).catch(function(error) {
		return error.response;
	});

	return res;
}

// Change user data
export async function changeUserData(data, originalData) {
	removeUnchanged(data, originalData);

	const url = process.env.VUE_APP_BACKEND_URL + '/users/' + originalData.id;
	if (data.line1 || data.line1 === '') {
		data.address_line1 = data.line1;
		delete data.line1;
	}
	if (data.line2 || data.line2 === '') {
		data.address_line2 = data.line2;
		delete data.line2;
	}

	const res = await axios.put(url, data, { headers: getHeader() }).catch(function(error) {
		return error.response;
	});

	return res;
}

// Change pasword
export async function changePassword(oldPass, newPass, id) {
	const url = process.env.VUE_APP_BACKEND_URL + `/users/${id}/password`;

	const res = await axios
		.post(url, { old_password: oldPass, new_password: newPass }, { headers: getHeader() })
		.catch(function(error) {
			return error.response;
		});

	return res;
}

// Save token
export function saveAuthToken(token) {
	localStorage.setItem(AUTH_TOKEN_KEY, token);
}

// Logout function
export function logout() {
	axios.defaults.headers.common['Authorization'] = '';
	localStorage.removeItem(AUTH_TOKEN_KEY);
}

// Get expiration date
export function getTokenExpDate(encodedToken) {
	const decodedToken = jwt(encodedToken);
	if (!decodedToken.exp) {
		return null;
	}
	const date = new Date(0);
	date.setUTCSeconds(decodedToken.exp);
	return date;
}

// Check expiration date
export function isTokenExpired(token) {
	const expDate = getTokenExpDate(token);
	return expDate < new Date();
}

// Check if user is login
export function isLoggedIn() {
	const authToken = localStorage.getItem(AUTH_TOKEN_KEY);

	return !!authToken && !isTokenExpired(authToken);
}

// Get user info
export function getUserInfo() {
	const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
	const decodedToken = jwt(authToken);

	return decodedToken;
}

// Get header
export function getHeader() {
	const token = localStorage.getItem(AUTH_TOKEN_KEY);
	return { Authorization: `Bearer ${token}` };
}

// Special function to clean data objects of empty keys
function clean(obj) {
	for (const propName in obj) {
		if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
			delete obj[propName];
		}
	}
}

// Special function to delete unchanged entries of original and new object
function removeUnchanged(obj, original) {
	for (const propName in obj) {
		if (obj[propName] === original[propName]) {
			delete obj[propName];
		}
	}
}
