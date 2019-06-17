import React, { Component } from 'react';
import './TabFlight.css';

export default class TabFlight extends Component {
  constructor(props) {
    super(props);
    this.tabHandler = this.tabHandler.bind(this);
  }
  tabHandler(event) {
    this.props.tabHandler(event.target.tabIndex)
  }
  render() {
    const { tabIndex } = this.props;
    const tabs = ['DEPARTURES', 'ARRIVALS'];
    const tabUl = tabs.map((tab, i) => {
      const className = (i === tabIndex) ? 'active' : 'no-active';
      return (<button className={className} tabIndex={i} key={i} onClick={this.tabHandler}>{tab}</button>);
    });

    return (
      <nav>
        {tabUl}
      </nav>
    );
  }

}
