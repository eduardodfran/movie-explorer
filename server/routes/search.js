const express = require('express')
const path = require('path')
require('dotenv').config({
  path: path.join(__dirname, '..', '..', '.env.local'),
})

const router = express.Router()

const TMDB_API_KEY = process.env.TMDB_API_KEY

router.get('/', async (req, res) => {
  const q = req.query.query || ''
  if (!q) return res.status(400).json({ error: 'missing query' })

  if (!TMDB_API_KEY) {
    return res.status(500).json({ error: 'TMDB API key not configured' })
  }

  try {
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      q
    )}&include_adult=false&language=en-US&page=1`

    console.log('🔍 Searching for:', q)
    console.log(
      '🔑 Using API key starting with:',
      TMDB_API_KEY.substring(0, 20) + '...'
    )

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
    }

    const response = await fetch(url, options)

    if (!response.ok) {
      console.error('❌ TMDB API Error:', response.status, response.statusText)
      const errorText = await response.text()
      console.error('Error details:', errorText)
      throw new Error(`TMDB API error: ${response.status}`)
    }

    const data = await response.json()
    console.log('✅ Found', data.results?.length || 0, 'movies')
    res.json({ data })
  } catch (err) {
    console.error('Search error:', err)
    res.status(500).json({ error: 'search failed' })
  }
})

module.exports = router
