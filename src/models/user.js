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

userSchema.pre('save', function(next) {
    const user = this
    console.log('Saving user');
    next();
});

const User = mongoose.model('')
