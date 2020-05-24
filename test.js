const tape = require('tape')
const jsonist = require('jsonist')
const fs = require('fs')

const port = (process.env.PORT = process.env.PORT || require('get-port-sync')())
const endpoint = `http://localhost:${port}`

const server = require('./server')

tape('PUT /:student-id/:propertyName SUCCESS', function (t) {
  const url = `${endpoint}/rn1abu8/courses/calculus/quizzes/ye0ab61`
  const data = { score: 98 }
  jsonist.put(url, data, (err, body) => {
    if (err) t.error(err)

    t.ok(body.success, 'PUT "/rn1abu8/courses/calculus/quizzes/ye0ab61" with data { "score": 98 } should have success response')
    t.end()
  })
})

tape('GET /:student-id/:propertyName FAILURE', function (t) {
  const url = `${endpoint}/rn1abu8/courses/calculus/quizzes/failed`
  jsonist.get(url, (err, body) => {
    if (err) t.error(err)

    t.ok(!body.success, 'GET "/rn1abu8/courses/calculus/quizzes/failed" should have error response')
    t.end()
  })
})

tape('GET /:student-id/:propertyName SUCCESS', function (t) {
  const url = `${endpoint}/rn1abu8/courses/calculus/quizzes/ye0ab61`
  jsonist.get(url, (err, body) => {
    if (err) t.error(err)

    t.ok(body.success, 'GET "/rn1abu8/courses/calculus/quizzes/ye0ab61" should have success response')
    t.equal(JSON.stringify(body.data), '{"score":98}', 'Response of GET "/rn1abu8/courses/calculus/quizzes/ye0ab61" should be {"score":98}')
    t.end()
  })
})

tape('DELETE /:student-id/:propertyName FAILURE', function (t) {
  const url = `${endpoint}/rn1abu8/courses/calculus/quizzes/failed`
  jsonist.delete(url, (err, body) => {
    if (err) t.error(err)

    t.ok(!body.success, 'DELETE "/rn1abu8/courses/calculus/quizzes/failed" should have error response')
    t.end()
  })
})

tape('DELETE /:student-id/:propertyName SUCCESS', function (t) {
  const url = `${endpoint}/rn1abu8/courses/calculus/quizzes/ye0ab61`
  jsonist.delete(url, (err, body) => {
    if (err) t.error(err)

    t.ok(body.success, 'DELETE "/rn1abu8/courses/calculus/quizzes/ye0ab61" should have success response')
    fs.readFile('./data/rn1abu8.json', 'utf8', function (err, jsonStr) {
      if (err) t.error(err)

      const data = JSON.parse(jsonStr)
      t.ok(!data.courses.calculus.quizzes.ye0ab61, "require('./data/rn1abu8.json').courses.calculus.quizzes.ye0ab6 should be undefined")
      t.end()
    })
  })
})

tape('cleanup', function (t) {
  server.close()
  t.end()
})
