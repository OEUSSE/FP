/**
 * @todo Maquetar el diseño de la app (👍)
 * @todo Obtener información del clima de la ciudad en la cual se está. (Datos por coordenadas (👍)
 * @todo Obtener información del clima de cualquier ciudad. (Buscador de ciudad)
 * @todo Obtener información del clima semanal. (👍)
 */

import React, { Component } from 'react'
import './App.css'

import CurrentlyForecast from './CurrentlyForecast'
import WeeklyForecast from './WeeklyForecast'

import {
  getCurrentlyForecast,
  getWeeklyForecast,
  getDateParsed
} from '../utils'

//import { cities } from '../data'

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentlyForecast: {
        date: '',
        city: '',
        icon: '',
        description: '',
        temp: ''
      },
      weeklyForecast: []
    }
  }

  async getForecastFromCoords() {
    const API_KEY = '25f380e69779eacfe18a294d4679d939'
    const { latitude, longitude } = await this.getCoords()

    const dataCurrently = await getCurrentlyForecast({ latitude, longitude })
    const dataWeekly = await getWeeklyForecast({ latitude, longitude })

    const dateCurrently = getDateParsed()
    let today = new Date()
    today = `0${today.getDate()}`

    let filteredDays = [ today ]
    const filteredDataWeekly = dataWeekly.list.filter(dayForecast => {
      const day = dayForecast.dt_txt.split(' ')[0].split('-')[2]
      if (!filteredDays.includes(day)) {
        filteredDays.push(day)
        return dayForecast
      }
    })

    this.setState({
      currentlyForecast: {
        dateCurrently,
        city: `${dataCurrently.name}, ${dataCurrently.sys.country}`,
        icon: (dataCurrently.weather[0].main).toLowerCase(),
        description: dataCurrently.weather[0].description,
        temp: Math.floor(dataCurrently.main.temp)
      },
      weeklyForecast: filteredDataWeekly
    })
  }

  getCoords() {
    return new Promise(resolve => {
      navigator.geolocation.getCurrentPosition(position => {
        resolve(position.coords)
      })
    })
  }

  componentWillMount() {
    this.getForecastFromCoords()
  }

  render() {
    return (
      <div className="weather-app">
        <CurrentlyForecast data={this.state.currentlyForecast} />
        <WeeklyForecast data={this.state.weeklyForecast} />
      </div>
    );
  }
}

export default App
