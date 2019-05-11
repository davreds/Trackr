const express = require('express')
const router = express.Router()
const cors = require('cors')

const users = require('./controllers/users')
const boards = require('./controllers/boards')
const auth = require('./middleware/auth')

router.all('*', cors())

// Rutas
