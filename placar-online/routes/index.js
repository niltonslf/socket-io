var express = require('express')
var router = express.Router()
const _ = require('loadsh')

function indexRouter(dependecies) {
  const { db, io } = dependecies

  io.on('connect', socket => {
    console.log('new client connected')
  })

  /* GET home page. */
  router.get('/', function(req, res, next) {
    const matches = db.get('matches').value()
    // Renderizar tela
    res.render('index', { matches })
  })

  /* GET match page */
  router.get('/match/:id', function(req, res, next) {
    const id = req.params.id
    const matches = db.get('matches').value()
    const match = db.get('matches[' + id + ']').value()
    match.bids = _.orderBy(match.bids, ['half', 'time'], ['desc', 'desc'])
    // Renderizar tela
    res.render('match', { matches, match, id })
  })
  return router
}

module.exports = indexRouter
