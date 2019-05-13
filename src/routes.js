const express = require('express')
const router = express.Router()
const cors = require('cors')

const users = require('./controllers/users.js')
const boards = require('./controllers/boards.js')
const auth = require('./middleware/auth.js')

router.all('*', cors())

router.get('/users', auth, users.getUser)
router.post('/users/login', users.login)
router.post('/users/logout', auth, users.logout)
router.post('/users', users.createUser)  // signup
router.patch('/users', auth, users.updateUser)
router.delete('/users', auth, users.deleteUser)

router.patch('/users/addBoard', auth, users.addBoard)
router.patch('/users/removeBoard', auth, users.removeBoard)

router.get('/boards/:id', auth, boards.getBoard)
router.get('/boards', auth, boards.getBoards)
router.post('/boards', auth, boards.createBoard)
router.patch('/boards/:id', auth, boards.updateBoard)
router.delete('/boards/:id', auth, boards.deleteBoard)

router.patch('/boards/addProject/:id', auth, boards.addProject)
router.patch('/boards/removeProject/:id', auth, boards.removeProject)
// router.patch('/boards/addTask/:id', auth, boards.addTask)
// router.patch('/boards/removeTask/:id', auth, removeTask.addProject)

router.get('*', function(req, res) {
  res.send({
    error: 'This route does not exist, try /users or /boards'
  })
})

module.exports = router
