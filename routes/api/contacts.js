const express = require('express')
const router = express.Router()
const Joi = require('joi')

const {
    getList,
    getById,
    add,
    removeById,
    updateById
} = require('../../controllers/index')

const controllerWrapper = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}

const validation = (scheme) => {
  return (req, res, next) => {
    const { error } = scheme.validate(req.body)
    if (error) {
      error.status = 400
      next(error)
      return
    }
    next()
  }
}

const contactsScheme = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

const validateMiddleware = validation(contactsScheme)

router.get('/', controllerWrapper(getList))

router.get('/:contactId', controllerWrapper(getById))

router.post('/', validateMiddleware, controllerWrapper(add))

router.delete('/:contactId', controllerWrapper(removeById))

router.put('/:contactId', validateMiddleware, controllerWrapper(updateById))

module.exports = router
