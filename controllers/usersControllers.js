const HttpError = require("../helpers/HttpError.js");
const func = require("../services/userServices.js");

const userSignUp = async (req, res, next) => {
	const { name, email, password } = req.body;
	try {
		const user = await func.findUserByEmail(email);
		if (user) {
			throw HttpError(409, "Similar email already exists");
		}

		const createdUser = await func.createUser({ name, email, password });

		res.status(201).json({
			user: {
				name,
				email,
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
		const { subscription } = user;
		if (!user) {
			throw HttpError(401, "Your email doesn`t exist");
		}
		const isValidPassword = await func.validatePassword(password, user.password);
		if (!isValidPassword) {
			throw HttpError(401, "Your password is incorrect");
		}

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

module.exports = {
	userSignUp,
	userLogin,
	userCurrent,
	userLogout,
};
