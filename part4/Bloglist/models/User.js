
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: [3, 'min length is 3'],
    required: true,
    unique: true
  },
  name: String,
  passwordHash: {
    type: String,
    required: true
  },
  notes:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }]
})

userSchema.set('toJSON', {
  transform: (request, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)