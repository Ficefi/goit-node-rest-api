const express = require("express");
const {
	getAllContacts,
	getOneContact,
	deleteContact,
	createContact,
	updateContact,
	updateStatusContact,
} = require("../controllers/contactsControllers.js");
const validateBody = require("../helpers/validateBody.js");
const {
	createContactSchema,
	updateContactSchema,
	updateFavoriteSchema,
} = require("../schemas/contactsSchemas.js");

const { auth } = require("../helpers/auth.js");

const contactsRouter = express.Router();

contactsRouter.get("/", auth, getAllContacts);

contactsRouter.get("/:id", auth, getOneContact);

contactsRouter.delete("/:id", auth, deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), auth, createContact);

contactsRouter.put("/:id", validateBody(updateContactSchema), auth, updateContact);

contactsRouter.patch(
	"/:id/favorite",
	validateBody(updateFavoriteSchema),
	auth,
	updateStatusContact
);

module.exports = contactsRouter;
