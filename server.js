const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;
const connection = mongoose.connect(uriDb, {
	promiseLibrary: global.Promise,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});

connection
	.then(() => {
		app.listen(PORT, function () {
			console.log(`Server running. Use our API on port: ${PORT}`);
		});
	})
	.catch((err) => {
		console.log(`Server not running. Error message: ${err.message}`);
		process.exit(1);
	});