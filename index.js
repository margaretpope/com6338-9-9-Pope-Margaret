const weatherSec = document.getElementById('weather')
const form = document.querySelector('form')

form.onsubmit = async function(e) {
    e.preventDefault()
    const userQuery = form.search.value.trim()
    weatherSec.innerHTML = ''
    this.search.value = ''
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=4bce37d7d095cd3a1b9c4e53168315ad&q=${userQuery}`)
        if (res.status === 404) throw new Error('Location not found')
        const weatherData = await res.json()
        console.log(weatherData)
        renderWeather(weatherData)
    } catch (err) {
        weatherSec.innerHTML = err.message
    }
}

const renderWeather = ({
    name,
    dt,
    sys: {
        country
    },
    coord: {
        lat,
        lon
    },
    weather: {
        0: {
            icon,
            description
        }
    },
    main: {
        temp,
        feels_like
    }
}) => {
    const date = new Date(dt * 1000)
    const timeString = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    })
    weatherSec.innerHTML = `<h2>${name}, ${country}</h2>
    <a href = "https://www.google.com/maps/search/?api=1&query=${lat},${lon}">Click to view map</a>
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="conditions icon">
    <p>${description}</p>
    <p>Current: ${temp}\xB0 F</p>
    <p>Feels like: ${feels_like}\xB0 F</p>
    <p>Last updated: ${timeString}</p>`
}
