const express = require('express')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') })

const app = express()
const port = 3001
const cors = require('cors')
const searchRouter = require('./routes/search')

const TMDB_API_KEY = process.env.TMDB_API_KEY

// Configure CORS to allow requests from the frontend
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
)

app.use(express.json())

// Use the search router
app.use('/search', searchRouter)

// Add a test endpoint
app.get('/test', (req, res) => {
  res.json({ message: 'Server is working!' })
})

app.listen(port, () => {
  console.log(`Movie Explorer server listening on port ${port}`)
  if (TMDB_API_KEY) {
    console.log('✅ TMDB API key loaded successfully')
    console.log(
      '🔑 API Key starts with:',
      TMDB_API_KEY.substring(0, 20) + '...'
    )
  } else {
    console.log('❌ TMDB API key not found')
    console.log(
      '📁 Looking for .env.local in:',
      path.join(__dirname, '..', '.env.local')
    )
  }
})
