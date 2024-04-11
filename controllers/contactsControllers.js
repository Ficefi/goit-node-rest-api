const Contact = require("../model/model.js");
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
		const result = await getContactById(id);
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
		const result = await removeContact(id);
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
		const { name, email, phone } = req.body;
		const result = await addContact(name, email, phone);
		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
};

const updateContact = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { name, email, phone } = req.body;
		const result = await refreshContact(id, { name, email, phone });
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
};
