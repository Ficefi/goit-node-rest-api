const { connect } = require("mongoose");
require("dotenv").config();
const { DB_HOST } = process.env;

const connectDB = async () => {
	try {
		await connect(DB_HOST);
		console.log("DB is connected!");
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	connectDB,
};
