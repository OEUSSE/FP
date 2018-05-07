import React, { Component } from 'react'

import { getUrlIconWeather, getDateParsed } from '../utils'

class WeeklyForecast extends Component {
  createWeeklyForecast() {
    const data = this.props.data

    return data.map(item => {
      const date = getDateParsed(item.dt_txt)
      const iconWeather = (item.weather[0].main).toLowerCase()

      return (
        <li key={item.dt}>
          <div className="daily-forecast">
            <div className="icon-weather-continaer">
              <img src={getUrlIconWeather(iconWeather)} alt={iconWeather}/>
            </div>
            <p className="grade">{Math.floor(item.main.temp)}</p>
            <p className="date">{date}</p>
          </div>
        </li>
      )
    })
  }

  render() {
    return (
      <div className="weekly-forecast">
        <ul className="weekly-forecast-list">
          { this.createWeeklyForecast() }
        </ul>
      </div>
    )
  }
}

export default WeeklyForecast