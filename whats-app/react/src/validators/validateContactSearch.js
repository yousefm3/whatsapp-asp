import contacts from "../data/contacts.json";

const validateFindContact = (username) => {
  const contact = contacts.find((contact) => contact.username === username);
  return contact;
};
export default validateFindContact;
