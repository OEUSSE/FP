/**
 * @todo Maquetar el disño de la app
 * @todo Obtener información del clima de la ciudad en la cual se está. (Datos por coordenadas)
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
    this.state = {}
  }

  render() {
    return (
      <div className="weather-app">
        <CurrentlyForecast />
        <WeeklyForecast />
      </div>
    );
  }
}

export default App
