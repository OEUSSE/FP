import React, { Component } from 'react'
import './styles/weeklyForecast.css'

import imgExample from '../assets/png/pack_b/if_13_cloud_weather_67112.png'

class WeeklyForecast extends Component {
  render() {
    return (
      <div className="weekly-forecast">
        <ul className="weekly-forecast-list">
          <li>
            <div className="daily-forecast">
              <div className="icon-weather-continaer">
                <img src={imgExample} alt="icon weather" />
              </div>
              <p className="grade">22</p>
              <p className="date">sat, 2 july</p>
            </div>
          </li>
          <li>
            <div className="daily-forecast">
              <div className="icon-weather-continaer">
                <img src={imgExample} alt="icon weather" />
              </div>
              <p className="grade">22</p>
              <p className="date">sat, 2 july</p>
            </div>
          </li>
          <li>
            <div className="daily-forecast">
              <div className="icon-weather-continaer">
                <img src={imgExample} alt="icon weather" />
              </div>
              <p className="grade">22</p>
              <p className="date">sat, 2 july</p>
            </div>
          </li>
          <li>
            <div className="daily-forecast">
              <div className="icon-weather-continaer">
                <img src={imgExample} alt="icon weather" />
              </div>
              <p className="grade">22</p>
              <p className="date">sat, 2 july</p>
            </div>
          </li>
          <li>
            <div className="daily-forecast">
              <div className="icon-weather-continaer">
                <img src={imgExample} alt="icon weather" />
              </div>
              <p className="grade">22</p>
              <p className="date">sat, 2 july</p>
            </div>
          </li>
        </ul>
      </div>
    )
  }
}

export default WeeklyForecast