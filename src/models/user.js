const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const uniqueValidator = require('mongoose-unique-validator')

if ( process.env.NODE_ENV === 'production') {
    var secret = process.env.secret
} else {
    const config = require('../config')
    var secret = config.secret
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isAlphanumeric(value)){
                throw new Error('Invalid username.')
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid email');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    dashboards: [{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
},{
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

// userSchema.virtual('dashboards', {
//   ref: 'Board',
//   localField: '_id',
//   foreignField: 'owner'
// });

userSchema.plugin(uniqueValidator, {message: 'Username or email already taken'})

userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.statics.findByCredentials = function(username, password) {
    return new Promise(function(resolve, reject){
        User.findOne({username}).then(function(user){
            if(!user){
                return reject('User does not exist')
            }
            bcrypt.compare(password, user.password).then(function(match){
                if(match){
                    return resolve(user)
                } else{
                    return reject('Wrong password!')
                }
            }).catch(function(error){
                return reject('Wrong password!')
            })
        })
    })
}

userSchema.statics.findByEmail = function(email, update) {
    return new Promise(function(resolve, reject){
        User.findOneAndUpdate({email}, update).then(function(user){
            if(!user){
                return reject('No user matches this email')
            }
            return resolve(user)
        }).catch(function(error){
            return reject('No changes were possible')
        })
    })
}


userSchema.methods.generateToken = function() {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, secret, { expiresIn: '7 days'})
    user.tokens = user.tokens.concat({ token })
    return new Promise(function( resolve, reject) {
        user.save().then(function(user){
            return resolve(token)
        }).catch(function(error) {
            return reject(error)
        })
    })
}

userSchema.pre('save', function(next) {
    const user = this
    if( user.isModified('password') ) {
        bcrypt.hash(user.password, 8).then(function(hash){
            user.password = hash
            next()
        }).catch(function(error){
            return next(error)
        })
    } else {
        next()
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User
