const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const createJWT = (payload) => {
	return jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });
};

const isValidJWT = (token) => {
	return jwt.verify(token, SECRET_KEY);
};

module.exports = {
	createJWT,
	isValidJWT,
};
