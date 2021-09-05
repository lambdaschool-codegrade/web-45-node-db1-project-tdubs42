const router = require('express').Router()
const Account = require('./accounts-model')
const {checkAccountId, checkAccountPayload, checkAccountNameUnique} = require('./accounts-middleware')

router.get('/', (req, res, next) => {
  Account.getAll()
    .then(accounts => res.json(accounts))
    .catch(next)
})

router.get('/:id', checkAccountId, (req, res, next) => {
  res.json(req.found)
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  Account.create(req.account)
    .then(account => res.status(201).json(account))
    .catch(next)
})

router.put('/:id', checkAccountPayload, checkAccountId, (req, res, next) => {
  const {id} = req.found
  const changes = req.account
  Account.updateById(id, changes)
    .then(account => res.json(account))
    .catch(next)
})

router.delete('/:id', checkAccountId, (req, res, next) => {
  Account.deleteById(req.found.id)
    .then(deleted => res.json(deleted))
    .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    fromTheDev: 'Mistakes were made'
  })
})

module.exports = router
