const Account = require('./accounts-model')
const db = require('../../data/db-config')

exports.checkAccountPayload = (req, res, next) => {
  const {name, budget} = req.body
  if (budget === undefined) {
    next({message: 'name and budget are required', status: 400})
  }
  if (!name) {
    next({message: 'name and budget are required', status: 400})
  }
  if (typeof name !== 'string') {
    next({message: 'name of account must be a string', status: 400})
  }
  if (name.trim().length < 3 || name.trim().length > 100) {
    next({message: 'name of account must be between 3 and 100', status: 400})
  }
  if (typeof budget !== 'number') {
    next({message: 'budget of account must be a number', status: 400})
  }
  if (budget < 0 || budget > 1000000) {
    next({message: 'budget of account is too large or too small', status: 400})
  }
  req.account = {
    name: name.trim(),
    budget: budget
  }
  next()
}

exports.checkAccountNameUnique = async (req, res, next) => {
  const {name} = req.account
  await db('accounts')
    .where('name', name.trim())
    .first()
    .then(taken => {
      if (taken) {
        next({message: 'that name is taken', status: 400})
      }
      next()
    })
}

exports.checkAccountId = (req, res, next) => {
  Account.getById(req.params.id)
    .then(account => {
      if (!account) {
        next({message: 'account not found', status: 404})
      }
      req.found = account
      next()
    })
    .catch(next)
}
