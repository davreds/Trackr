const Board = require('../models/user')

const getDashboards = function(req, res){
    Board.find({owner: req.user_id}).then(function(boards){
        res.send(boards)
    }).catch(function(error){
        res.status(500).send(error)
    })
}
