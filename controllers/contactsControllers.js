import {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	refreshContact,
} from "../services/contactsServices.cjs";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
	try {
		const result = await listContacts();
		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};

export const getOneContact = async (req, res, next) => {
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

export const deleteContact = async (req, res, next) => {
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

export const createContact = async (req, res, next) => {
	try {
		const { name, email, phone } = req.body;
		const result = await addContact(name, email, phone);
		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
};

export const updateContact = async (req, res, next) => {
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
