const createError = require('http-errors')
const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
} = require('../models/contacts')

const getList = async (req, res) => {
    const contactsList = await listContacts();
    res.json({
        status: 'Success',
        code: 200,
        message: 'Contacts found',
        data: {
            result: contactsList
        }
    })
}

const getById = async (req, res) => {
    const { contactId } = req.params
    const searchedContact = await getContactById(contactId)
    if (!searchedContact) {
        throw createError(404, `Contact with id:${contactId} not found`)
    }
    res.json({
        status: 'Success',
        code: 200,
        message: `Contact with id:${contactId} found`,
        data: {
            result: searchedContact
        }
    })
}

const add = async (req, res) => {
    const result = await addContact(req.body)
    res.status(201).json({
        status: 'Success',
        code: 201,
        message: 'Contact created',
        data: {
            result: result
        }
    })
}

const removeById = async (req, res) => {
    const { contactId } = req.params
    const result = await removeContact(contactId, req.body)
    if (!result) {
        throw createError(404, `Contact with id:${contactId} is not found`)
    }
    res.json({
        status: 'Success',
        code: 200,
        message: 'Contact deleted',
        data: {
            result: result
        }
    })
}

const updateById = async (req, res) => {
    const { contactId } = req.params
    const result = await updateContact(contactId, req.body)
    if (!result) {
        throw createError(404, `Contact with id:${contactId} is not found`)
    }
    res.json({
        status: 'Success',
        code: 200,
        message: 'Contact updated',
        data: {
            result: result
        }
    })
}

module.exports = {
    getList,
    getById,
    add,
    removeById,
    updateById
}