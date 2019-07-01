import React, { Component } from 'react';
import './TabFlight.css';

export default class TabFlight extends Component {
  constructor(props) {
    super(props);
    this.tabHandler = this.tabHandler.bind(this);
  }
  tabHandler(event) {
    this.props.tabHandler(event.target.dataset.id)
  }
  render() {
    const { selectedFlightType } = this.props;
    const tabs = ['DEPARTURES', 'ARRIVALS'];
    const tabList = tabs.map((tab, i) => {
      const className = (i === +(selectedFlightType)) ? 'active' : 'no-active';
      return (<button className={className} data-id={i} key={tab} onClick={this.tabHandler}>{tab}</button>);
    });

    return (
      <nav>
        {tabList}
      </nav>
    );
  }

}
