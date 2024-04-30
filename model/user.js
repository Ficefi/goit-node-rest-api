const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
	{
		password: {
			type: String,
			required: [true, "Password is required"],
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
		},
		subscription: {
			type: String,
			enum: ["starter", "pro", "business"],
			default: "starter",
		},
		token: {
			type: String,
			default: null,
		},
		avatarURL: String,
	},
	{ versionKey: false }
);

userSchema.methods.hashPasswords = async function () {
	this.password = await bcrypt.hash(this.password, 10);
};

const User = model("user", userSchema);

module.exports = User;
