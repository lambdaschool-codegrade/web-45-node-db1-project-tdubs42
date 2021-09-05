const Account = require('./accounts-model')
const db = require('../../data/db-config')

exports.checkAccountPayload = (req, res, next) => {
  const {name, budget} = req.body
  if (!name || budget === undefined) {
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
    next({message: 'budget of account is too large or too small'})
  }
  req.account = req.body
  next()
}

exports.checkAccountNameUnique = (req, res, next) => {
  const {name} = req.account
  const available = db('accounts')
    .where('name', name.trim())
    .first()
  if (!available) {
    next({message: 'that name is taken'})
  }
  next()
}

exports.checkAccountId = (req, res, next) => {
  Account.getById(req.params.id)
    .then(account => {
      if (!account) {
        next({message: 'account not found', status: 404})
      }
      req.account = account
      next()
    })
    .catch(next)
}
