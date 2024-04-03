const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "..", "db/contacts.json");

function createId() {
	return Math.round(Math.random() * 10 ** 20).toString();
}

async function listContacts() {
	const data = await fs.readFile(contactsPath);
	return JSON.parse(data);
}

async function getContactById(contactId) {
	const array = await listContacts();
	const index = array.findIndex((arr) => arr.id === contactId);
	return array[index] || null;
}

async function removeContact(contactId) {
	const array = await listContacts();
	const index = array.findIndex((arr) => arr.id === contactId);
	if (index === -1) {
		return null;
	}
	const newArray = array.filter((contact) => contact.id !== contactId);
	fs.writeFile(contactsPath, JSON.stringify(newArray));
	return array[index];
}

async function addContact(name, email, phone) {
	const array = await listContacts();
	const newUser = { id: createId(), name: name, email: email, phone: phone };
	array.push(newUser);
	fs.writeFile(contactsPath, JSON.stringify(array));
	return newUser;
}

async function refreshContact(contactId, data) {
	const array = await listContacts();
	const contact = await getContactById(contactId);
	const index = array.findIndex((arr) => arr.id === contactId);
	contact.name = data.name == undefined ? contact.name : data.name;
	contact.phone = data.phone == undefined ? contact.phone : data.phone;
	contact.email = data.email == undefined ? contact.email : data.email;
	if (index === -1) {
		return null;
	} else {
		array[index] = contact;
		fs.writeFile(contactsPath, JSON.stringify(array));
		return array[index] || null;
	}
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	refreshContact,
};
