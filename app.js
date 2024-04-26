const contactsRouter = require("./routes/contactsRouter.js");
const userRouter = require("./routes/userRouter.js");

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

require("dotenv").config();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
	res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
	const { status = 500, message = "Server error" } = err;
	res.status(status).json({ message });
});

module.exports = {
	app,
};
