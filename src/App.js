import React, { Component } from 'react';
import './App.css';
import TabFlight from './components/TabFlight';
import FlightList from './components/FlightList';
import {getLocalTime, getFlightStatus} from './utils';

const serverUrl = 'https://api.iev.aero/api/flights/';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      flights: null,
      error: 0

    }
    this.tabHandler = this.tabHandler.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    const flightData = dd + '-' + mm + '-' + yyyy;
    this.setState(state => ({
      flights: null,
      error: 0
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
          error: request.status
        })
      );
      return;
    }
    const parseFlights = JSON.parse(request.responseText);
    this.setState(state => ({
      flights: parseFlights.body
    }));
  }


  getDepData(depFlight) {
    return {
      terminal: depFlight.term,
      gate: depFlight.gateNo,
      time: getLocalTime(depFlight.timeDepShedule),
      destination: depFlight['airportToID.city_en'],
      airline: depFlight.airline.en.name,
      flight: depFlight.codeShareData[0].codeShare,
      status: getFlightStatus(depFlight.status, getLocalTime(depFlight.timeDepFact))
    }


  }

  getArrivalData(arrivalFlight) {
    return {
      terminal: arrivalFlight.term,
      time: getLocalTime(arrivalFlight.timeArrShedule),
      destination: arrivalFlight['airportFromID.city_en'],
      airline: arrivalFlight.airline.en.name,
      flight: arrivalFlight.codeShareData[0].codeShare,
      status: getFlightStatus(arrivalFlight.status, getLocalTime(arrivalFlight.timeLandFact))
    }
  }

  tabHandler(tabId) {
    this.setState(state => ({
      tabIndex: tabId
    }))
  }

  render() {
    const { tabIndex, flights, error } = this.state;
    const loading = (error === 0) ? 'Loading...' : `Request error:${error}`;
    let flightTable;
    if (flights === null) {
      flightTable = (<p>{loading}</p>);
    } else {
      if (tabIndex === 0) {
        flightTable = (<FlightList flights={flights.departure} getData={this.getDepData} tabIndex='0' />);
      } else {
        flightTable = (<FlightList flights={flights.arrival} getData={this.getArrivalData} tabIndex='1' />);
      }
    }
    return (
      <div className="App">
        <TabFlight tabIndex={tabIndex} tabHandler={this.tabHandler} />
        {flightTable}
      </div>
    );
  }

}

export default App;
