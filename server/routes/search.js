const express = require('express')
const app = express()
const dotenv = require('dotenv/config')

const TMDB_API_KEY = process.env.TMDB_API_KEY

app.get('/search', async (req, res) => {
  const q = req.query.query || ''
  if (!q) return res.status(400).json({ error: 'missing query' })

  try {
    const url = `https://api.themoviedb.org/3/search/movie?query=${q}&include_adult=false&language=en-US&page=1`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
    }

    const response = await fetch(url)
    const data = await response.json()

    res.json({ data })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'search failed' })
  }
})

module.exports = app
