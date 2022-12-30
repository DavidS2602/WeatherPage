
window.addEventListener('load', () => {
    //Header
    let countryTitle = document.querySelector('.Country-title')
    let lon
    let lat

    //Main
    let statusLogo = document.querySelector('.status-logo')
    let descriptionWeather = document.querySelector('.descriptionWeather')
    let temperature = document.querySelector('.temperature')
    let windData = document.querySelector('.wind')
    let PrecipData = document.querySelector('.Precip')
    let UVData = document.querySelector('.UV')

    //Footer(CSS to check)

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lon = position.coords.longitude
            lat = position.coords.latitude
            const api_key = API_KEY
            const url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${api_key}`

            axios
                .get(url)
                .then(Response => {
                    const data = Response.data
                    const cityName = data.data[0].city_name
                    countryTitle.textContent = cityName
                    console.log(data)

                    /*
                    const Clouds = data.data[0].clouds
                    if (Clouds <= 20) {
                        statusLogo.src = '../static/day.svg'
                    } else if (Clouds <=50) {
                        statusLogo.src = '../animated/cloudy-day-3.svg'
                    } else {
                        statusLogo.src = '../animated/cloudy.svg'
                    }
                    */

                    //Description-weather
                    const desc = data.data[0].weather.description
                    console.log(desc)
                    descriptionWeather.textContent = desc

                    const temp = Math.round(data.data[0].temp)
                    temperature.textContent = `${temp}°C`

                    //Data Generals
                    const wind = data.data[0].wind_spd
                    windData.textContent = `Velocidad del viento: ${wind}m/s`

                    const Precip = data.data[0].precip
                    PrecipData.textContent = `Precipitación: ${Precip}mm`

                    const UV = data.data[0].uv
                    if (UV <= 20) {
                        UVData.textContent = 'Índice UV: Bajo'
                    } else if (UV <= 50) {
                        UVData.textContent = 'Índice UV: Moderado'
                    } else if (UV <= 80) {
                        UVData.textContent = 'Índice UV: Alto'
                    }
                })
        })
    }
})