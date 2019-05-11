const mongoose = require('mongoose')
const validator = require('validator')

var taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    responsibles: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
    complete: {
        type: Boolean,
        required: true
    }
});

var projectSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    team: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
    tasks: {
        type: [taskSchema]
    }
});

var boardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    members: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
    projects: {
        type: [projectSchema]
    }
});

const Board = mongoose.model('Board', boardSchema)

module.exports = Board;
