var express = require('express')
var router = express.Router()
const _ = require('loadsh')

function adminRouter(dependecies) {
  const { db, io } = dependecies

  /* GET home page. */
  router.get('/', function(req, res, next) {
    const matches = db.get('matches').value()
    // Renderizar tela
    res.render('admin/index', { matches })
  })

  /* GET match page */
  router.get('/match/:id', function(req, res, next) {
    const id = req.params.id
    const matches = db.get('matches').value()
    const match = db.get('matches[' + id + ']').value()
    match.bids = _.orderBy(match.bids, ['half', 'time'], ['desc', 'desc'])
    // Renderizar tela
    res.render('admin/match', { matches, match, id })
  })

  router.post('/match/:id/score', function(req, res, next) {
    db.set(
      'matches[' + req.params.id + '].team-a.score',
      parseInt(req.body.scoreA)
    ).write()
    db.set(
      'matches[' + req.params.id + '].team-b.score',
      parseInt(req.body.scoreB)
    ).write()

    io.emit('score', {
      match: req.params.id,
      scoreA: req.body.scoreA,
      scoreB: req.body.scoreB,
      notify: req.body.notify || 0,
    })

    res.send(req.body)
  })

  return router
}

module.exports = adminRouter
