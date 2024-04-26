const User = require("../model/user.js");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const findUserByEmail = async (email) => {
	const user = await User.findOne({ email });
	return user;
};

const findUserByToken = async (token) => {
	const user = await User.findOne({ token });
	return user;
};

const updateUserWithToken = async (id) => {
	const { SECRET_KEY } = process.env;

	const token = jsonwebtoken.sign({ id }, SECRET_KEY);

	const updatedUser = await User.findByIdAndUpdate(id, { token }, { new: true });

	return updatedUser;
};

const createUser = async (userData) => {
	const newUser = new User(userData);
	await newUser.hashPasswords();
	await newUser.save();
	const userWithToken = await updateUserWithToken(newUser.id);

	return userWithToken;
};

const validatePassword = async (password, hash) => {
	const valid = await bcrypt.compare(password, hash);

	return valid;
};

module.exports = {
	findUserByEmail,
	createUser,
	updateUserWithToken,
	validatePassword,
	findUserByToken,
};
