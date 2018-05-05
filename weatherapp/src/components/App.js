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
      weeklyForecast: [

      ]
    }
  }

  async getForecastFromCoords() {
    const API_KEY = '25f380e69779eacfe18a294d4679d939'
    const { latitude, longitude } = await this.getCoords()

    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=${API_KEY}&lat=${latitude}&lon=${longitude}&units=metric`)
    const data = await response.json()

    console.log(data)

    const today = new Date()
    const [ dayWeek, month, day, year ] = today.toDateString().toString().split(' ')
    const date = `${dayWeek}, ${day} ${month} ${year}`

    this.setState({
      currentlyForecast: {
        date,
        city: data.city.name + ', ' + data.city.country,
        icon: data.list[0].weather[0].main,
        description: data.list[0].weather[0].description,
        temp: Math.floor(data.list[0].main.temp)
      }
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
        <WeeklyForecast />
      </div>
    );
  }
}

export default App
