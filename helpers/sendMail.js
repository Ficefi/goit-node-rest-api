const nodemailer = require("nodemailer");
const { getHtml } = require("../helpers/htmlCode");

require("dotenv").config();

const config = {
	host: "smtp.meta.ua",
	port: 465,
	secure: true,
	auth: {
		user: process.env.SERVICE_EMAIL,
		pass: process.env.SERVICE_PASSWORD,
	},
};

const sendMail = (receiver, verificationToken) => {
	const transporter = nodemailer.createTransport(config);
	const htmlCode = getHtml(verificationToken);
	const emailOptions = {
		from: process.env.SERVICE_EMAIL,
		to: receiver,
		subject: "Mail Verification",
		html: htmlCode,
	};

	transporter.sendMail(emailOptions);
};

module.exports = {
	sendMail,
};
