const remoteURL = "http://localhost:8088"

export const getUserById = (userId) => {
  return fetch(`${remoteURL}/users/${userId}`)
    .then(res => res.json())
}

export const getUserByName = (userName) => {
  return fetch(`${remoteURL}/users?name=${encodeURI(userName)}`)
    .then(res => res.json())
}

export const getAllUsers = () => {
  return fetch(`${remoteURL}/users`)
    .then(res => res.json())
}

export const getUserReservations = (userId) => {
  return fetch(`${remoteURL}/userReservations?userId=${userId}&_expand=campingSpot`)
    .then(res => res.json())
}

export const getAllReservations = () => {
  return fetch(`${remoteURL}/userReservations?_expand=campingSpot&_expand=user`)
    .then(res => res.json())
}

export const createReservation = (reservationObj) => {
  return fetch(`${remoteURL}/userReservations`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(reservationObj)
	}).then(response => response.json())
}

export const getCampingSpotsByType = (spotTypeId) => {
  return fetch(`${remoteURL}/campingSpots?_expand=spotType&spotTypeId=${spotTypeId}`)
    .then(res => res.json())
}

export const getAllCampingSpots = () => {
  return fetch(`${remoteURL}/campingSpots?_expand=spotType`)
    .then(res => res.json())
}

export const getAllSpotTypes = () => {
  return fetch(`${remoteURL}/spotTypes`)
    .then(res => res.json())
}