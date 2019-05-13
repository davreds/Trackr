const Board = require('../models/board.js')

const getBoards = function(req, res){
    Board.find({owner: req.user._id}).then(function(boards){
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

const createBoard = function(req, res){
    const _id = req.params.id
    const board = new Board({
        name: req.body.name,
        description: req.body.description,
        owner: req.user._id,
        members: [req.user._id]
    })
    board.save().then(function(){
        return res.send(board)
    }).catch(function(error){
        return res.status(400).send({ error: error })
    })
}

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

    Board.findOneAndUpdate({_id, owner: req.user._id}, req.body).then(function(board){
        if(!board){
            return res.status(404).send({ error: `Board with id ${_id} not found.`})
        }
        return res.send(board)
    }).catch(function(error){
        res.status(500).send({ error: error })
    })
}

const deleteBoard = function(req, res) {
    const _id = req.params.id
    Board.findOneAndDelete({_id, owner: req.user._id}).then(function(board){
        if(!board){
            return res.status(404).send({ error: `Board with id ${_id} not found.`})
        }
        return res.send(board)
      }).catch(function(error) {
        res.status(505).send({ error: error })
    })
}

// const addProject = function(req, res){
//     const _id = req.params.id
//     Board.findOneAndUpdate({_id}, {$push : {project}})
// }

module.exports = {
    getBoards : getBoards,
    getBoard : getBoard,
    createBoard : createBoard,
    updateBoard : updateBoard,
    deleteBoard : deleteBoard
}
