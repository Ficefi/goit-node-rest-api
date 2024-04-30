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
const { isValId } = require("../middlewares");

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", isValId, getOneContact);

contactsRouter.delete("/:id", isValId, deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.put("/:id", isValId, validateBody(updateContactSchema), updateContact);

contactsRouter.patch(
	"/:id/favorite",
	isValId,
	validateBody(updateFavoriteSchema),
	updateStatusContact
);

module.exports = contactsRouter;
