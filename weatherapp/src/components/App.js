/**
 * @todo Maquetar el diseño de la app (👍)
 * @todo Obtener información del clima de la ciudad en la cual se está. (Datos por coordenadas (👍)
 * @todo Obtener información del clima de cualquier ciudad. (Buscador de ciudad)
 * @todo Obtener información del clima semanal.
 */

import React, { Component } from 'react'
import './App.css'

import CurrentlyForecast from './CurrentlyForecast'
import WeeklyForecast from './WeeklyForecast'

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

    const responseCurrently = await fetch(`https://api.openweathermap.org/data/2.5/weather?&APPID=${API_KEY}&lat=${latitude}&lon=${longitude}&units=metric`)
    const dataCurrently = await responseCurrently.json()

    const responseWeekly = await fetch(`https://api.openweathermap.org/data/2.5/forecast?&APPID=${API_KEY}&lat=${latitude}&lon=${longitude}&units=metric`)
    const dataWeekly = await responseWeekly.json()

    const today = new Date()
    const [ dayWeek, month, day, year ] = today.toDateString().toString().split(' ')
    const dateCurrently = `${dayWeek}, ${day} ${month} ${year}`

    let filteredDays = [ day ]
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
