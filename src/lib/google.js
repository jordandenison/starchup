const http = require('./http')

const key = process.env.GOOGLE_DIRECTIONS_API_KEY
const url = 'https://maps.googleapis.com/maps/api/distancematrix/json'

const parseResponse = response => {
  // TODO: implement to return { [waypoint]: <distance_from_origin_including_previous_steps> }
}

const getTimeTaken = async (origins, destinations) => {
  const query = { origins, destinations, key }

  const response = await http.get(url, query)

  if (response.status !== 'OK') { throw new Error(response.error_field) }

  if ((!Array.isArray(origins) || origins.length === 1) && (!Array.isArray(destinations) || destinations.length === 1)) {
    const destination = Array.isArray(destinations) ? destinations[0] : destinations
    return { [destination]: response.rows[0].elements[0].duration.value }
  }

  return parseResponse(response)
}

module.exports = {
  getTimeTaken
}
