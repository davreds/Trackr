const mongoose = require('mongoose')
const validator = require('validator')

var boardSchema = new Schema({
    name: {
        type: String,
        required: true
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
    
})
    // name: {
    //     type: String,
    //     required: true
    // },
    // age: {
    //     type: Number,
    //     require: true,
    //     validate(value){
    //         if(value<13){
    //             throw new Error('Debes ser mayor de 13 años')
    //         }
    //     }
    // },
    // email: {
    //     type: String,
    //     required: true,
    //     validate(value){
    //         if(!validator.isEmail(value)){
    //             throw new Error('Email invalido')
    //         }
    //     }
    // },
    // password: {
    //     type: String,
    //     required: true,
    //     minlength: 8,
    //     trim: true
    // }
})

module.exports = Board
