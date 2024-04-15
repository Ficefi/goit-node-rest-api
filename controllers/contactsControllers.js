const Contact = require("../model/contact.js");
const HttpError = require("../helpers/HttpError.js");

const getAllContacts = async (req, res, next) => {
	try {
		const result = await Contact.find();
		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};

const getOneContact = async (req, res, next) => {
	try {
		const { id } = req.params;
		const result = await Contact.findById(id);
		if (result == null) {
			throw HttpError(404, "Not Found");
		}
		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};

const deleteContact = async (req, res, next) => {
	try {
		const { id } = req.params;
		const result = await Contact.findByIdAndDelete(id);
		if (result == null) {
			throw HttpError(404, "Not Found");
		}
		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};

const createContact = async (req, res, next) => {
	try {
		const result = await Contact.create(req.body);
		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
};

const updateContact = async (req, res, next) => {
	try {
		const { id } = req.params;
		await Contact.findByIdAndUpdate(id, req.body);
		const result = await Contact.findById(id);
		if (result == null) {
			throw HttpError(404, "Not Found");
		}
		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};

const updateStatusContact = async (req, res, next) => {
	try {
		const { id } = req.params;
		await Contact.findByIdAndUpdate(id, req.body, { new: true });
		const result = await Contact.findById(id);
		if (result == null) {
			throw HttpError(404, "Not Found");
		}
		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getAllContacts,
	getOneContact,
	deleteContact,
	createContact,
	updateContact,
	updateStatusContact,
};
