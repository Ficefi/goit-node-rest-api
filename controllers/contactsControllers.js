import {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	refreshContact,
} from "../services/contactsServices.cjs";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res) => {
	const result = await listContacts();
	res.json({
		status: "success",
		code: 200,
		data: result,
	});
};

export const getOneContact = async (req, res) => {
	const { id } = req.params;
	const result = await getContactById(id);
	if (result == null) {
		throw HttpError(404, "Not Found");
	} else {
		res.json({
			status: "success",
			code: 200,
			data: result,
		});
	}
};

export const deleteContact = async (req, res) => {
	const { id } = req.params;
	const result = await removeContact(id);
	if (result == null) {
		throw HttpError(404, "Not Found");
	}
	res.json({
		status: "success",
		code: 200,
		data: result,
	});
};

export const createContact = async (req, res) => {
	const { name, email, phone } = req.body;
	const result = await addContact(name, email, phone);
	console.log(name, email, phone);
	res.json({
		status: "success",
		code: 201,
		data: result,
	});
};

export const updateContact = async (req, res) => {
	const { id } = req.params;
	const { name, email, phone } = req.body;
	console.log(req.body);
	const result = await refreshContact(id, { name, email, phone });
	if (result == null) {
		throw HttpError(404, "Not Found");
	}
	res.json({
		status: "success",
		code: 200,
		data: result,
	});
};
