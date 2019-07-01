import React, { Component } from 'react';
import './App.css';
import TabFlight from './components/TabFlight';
import FlightList from './components/FlightList';
import {getDepData, getArrivalData} from './utils';

const serverUrl = 'https://api.iev.aero/api/flights/';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFlightType: 0,
      departureFlights: null,
      arrivalFlights: null,
      error: null

    }
    this.tabHandler = this.tabHandler.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const flightData = dd + '-' + mm + '-' + yyyy;
    this.setState(state => ({
      flights: null,
      error: null
    }))
    this.sendRequest(`${serverUrl}${flightData}`, this.requestFlightsHandler);
  }

  sendRequest(url, handler) {
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('load', handler(request));
    request.send();
  }

  requestFlightsHandler = request => () => {
    if (request.status !== 200) {
      this.setState(state => ({
          error: `Request error: ${request.status}`
        })
      );
      return;
    }
    const parsedFlights = JSON.parse(request.responseText);
    this.setState(state => ({
      departureFlights: parsedFlights.body.departure.map(flight => getDepData(flight)),
      arrivalFlights: parsedFlights.body.arrival.map(flight => getArrivalData(flight))
    }));
  }

  tabHandler(flightType) {
    this.setState(state => ({
      selectedFlightType: flightType
    }))
  }

  render() {
    const { selectedFlightType, departureFlights, arrivalFlights, error } = this.state;
    const dataReady = departureFlights && arrivalFlights;
    const flightInfo = dataReady ? '' : (<p>{!error ? 'Loading...' : {error}}</p>);
    const flightProps = dataReady ? (+(selectedFlightType) === 0) ?
      {flights: departureFlights, flightType: 0 } :
      {flights: arrivalFlights, flightType: 1} : null;
    const flightPanel = flightProps ? (<FlightList {...flightProps} />) : '';

    return (
      <div className="App">
        <TabFlight selectedFlightType={selectedFlightType} tabHandler={this.tabHandler} />
        {flightInfo}
        {flightPanel}
      </div>
    );
  }
}

export default App;
