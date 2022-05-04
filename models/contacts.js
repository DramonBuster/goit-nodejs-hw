const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, './contacts.json');

const listContacts = async () => {
  const contactsList = JSON.parse(await fs.readFile(contactsPath));

  return contactsList;
}

const getContactById = async (id) => {
  const contactsList = await listContacts();
  const searchedContact = contactsList.find(contact => contact.id === `${id}`);

  console.log(searchedContact);

  if (!searchedContact) {
    return null;
  }

  return searchedContact;
}

const removeContact = async (id) => {
  const contactsList = await listContacts();
  const indexOfContact = contactsList.findIndex(contact => contact.id === `${id}`);

  if (indexOfContact === -1) {
    return null;
  }

  console.log("Removing contact:");
  console.table(contactsList[indexOfContact]);

  contactsList.splice(indexOfContact, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return contactsList;
}

const addContact = async ({name, email, phone}) => {
  const contactsList = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
    
  contactsList.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));

  return contactsList;
}

const updateContact = async (id, body) => {
  const contactsList = await listContacts();
  const indexOfContact = contactsList.findIndex(contact => contact.id === `${id}`);
  if (indexOfContact === -1) {
    return null;
  }

  contactsList[indexOfContact] = { id, ...body };

  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return contactsList[indexOfContact]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
