const express = require('express')
const app = express()
const port = 3001
const cors = require('cors')
const searchRouter = require('./routes/search')
const dotenv = require('dotenv/config')

const TMDB_API_KEY = process.env.TMDB_API_KEY

app.use(cors())
app.use(express.json())

app.use('/search', searchRouter)

app.listen(port, () => {
  console.log(`Movie Explorer listening on port ${port}`)
})
