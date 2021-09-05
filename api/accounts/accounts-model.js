const db = require('../../data/db-config')

const getAll = async () => {
  return db('accounts')
}

const getById = async id => {
  return db('accounts')
    .where({id})
    .first()
}

const create = async account => {
  return db('accounts')
    .insert(account)
    .then(id => getById(id[0]))
}

const updateById = async (id, account) => {
  await db('accounts')
    .where({id})
    .update(account)
  return getById(id)
}

const deleteById = async id => {
  const deleted = getById(id)
  await db('accounts')
    .where({id})
    .delete()
  return deleted
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
