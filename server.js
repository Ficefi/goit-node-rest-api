const { connectDB } = require("./db/connection.js");
const { app } = require("./app.js");
require("dotenv").config();

const { PORT } = process.env;

const startServer = async () => {
	try {
		await connectDB();

		app.listen(PORT, () => {
			console.log(`DB is connected`);
		});
	} catch (error) {
		console.log(error);
	}
};

startServer();
