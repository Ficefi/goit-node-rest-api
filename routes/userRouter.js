const express = require("express");
const {
	userSignUp,
	userLogin,
	userLogout,
	userCurrent,
	userAvatar,
} = require("../controllers/usersControllers.js");
const { createUserSchema, loginUserSchema } = require("../schemas/userSchemas.js");
const validateBody = require("../helpers/validateBody.js");
const { auth } = require("../helpers/auth.js");
const { upload } = require("../helpers/upload.js");

const userRouter = express.Router();

userRouter.post("/register", validateBody(createUserSchema), userSignUp);

userRouter.post("/login", validateBody(loginUserSchema), userLogin);

userRouter.post("/logout", auth, userLogout);

userRouter.get("/current", auth, userCurrent);

userRouter.patch("/avatars", auth, upload.single("avatar"), userAvatar);

module.exports = userRouter;
