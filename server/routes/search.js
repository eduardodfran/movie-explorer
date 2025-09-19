const express = require('express')
const app = express()

app.get('/search', async (req, res) => {
  const q = req.query.query || '';
  if (!q) return res.status(400).json({ error: 'missing query' });

  try {
    // TODO: call third-party API (TMDB/OMDB) here using server-side API key
    // example placeholder:
    const results = [{ title: `mock result for "${q}"` }];

    res.json({ results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'search failed' });
  }
});

module.exports = app;