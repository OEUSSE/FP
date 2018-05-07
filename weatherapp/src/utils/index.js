import imgClear from '../assets/png/pack_b/clear.png'
import imgRain from '../assets/png/pack_b/rain.png'
import imgClouds from '../assets/png/pack_b/clouds.png'
import imgFewClouds from '../assets/png/pack_b/few-clouds.png'
import imgSnow from '../assets/png/pack_b/snow.png'
import imgLightRain from '../assets/png/pack_b/light-rain.png'
import imgThunderstorm from '../assets/png/pack_b/thunderstorm.png'
import imgDrizzle from '../assets/png/pack_b/drizzle.png'
import imgFog from '../assets/png/pack_b/fog.png'

const API_KEY = '25f380e69779eacfe18a294d4679d939'
const url = `https://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=${API_KEY}`

const getCurrentlyForecast = async function (coords) {
  const { latitude, longitude } = coords
  const responseCurrently = await fetch(`https://api.openweathermap.org/data/2.5/weather?&APPID=${API_KEY}&lat=${latitude}&lon=${longitude}&units=metric`)
  const dataCurrently = await responseCurrently.json()
  return dataCurrently
}

const getWeeklyForecast = async function (coords) {
  const { latitude, longitude } = coords
  const responseWeekly = await fetch(`https://api.openweathermap.org/data/2.5/forecast?&APPID=${API_KEY}&lat=${latitude}&lon=${longitude}&units=metric`)
  const dataWeekly = await responseWeekly.json()
  return dataWeekly
}

const getDateParsed = date => {
  const today = new Date(date)
  const [ dayWeek, month, day, year ] = today.toDateString().toString().split(' ')
  const dateParsed = `${dayWeek}, ${day} ${month} ${year}`
  return dateParsed
}

const getUrlIconWeather = weather => {
  weather = weather.toLowerCase()
  if (weather.includes('clear')) {
    return imgClear
  } else if (weather.includes('rain')) {
    return imgRain
  } else if (weather.includes('clouds')) {
    return imgClouds
  } else if (weather.includes('few clouds')) {
    return imgFewClouds
  } else if (weather.includes('snow')) {
    return imgSnow
  } else if (weather.includes('light rain')) {
    return imgLightRain
  } else if (weather.includes('thunderstorm')) {
    return imgThunderstorm
  } else if (weather.includes('drizzle')) {
    return imgDrizzle
  } else if (weather.includes('fog')) {
    return imgFog
  }
}

export {
  getCurrentlyForecast,
  getWeeklyForecast,
  getUrlIconWeather,
  getDateParsed
}