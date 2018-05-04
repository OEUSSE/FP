import React, { Component } from 'react'
import './styles/currentForecast.css'

class CurrentlyForecast extends Component {
  render() {
    return (
      <div className="current-forecast">
        <div className="forecast-details">
          <header>
            <p className="date">sat, 2 july 2018</p>
            <p className="city">Mumbai</p>
          </header>
          <section className="forecast">
            <div className="ico-weather"></div>
            <p className="forecast-detail">mostly sunny</p>
            <p className="forecast-grade">26</p>
          </section>
        </div>
      </div>
    )
  }
}

export default CurrentlyForecast