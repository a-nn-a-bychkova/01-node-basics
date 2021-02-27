// import * as fs from "fs/promises";
// import { promises as fs } from "fs";
// import path from "path";
const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.join(__dirname, "/db/contacts.json");
const contactList = fs.readFile(contactsPath, "utf8");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    // console.table(JSON.parse(data));
    return JSON.parse(data);
  } catch (error) {
    return console.error(error.message);
  }
}

// fs.readFile(filename, [options]) - чтение файла
// fs.writeFile(filename, data, [options]) - запись файла
async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contactToFind = contacts.find((contact) => contact.id === contactId);
    console.log("contact Found", contactToFind);
    return contactToFind;
  } catch (error) {
    return console.error(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const newList = contacts.filter((contact) => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newList, null, 2), "utf-8");
    console.table(await listContacts());
  } catch (error) {
    return console.error(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const newContact = {
      id: shortid.generate(),
      name,
      email,
      phone,
    };
    const contacts = await listContacts();
    const newContactList = [newContact, ...contacts];
    console.log("newContactList", newContactList);
    await fs.writeFile(
      contactsPath,
      JSON.stringify(newContactList, null, 2),
      "utf-8"
    );
  } catch (error) {
    return console.error(error.message);
  }
}
// const a = 5;
// export default a;
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
