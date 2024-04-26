const Contact = require("../model/contact.js");
const HttpError = require("../helpers/HttpError.js");
const func = require("../services/contactsServices.js");

const getAllContacts = async (req, res, next) => {
	try {
		const { id } = req.user;
		const { page = undefined, limit = undefined } = req.query;

		const filter = { owner: id };

		const options = {
			page: +page,
			limit: +limit,
		};

		const resp = await func.listContacts(filter, options);

		res.status(200).json(resp);
	} catch (error) {
		next(error);
	}
};

const getOneContact = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { id: owner } = req.user;

		const filter = { _id: id, owner };

		const resp = await func.getContactById(filter);
		if (resp == null) {
			throw HttpError(404, "Not Found");
		}
		res.status(200).json(resp);
	} catch (error) {
		next(error);
	}
};

const deleteContact = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { id: owner } = req.user;

		const filter = { _id: id, owner };

		const resp = await func.removeContact(filter);
		if (resp == null) {
			throw HttpError(404, "Not Found");
		}
		res.status(200).json(resp);
	} catch (error) {
		next(error);
	}
};

const createContact = async (req, res, next) => {
	try {
		const { _id: owner } = req.user;
		const resp = await func.addContact(req.body, owner);
		res.status(201).json(resp);
	} catch (error) {
		next(error);
	}
};

const updateContact = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { id: owner } = req.user;
		const data = req.body;

		const filter = { _id: id, owner };

		const resp = await func.refreshContact(filter, data);
		if (resp == null) {
			throw HttpError(404, "Not Found");
		}
		res.status(200).json(resp);
	} catch (error) {
		next(error);
	}
};

const updateStatusContact = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { id: owner } = req.user;

		const filter = { _id: id, owner };

		const resp = await func.favoriteContact(filter, req.body);
		if (resp == null) {
			throw HttpError(404, "Not Found");
		}
		res.status(200).json(resp);
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
