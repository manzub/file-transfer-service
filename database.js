const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')
const { join, dirname } = require("path");

const _dirname = dirname(__filename)

// Setup Lowdb
const file = join(_dirname, 'data.json')
const adapter = new FileSync(file)
const database =  low(adapter)

database.defaults({locations:[]}).write()

function getLocation(location) {
  const result = database.get('locations').find({location}).value()
  return result ? result : 'Downloads'
}

module.exports = {
  database,
  getLocation
}

