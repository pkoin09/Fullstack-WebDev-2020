const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI

console.log('connecting to MongoDB')

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})
  // eslint-disable-next-line no-unused-vars
  .then(result => {console.log('connected to MongoDB')})
  .catch((err) => {console.log('error connecting to MongoDB:', err.message)})

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, 'name must be at least 3 char long'],
    unique: true,
    require: [true, 'name cannot be blank']
  },
  number: {
    type: String,
    minlength: [8, 'number must be at least 8 char long'],
    require: [true, 'number cannot be blank']
  }
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)