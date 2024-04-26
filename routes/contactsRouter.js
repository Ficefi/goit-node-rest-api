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
const { isValId } = require("../helpers/isValidID.js");

const contactsRouter = express.Router();

contactsRouter.get("/", auth, getAllContacts);

contactsRouter.get("/:id", auth, isValId, getOneContact);

contactsRouter.delete("/:id", auth, isValId, deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), auth, createContact);

contactsRouter.put("/:id", validateBody(updateContactSchema), auth, isValId, updateContact);

contactsRouter.patch(
	"/:id/favorite",
	validateBody(updateFavoriteSchema),
	auth,
	isValId,
	updateStatusContact
);

module.exports = contactsRouter;
