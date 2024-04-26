const Contact = require("../model/contact.js");

async function listContacts(filter, options) {
	return Contact.find(filter)
		.skip((options.page - 1) * options.limit)
		.limit(options.limit);
}

async function getContactById(filter) {
	const result = await Contact.findById(filter);
	return result;
}

async function removeContact(filter) {
	const result = await Contact.findByIdAndDelete(filter);
	return result;
}

async function addContact(user, owner) {
	const result = await Contact.create({ ...user, owner });
	return result;
}

async function refreshContact(filter, data) {
	const result = await Contact.findByIdAndUpdate(filter, { ...data }, { new: true });
	return result;
}

async function favoriteContact(filter, data) {
	await Contact.findByIdAndUpdate(filter, { ...data }, { new: true });
	const result = await Contact.findById(filter._id);
	return result;
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	refreshContact,
	favoriteContact,
};
