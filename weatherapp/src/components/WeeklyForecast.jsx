import React, { Component } from 'react'
import './styles/weeklyForecast.css'

import getUrlIconWeather from '../utils'

class WeeklyForecast extends Component {
  createWeeklyForecast() {
    const data = this.props.data

    const list = data.map(item => {
      const today = new Date(item.dt_txt.split(' ')[0])
      const [dayWeek, month, day, year] = today.toDateString().toString().split(' ')
      const date = `${dayWeek}, ${day} ${month} ${year}`

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
    return list
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