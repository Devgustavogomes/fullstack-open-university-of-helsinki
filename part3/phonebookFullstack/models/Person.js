require('dotenv').config()
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
const url = process.env.MONGO_URL

const personSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
  },
  number:{
    type: String,
    validate:{
      validator: function(v){
        return /^\d{2,3}-\d+$/.test(v) && v.length >= 8
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  }
})

async function mongooseConnect(){
  try {
    console.log('connecting to', url)
    await mongoose.connect(url)
    console.log('connected to MongoDB')
  } catch (error) {
    console.log(`error connecting to MongoDB: ${error.message}`)
  }
}

mongooseConnect()

personSchema.set('toJSON',{
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema, 'people')
