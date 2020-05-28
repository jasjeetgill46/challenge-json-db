const fs = require('fs')

function getPropertyById (id, cb) {
  fs.readFile(`./data/${id}.json`, 'utf8', function (err, jsonStr) {
    if (err) {
      return cb(err, jsonStr)
    }

    const data = JSON.parse(jsonStr)
    return cb(err, data)
  })
}

function savePropertyById (id, data, cb) {
  if (!fs.existsSync('./data')) {
    fs.mkdirSync('./data')
  }

  fs.writeFile(`./data/${id}.json`, JSON.stringify(data), function (err) {
    if (err) {
      console.error(err)
    }

    return cb(err)
  })
}

module.exports = {
  getPropertyById,
  savePropertyById
}
