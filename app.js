const contactsRouter = require("./routes/contactsRouter.js");

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();

require("dotenv").config();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;
const uriDb = process.env.DB_HOST;
const connection = mongoose.connect(uriDb);

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
	res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
	const { status = 500, message = "Server error" } = err;
	res.status(status).json({ message });
});

connection
	.then(() => {
		app.listen(PORT, () => {
			console.log("Database connection successful");
		});
	})
	.catch((err) => {
		console.log(`Server not running. Error message: ${err.message}`);
		process.exit(1);
	});
