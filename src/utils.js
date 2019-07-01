export function getLocalTime(time) {
  return time ? time.slice(12, 16) : '-';
}

export function getFlightStatus(status, time) {
  const FlightStatuses = {
    'ON': 'On time',
    'LN': `Landed ${time}`,
    'CX': 'Canceled',
    'DP': `Departed at ${time}`,
    'CK': 'Check-in',
    'DL': 'Delayed',
    'BD': 'Boarded',
    'FR': '-',
    'CC': '-'

  }
  return FlightStatuses[status];
}

export function getDepData(depFlight) {
  return {
    id: depFlight.ID,
    terminal: depFlight.term,
    gate: depFlight.gateNo,
    time: getLocalTime(depFlight.timeDepShedule),
    destination: depFlight['airportToID.city_en'],
    airline: depFlight.airline.en.name,
    flight: depFlight.codeShareData[0].codeShare,
    status: getFlightStatus(depFlight.status, getLocalTime(depFlight.timeDepFact))
  }


}

export function getArrivalData(arrivalFlight) {
  return {
    id: arrivalFlight.ID,
    terminal: arrivalFlight.term,
    time: getLocalTime(arrivalFlight.timeArrShedule),
    destination: arrivalFlight['airportFromID.city_en'],
    airline: arrivalFlight.airline.en.name,
    flight: arrivalFlight.codeShareData[0].codeShare,
    status: getFlightStatus(arrivalFlight.status, getLocalTime(arrivalFlight.timeLandFact))
  }
}
