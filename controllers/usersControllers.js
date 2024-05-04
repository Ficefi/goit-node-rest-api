const HttpError = require("../helpers/HttpError.js");
const func = require("../services/userServices.js");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs").promises;
const { sendMail } = require("../helpers/sendMail.js");
const { v4 } = require("uuid");
const { changeSize } = require("../helpers/changeImageSize.js");

const userSignUp = async (req, res, next) => {
	const { name, email, password } = req.body;
	try {
		const user = await func.findUserByEmail(email);
		if (user) {
			throw HttpError(409, "Similar email already exists");
		}

		const avatarURL = gravatar.url(email, null, false);

		const verificationToken = v4();

		const createdUser = await func.createUser({
			name,
			email,
			password,
			avatarURL,
			verificationToken,
		});
		const { subscription } = createdUser;

		sendMail(email, verificationToken);

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

		if (user.verify === false) {
			throw HttpError(401, "You should verificate your email before login");
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
	const { token } = req.user;
	try {
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
			throw HttpError(400, "Bad Request");
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

const userVerification = async (req, res, next) => {
	const { verificationToken } = req.params;
	try {
		const user = await func.findUserByVerificationToken(verificationToken);

		if (!user) {
			throw HttpError(404, "Not found");
		}

		await func.updateVerification(user._id, null, true);

		res.status(200).json({ message: "Verification successful" });
	} catch (error) {
		next(error);
	}
};

const resendVerification = async (req, res, next) => {
	const { email } = req.body;

	try {
		if (!email) {
			throw HttpError(400, "Missing required field email");
		}

		const user = await func.findUserByEmail(email);

		if (!user) {
			throw HttpError(400, "User doesn't exist");
		}

		if (user.verify === true) {
			throw HttpError(400, "Verification has already been passed");
		}

		sendMail(email, user.verificationToken);

		res.status(200).json({ message: "Verification email sent" });
	} catch (e) {
		next(e);
	}
};

module.exports = {
	userSignUp,
	userLogin,
	userCurrent,
	userLogout,
	userAvatar,
	userVerification,
	resendVerification,
};
