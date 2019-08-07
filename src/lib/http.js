const superagent = require('superagent')

const get = async (url, query = {}) => {
  const { body } = await superagent.get(url).query(query)

  return body
}

module.exports = {
  get
}
