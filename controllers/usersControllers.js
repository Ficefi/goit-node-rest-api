const HttpError = require("../helpers/HttpError.js");
const func = require("../services/userServices.js");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs").promises;
const { changeSize } = require("../helpers/changeImageSize.js");

const userSignUp = async (req, res, next) => {
	const { name, email, password } = req.body;
	try {
		const user = await func.findUserByEmail(email);
		if (user) {
			throw HttpError(409, "Similar email already exists");
		}

		const avatarURL = gravatar.url(email, null, false);

		const createdUser = await func.createUser({ name, email, password, avatarURL });
		const { subscription } = createdUser;

		res.status(201).json({
			user: {
				email,
				subscription,
			},
		});
	} catch (error) {
		next(error);
	}
};

const userLogin = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const user = await func.findUserByEmail(email);
		if (!user) {
			throw HttpError(401, "Email or password is wrong");
		}
		const isValidPassword = await func.validatePassword(password, user.password);
		if (!isValidPassword) {
			throw HttpError(401, "Email or password is wrong");
		}

		const { subscription } = user;
		const newUser = await func.updateUserWithToken(user.id);

		res.status(200).json({
			token: newUser.token,
			user: {
				email,
				subscription,
			},
		});
	} catch (error) {
		next(error);
	}
};

const userLogout = async (req, res, next) => {
	const { id } = req.user;
	try {
		await func.updateUserWithToken(id);

		res.status(204).json({
			message: "No content",
		});
	} catch (error) {
		next(error);
	}
};

const userCurrent = async (req, res, next) => {
	try {
		const { token } = req.user;

		const user = await func.findUserByToken(token);
		const { email, subscription } = user;

		if (!user) {
			throw HttpError(401, "User doesn`t exist");
		}

		res.status(200).json({
			email,
			subscription,
		});
	} catch (error) {
		next(error);
	}
};

const userAvatar = async (req, res, next) => {
	const { id } = req.user;
	const avatarsDir = path.resolve("public", "avatars");

	try {
		if (!req.file) {
			throw HttpError(404, "Not Found");
		}

		const { path: tempUpload, originalname } = req.file;
		const filename = `${id}_${originalname}`;
		const result = path.resolve(avatarsDir, filename);
		await fs.rename(tempUpload, result);

		const updatedUrl = path.join("avatars", filename);
		const updatedUser = await func.updateUserAvatar(id, updatedUrl);

		await changeSize(result);

		res.status(200).json({ avatarURL: updatedUser.avatarURL });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	userSignUp,
	userLogin,
	userCurrent,
	userLogout,
	userAvatar,
};
