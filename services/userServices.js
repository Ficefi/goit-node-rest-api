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

const findUserByVerificationToken = async (verificationToken) => {
	const user = await User.findOne({ verificationToken });
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

	return newUser;
};

const validatePassword = async (password, hash) => {
	const valid = await bcrypt.compare(password, hash);

	return valid;
};

const updateUserAvatar = async (id, newAvatar) => {
	const user = User.findByIdAndUpdate(id, { avatarURL: newAvatar }, { new: true });
	return user;
};

const updateVerification = async (id, token, verify) => {
	const updatedVerify = User.findByIdAndUpdate(
		id,
		{ verificationToken: token, verify: verify },
		{ new: true }
	);
	return updatedVerify;
};

module.exports = {
	findUserByEmail,
	createUser,
	updateUserWithToken,
	validatePassword,
	findUserByToken,
	findUserByVerificationToken,
	updateUserAvatar,
	updateVerification,
};
