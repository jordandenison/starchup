const { getTimeTaken } = require('./google')

const canDriveBetween = async (time, origin, destination, waypoints = []) => {
  const noWaypointsTimeTaken = await getTimeTaken(origin, destination)

  if (noWaypointsTimeTaken > time) {
    return { noWaypoints: false }
  } else if (noWaypointsTimeTaken < time && !waypoints.length) {
    return { noWaypoints: true }
  } else {
    const waypointTimesTaken = await getTimeTaken([origin].concat(waypoints), waypoints.concat([destination]))

    return Object.keys(waypointTimesTaken).reduce((result, waypoint) => {
      return Object.assign(result, { waypoint: waypointTimesTaken[waypoint] < time })
    }, { noWaypoints: true })
  }
}

module.exports = {
  canDriveBetween
}
