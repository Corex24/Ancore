const axios = require('axios')
const moment = require('moment-timezone')

module.exports = {
  name: 'weather',
  command: ['weather'],
  tags: ['tools'],
  run: async (m, sock, args) => {
    const location = args.join(' ')
    if (!location) return sock.sendMessage(m.key.remoteJid, { text: '📍 Please enter a location.\nExample: `.weather Lagos`' }, { quoted: m })

    try {
      const apiKey = process.env.WEATHER_API_KEY
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`
      const res = await axios.get(url)
      const data = res.data

      const timezone = 'Africa/Lagos'
      const now = moment().tz(timezone).format('dddd, MMMM Do YYYY - h:mm A')

      const msg = `
🌤️ *Weather in ${data.name}*

📅 Date: ${now}
🌡 Temp: ${data.main.temp}°C
🤒 Feels Like: ${data.main.feels_like}°C
💧 Humidity: ${data.main.humidity}%
💨 Wind: ${data.wind.speed} m/s
🌥 Sky: ${data.weather[0].description}

📍 Lat: ${data.coord.lat}
📍 Lon: ${data.coord.lon}
`.trim()

      await sock.sendMessage(m.key.remoteJid, { text: msg }, { quoted: m })

    } catch (err) {
      await sock.sendMessage(m.key.remoteJid, { text: `❌ Could not find weather for *${location}*.` }, { quoted: m })
    }
  }
  }
