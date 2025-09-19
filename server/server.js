const express = require('express')
const app = express()
const port = 3001
const cors = require('cors')
const searchRouter = require('./routes/search')

app.use('/search', searchRouter)

app.use(cors())
app.use(express.json())



app.listen(port, () => {
  console.log(`Movie Explorer listening on port ${port}`)
})