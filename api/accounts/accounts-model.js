const db = require('../../data/db-config')

const getAll = () => {
  return db('accounts')
}

const getById = id => {
  return db('accounts')
    .where({id})
    .first()
}

const create = account => {
  return db('accounts')
    .insert(account)
    .then(id => getById(id))
}

const updateById = (id, account) => {
  return db('accounts')
    .where({id})
    .update(account)
    .then(id => getById(id))
}

const deleteById = id => {
  const deleted = getById(id)
  db('accounts')
    .where({id})
    .del()
  return deleted
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
