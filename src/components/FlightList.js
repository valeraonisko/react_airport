import React from 'react';
import Flight from './Flight';
import './FlightList.css';

export default function FlightList(props) {
  const { flights, getData, tabIndex } = props;
  const flightRows = flights.map((flight, i) => {
    const depData = getData(flight);
    return  (<Flight {...depData} key={i} tabIndex={tabIndex} />);
  });

  return (
    <section className="flight-table">
      <table>
        <thead>
          <tr>
          <th>Terminal</th>
          {tabIndex === '0' ? (<th>Gate</th>) : null}
          <th>Local time</th>
          <th className="destination">Destination</th>
          <th>Status</th>
          <th className="airline">Airline</th>
          <th>Flight</th>
          </tr>
        </thead>
        <tbody>{flightRows}</tbody>
      </table>
    </section>
  );
}
