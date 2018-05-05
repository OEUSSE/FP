const API_KEY = '25f380e69779eacfe18a294d4679d939'
const url = `https://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=${API_KEY}`

const getUrlIconWeather = weather => {
  return '../assets/png/pack_b/sun.png'
}

export default getUrlIconWeather