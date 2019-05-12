const express = require('express')
const router = express.Router()
const cors = require('cors')

const users = require('./controllers/users')
const boards = require('./controllers/boards')
const auth = require('./middleware/auth')

router.all('*', cors())

router.get('/users', auth, users.getUser)
router.post('/users/login', users.login)
router.post('/users/logout', auth, users.logout)
router.post('/users', users.createUser)  // signup
router.patch('/users', auth, users.updateUser)
router.delete('/users', auth, users.deleteUser)

router.get('/boards/:id', auth, boards.getBoard)
router.get('/boards', auth, boards.getBoards)
router.post('/boards', auth, boards.createBoard)
router.patch('/boards/:id', auth, boards.updateBoard)
router.delete('/boards/:id', auth, boards.deleteBoard)

router.get('*', function(req, res) {
  res.send({
    error: 'This route does not exist, try /users or /boards'
  })
})

module.exports = router
