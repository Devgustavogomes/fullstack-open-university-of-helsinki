const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/Person')

const app = express()

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

morgan.token('body', function (req) { return JSON.stringify(req.body) })

app.use(morgan(':method :url :status - :response-time ms :body'))




app.get('/api/people', async (request, response, next) => {
  try {
    const result = await Person.find({})
    response.json(result)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

app.get('/info', async (request, response, next) => {
  try {
    const length = await Person.countDocuments({})
    const date = new Date()
    response.send(`<h1>Phonebook has info for ${length} people</h1>
        <h2>${date}</h2>`)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

app.get('/api/people/:id', async (request, response, next) => {
  try {
    const person = await Person.findById(request.params.id)
    if (!person) {
      response.status(404).send({ error: 'Not found' })
    }
    response.json(person)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

app.delete('/api/people/:id', async (request, response, next) => {
  try {
    await Person.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    console.log('Nome:', error.name)
    next(error)
  }
})

app.post('/api/people', async (request, response, next) => {
  try {
    const body = await request.body

    if (!body.name) {
      return response.status(400).json({
        error: 'name missing'
      })
    }

    const repeatPerson = await Person.find({ name: body.name })

    if(repeatPerson.length > 0){
      return response.status(400).json({
        error: 'name must be unique'
      })
    }

    const person = new Person({
      name: body.name,
      number: body.number,
    })

    await person.save()

    response.json(person)

  } catch (error) {
    console.log(error)
    next(error)
  }
})

app.put('/api/people/:id', async (request,response,next) => {
  try {
    const body = request.body
    if (!body.number) {
      return response.status(400).json({
        error: 'number missing'
      })
    }

    const person ={
      name: body.name,
      number: body.number,
    }

    const changedPerson=await Person.findByIdAndUpdate(request.params.id, person , { new: true, runValidators: true, context: 'query' })
    response.json(changedPerson)

  } catch (error) {
    next(error)
  }
})

const unknownEndpoint = (request,response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const handleError =(error,request,response,next) => {

  if(error.name === 'CastError'){
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(handleError)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

