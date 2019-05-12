const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email invalido');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true
    },
    boards: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Board'
    }
},{
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

userSchema.virtual('todos', {
  ref: 'Todo',
  localField: '_id',
  foreignField: 'createdBy'
});

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
            bcrypt.compare(password, use.password).then(function(match){
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
