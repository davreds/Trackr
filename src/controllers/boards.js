const Board = require('../models/user')

const getBoards = function(req, res){
    Board.find({owner: req.user_id}).then(function(boards){
        res.send(boards)
    }).catch(function(error){
        res.status(500).send(error)
    })
}

const getBoard = function(req, res){
    const _id = req.params.id
    Board.findOne({_id, owner: req.user._id}).then(function(board){
        if(!board){
            return res.status(404).send({error: `Board with id ${_id} not found.`})
        }
        return res.send(board)
    }).catch(function(error){
        return res.status(500).send({ error: error })
    })
}

/* Implementar GETs
const getProjects = function(req, res){

}

const getProject = function(req, res){

}

const getTasks = function(req, res){

}

const getTask = function(req, res){

}
*/

const createBoard = function(req, res){
    const _id = req.params.id
    const board = new Board({
        name: req.body.name,
        description: req.body.description,
        owner: req.user._id
    })
    board.save().then(function(){
        return res.send(board)
    }).catch(function(error){
        return res.status(400).send({ error: error })
    })
}

/* Implementar POSTs
const createProject = function(req, res){

}

const createTask = function(req, res){

}
*/
const updateBoard = function(req, res){
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'description']
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidUpdate){
        return res.status(400).send({
            error: 'Invalid update, only allowed to update: ' + allowedUpdates
        })
    }

/* Implementar POSTs
const createProject = function(req, res){

}

const createTask = function(req, res){

}
*/

    Board.findOneAndUpdate({_id, owner: req.user._id}, req.body).then(function(board){
        if(!board){
            return res.status(404).send({ error: `Board with id ${_id} not found.`})
        }
        return res.send(board)
    }).catch(function(error){
        res.status(500).send({ error: error })
    })
}

/* Implementar UPDATEs
const updateProject = function(req, res){

}

const updateTask = function(req, res){

}
*/

const deleteBoard = function(req, res) {
    const _id = req.params.id
    Board.findOneAndDelete({_id, owner: req.user._id}).then(function(board){
        if(!board){
            return res.status(404).send({ error: `Board with id ${_id} not found.`})
        }
        return res.send(todo)
      }).catch(function(error) {
        res.status(505).send({ error: error })
    })
}

/* Implementar POSTs
const deleteProject = function(req, res){

}

const deleteTask = function(req, res){

}
*/

module.exports = {
    getBoards : getBoards,
    getBoard : getBoard,
    createBoard : createBoard,
    updateBoard : updateBoard,
    deleteBoard : deleteBoard
}
