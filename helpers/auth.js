const HttpError = require("../helpers/HttpError.js");
const { isValidJWT } = require("../helpers/isValidJWT.js");
const User = require("../model/user.js");

const auth = async (req, res, next) => {
	const { authorization = "" } = req.headers;
	const [bearer, token] = authorization.split(" ");

	if (bearer !== "Bearer") {
		next(HttpError(401, "Unauthorized"));
	}

	try {
		const { id } = isValidJWT(token);

		const user = await User.findById(id);

		if (!user?.token || user.token !== token) {
			next(HttpError(401, "Unauthorized"));
		}
		req.user = user;
		next();
	} catch (e) {
		next(HttpError(401, "Unauthorized"));
	}
};

module.exports = { auth };
