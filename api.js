const _ = require('lodash')
const model = require('./model')

function getProperty (req, res) {
  model.getPropertyById(req.params.id, function (err, data) {
    if (err) {
      return res.status(404).json({ success: false })
    }

    const properties = req.params['0'].split('/').filter(el => !!el)
    const result = _.get(data, properties.join('.'))

    if (!result) {
      return res.status(404).json({ success: false })
    }
    return res.json({
      success: true,
      data: result
    })
  })
}

function saveProperty (req, res) {
  let body = req.body
  if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
    body = Object.keys(req.body)[0]
    try {
      body = JSON.parse(body)
    } catch (e) { }
  }

  model.getPropertyById(req.params.id, function (err, data) {
    if (err) {
      data = {}
    }

    const properties = req.params['0'].split('/').filter(el => !!el)
    _.set(data, properties.join('.'), body)

    model.savePropertyById(req.params.id, data, function (err) {
      return res.json({ success: !err })
    })
  })
}

function deleteProperty (req, res) {
  model.getPropertyById(req.params.id, function (err, data) {
    if (err) {
      return res.status(404).json({ success: false })
    }

    const properties = req.params['0'].split('/').filter(el => !!el)
    if (!_.get(data, properties.join('.'))) {
      return res.status(404).json({ success: false })
    }

    data = _.omit(data, [properties.join('.')])
    model.savePropertyById(req.params.id, data, function (err) {
      return res.json({ success: !err })
    })
  })
}

module.exports = {
  getProperty,
  saveProperty,
  deleteProperty
}
