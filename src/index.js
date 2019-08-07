const express = require('express')

const { canDriveBetween } = require('./lib/directions')

const app = express()
const port = process.env.PORT || 3000

app.post('/can-drive-between', async (req, res, next) => {
  const { time, origin, destination, waypoints } = req.body

  try {
    const response = await canDriveBetween(time, origin, destination, waypoints)

    res.json(response)
  } catch (err) {
    next(err)
  }
})

app.listen(port, () => console.log(`app listening on port ${port}!`))

module.exports = app
