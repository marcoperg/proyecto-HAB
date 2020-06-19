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
		console.log(res.data.data.token);
		saveAuthToken(res.data.data.token);
	}

	return res;
}

// Save token
export function saveAuthToken(token) {
	axios.defaults.headers.common.Authorization = `Bearer ${token}`;
	localStorage.setItem(AUTH_TOKEN_KEY, token);
}

// Logout function
export function logout() {
	axios.defaults.headers.common.Authorization = '';
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

// Get rol
export function checkIsAdmin() {
	const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
	const decodedToken = jwt(authToken);

	return decodedToken;
}
