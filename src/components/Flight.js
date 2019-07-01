import React from 'react';

export default function Flight(props) {
  const { terminal, gate, time, destination, airline, flight, status, selectedFlightType  } = props;
  const className = (terminal === 'A') ? 'terminal-a' : 'terminal-d';
  return (
    <tr className="flight">
      <td className={className}>{terminal}</td>
      {+(selectedFlightType) === 0 ? (<td>{gate}</td>) : null}
      <td>{time}</td>
      <td className="destination">{destination}</td>
      <td>{status}</td>
      <td className="airline">{airline}</td>
      <td>{flight}</td>
    </tr>
  );
}
