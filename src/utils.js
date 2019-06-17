export function getLocalTime(time) {
  return (time) ? time.slice(12, 16) : '-';
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
