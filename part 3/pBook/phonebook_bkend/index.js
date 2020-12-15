/* eslint-disable no-unused-vars */
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

require('dotenv').config()
const Person = require('./models/person')

//middlewares
app.use(cors())
app.use(express.static('build'))
app.use(express.json())

// logger
morgan.token('reqData',(req) => {
  if(req.method==='POST')
    return ''+ JSON.stringify(req.body)
  else
    return ''
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :reqData'))

const requestLogger = (req, res, next) => {
  console.log('---')
  console.log('req method', req.method)
  console.log('req path', req.path)
  console.log('req body', req.body)
  console.log('---')
  next()
}

app.use(requestLogger)

// let persons = [
//     {
//         id: 1,
//         name: "Arto Hellas",
//         number: "040-123456"
//     },
//     {
//         id: 2,
//         name: "Ada Lovelance",
//         number: "39-44-5323523"
//     },
//     {
//         id: 3,
//         name: "Dan Abramov",
//         number: "12-43-234345"
//     },
//     {
//         id: 4,
//         name: "Mary Poppendick",
//         number: "39-23-6423122"
//     }
// ]

app.get('/', (req, res) => {
  res.end('<h1>Home Page</h1>')
})

app.get('/api/persons', (req, res) => {
  Person
    .find({})
    .then(person => {
      res.json(person.map(psn => psn.toJSON()))
    })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person
    .findById(req.params.id)
    .then(person => {
      if(person) {
        res.json(person.toJSON())
      } else {
        res.status(404).end()
      }
    })
    .catch(err => {
      next(err)
    })
})

app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body
  // const pName = persons.find(p => p.name.toLowerCase() === body.name.toLowerCase())

  if(!body.name) {
    return res.status(400).send({ err: 'Name is missing.' })
  }

  if(!body.number) {
    return res.status(400).send({ err: 'Number is missing.' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then(person => person.toJSON())
    .then(savedAndFormattedPerson => {
      res.json(savedAndFormattedPerson)
    })
    .catch(err => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(err => {
      next(err)
    })
})

app.get('/info', (req, res) => {
  const date = new Date()
  Person.find({})
    .then(persons => {
      res.send(`<p>Phonebook has ${persons.length} records</p><p>${date}</p>`)
    })
})

const unknownEndpoints = (req, res) => {
  res.status(404).send({ err: 'unknown endpoints' })
}

app.use(unknownEndpoints)

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }
  // console.error(err)
  console.error(err.message)

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).send({ err: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).send({ err: `${err.message}` })
  }
  next(err)
}

app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})