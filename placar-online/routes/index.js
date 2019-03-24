var express = require('express')
var router = express.Router()
const _ = require('loadsh')

//definindo o bd
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync(__dirname + '/../data/db.json')
const db = low(adapter)
const defaultData = require('../data/default-data.json')
db.defaults(defaultData).write()

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

module.exports = router
