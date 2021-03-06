import React, { Component } from 'react'

import { getUrlIconWeather } from '../utils'

class CurrentlyForecast extends Component {
  render() {
    const data = this.props.data
    return (
      <div className="current-forecast">
        <div className="forecast-details">
          <header>
            <p className="date">{data.date}</p>
            <p className="city">{data.city}</p>
          </header>
          <section className="forecast">
            <div className="ico-weather">
              <img src={getUrlIconWeather(data.icon)} alt={data.icon} />
            </div>
            <p className="forecast-detail">{data.description}</p>
            <p className="forecast-grade">{data.temp}</p>
          </section>
        </div>
      </div>
    )
  }
}
export default CurrentlyForecast