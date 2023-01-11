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
    let HumidityData = document.querySelector('.Humidity')
    let UVData = document.querySelector('.UV')

    //Footer

    let futureTemperatureSection = document.querySelector('#Future-temperature-section')
    let tempSection = document.querySelector('.temperature-section')
    let logo = document.querySelector('.logo')
    let tempDay = document.querySelector('.temperature-day')

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lon = position.coords.longitude
            lat = position.coords.latitude
            const api_key = API_KEY
            const baseURL = 'https://api.weatherbit.io/v2.0/'
            const days = 7

            const axiosInstance1 = axios.create({
                baseURL: baseURL
            })
            axiosInstance1.get('/current', {
                params: {
                    lat: lat,
                    lon: lon,
                    key: api_key
                }
            }).then(Response => {
                const data = Response.data
                    const cityName = data.data[0].city_name
                    countryTitle.textContent = cityName
                    console.log(data)

                    const Clouds = data.data[0].clouds
                    const humidity = data.data[0].rh
                    if (Clouds <= 20 && humidity <= 20) {
                        statusLogo.src = '../animated/day.svg'
                    } else if (Clouds <=50 && humidity <= 50) {
                        statusLogo.src = '../animated/cloudy-day-3.svg'
                    } else if (Clouds <=70 && humidity <= 70) {
                        statusLogo.src = '../animated/rainy-3.svg'
                    } else if (Clouds <=90 && humidity <=90) {
                        statusLogo.src = '../animated/rainy-4.svg'
                    } else {
                        statusLogo.src = '../animated/rainy-7.svg'
                    }


                    //Description-weather
                    const desc = data.data[0].weather.description
                    descriptionWeather.textContent = desc

                    const temp = Math.round(data.data[0].temp)
                    temperature.textContent = `${temp}°C`

                    //Generals-data
                    const wind = data.data[0].wind_spd
                    windData.textContent = `Velocidad del viento: ${wind}m/s`

                    const Humidity = Math.round(data.data[0].rh)
                    HumidityData.textContent = `Humedad: ${Humidity}%`

                    const UV = data.data[0].uv
                    if (UV <= 20) {
                        UVData.textContent = 'Índice UV: Bajo'
                    } else if (UV <= 50) {
                        UVData.textContent = 'Índice UV: Moderado'
                    } else if (UV <= 80) {
                        UVData.textContent = 'Índice UV: Alto'
                    }
            })
            const axiosInstance2 = axios.create({
                baseURL: baseURL
            })
            axiosInstance2.get(`/forecast/daily`, {
                params: {
                    lat: lat,
                    lon: lon,
                    days: days,
                    key: api_key,
                }
            }).then(Response => {
                console.log(Response.data)
            })
        })
    }
})