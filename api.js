const fs = require('fs')
const _ = require('lodash')

function getProperty (req, res) {
  fs.readFile(`./data/${req.params.id}.json`, 'utf8', function (err, jsonStr) {
    if (err) {
      console.error(err)
      return res.status(404).json({ success: false })
    }

    const properties = req.params['0'].split('/').filter(el => !!el)
    const data = _.get(JSON.parse(jsonStr), properties.join('.'))

    if (!data) {
      return res.status(404).json({ success: false })
    }
    return res.json({
      success: true,
      data
    })
  })
}

function saveProperty (req, res) {
  if (!fs.existsSync(('./data'))) {
    fs.mkdirSync('./data')
  }

  fs.readFile(`./data/${req.params.id}.json`, 'utf8', function (err, jsonStr) {
    let data = {}
    if (!err) {
      data = JSON.parse(jsonStr)
    }

    const properties = req.params['0'].split('/').filter(el => !!el)
    _.set(data, properties.join('.'), req.body)

    fs.writeFile(`./data/${req.params.id}.json`, JSON.stringify(data), function (err) {
      if (err) {
        console.error(err)
        return res.json({ success: false })
      }

      return res.json({ success: true })
    })
  })
}

function deleteProperty (req, res) {
  fs.readFile(`./data/${req.params.id}.json`, 'utf8', function (err, jsonStr) {
    if (err) {
      console.error(err)
      return res.status(404).json({ success: false })
    }

    let data = JSON.parse(jsonStr)
    const properties = req.params['0'].split('/').filter(el => !!el)

    if (!_.get(data, properties.join('.'))) {
      return res.status(404).json({ success: false })
    }

    data = _.omit(data, [properties.join('.')])
    fs.writeFile(`./data/${req.params.id}.json`, JSON.stringify(data), function (err) {
      if (err) {
        console.error(err)
        return res.json({ success: false })
      }

      return res.json({ success: true })
    })
  })
}

module.exports = {
  getProperty,
  saveProperty,
  deleteProperty
}
