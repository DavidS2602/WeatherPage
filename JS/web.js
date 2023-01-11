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

    let day0 = document.querySelector('.day0')
    let day1 = document.querySelector('.day1')
    let day2 = document.querySelector('.day2')
    let day3 = document.querySelector('.day3')
    let day4 = document.querySelector('.day4')
    let logo = document.querySelector('.logo')
    let tempMax0 = document.querySelector('.temp-max0')
    let tempMin0 = document.querySelector('.temp-min0')

    let tempMax1 = document.querySelector('.temp-max1')
    let tempMin1 = document.querySelector('.temp-min1')

    let tempMax2 = document.querySelector('.temp-max2')
    let tempMin2 = document.querySelector('.temp-min2')

    let tempMax3 = document.querySelector('.temp-max3')
    let tempMin3 = document.querySelector('.temp-min3')

    let tempMax4 = document.querySelector('.temp-max4')
    let tempMin4 = document.querySelector('.temp-min4')


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

            let dayName= ''//Store the days for each iteration
            const daysOfWeek = [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
            ]

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
                const data = Response.data
                data.data.forEach(dayData => {
                    const datetime = dayData.datetime;
                    const dayDate = new Date(datetime);
                    const dayOfWeek = dayDate.getUTCDay();
                    dayName = daysOfWeek[dayOfWeek];
                });
                console.log(Response.data)
                /*--------------------Description 0--------------------*/
                dayName = data.data[0].datetime
                day0.textContent = dayName
                console.log(dayName)

                /*--------------------Temp max-min--------------------*/
                const MaxTemp0 = data.data[0].max_temp
                tempMax0.textContent = `Temp.Max: ${MaxTemp0}°C`

                const MinTemp0 = data.data[0].min_temp
                tempMin0.textContent = `Temp.Min: ${MinTemp0}°C`

                /*--------------------Description 1--------------------*/
                dayName = data.data[1].datetime
                day1.textContent = dayName
                console.log(dayName)

                /*--------------------Temp max-min--------------------*/
                const MaxTemp1 = data.data[1].max_temp
                tempMax1.textContent = `Temp.Max: ${MaxTemp1}°C`

                const MinTemp1 = data.data[1].min_temp
                tempMin1.textContent = `Temp.Min: ${MinTemp1}°C`

                /*--------------------Description 2--------------------*/
                dayName = data.data[2].datetime
                console.log(dayName)
                day2.textContent = dayName

                /*--------------------Temp max-min--------------------*/
                const MaxTemp2 = data.data[2].max_temp
                tempMax2.textContent = `Temp.Max: ${MaxTemp2}°C`

                const MinTemp2 = data.data[2].min_temp
                tempMin2.textContent = `Temp.Min: ${MinTemp2}°C`

                /*--------------------Description 3--------------------*/
                dayName = data.data[3].datetime
                console.log(dayName)
                day3.textContent = dayName

                /*--------------------Temp max-min--------------------*/
                const MaxTemp3 = data.data[3].max_temp
                tempMax3.textContent = `Temp.Max: ${MaxTemp3}°C`

                const MinTemp3 = data.data[3].min_temp
                tempMin3.textContent = `Temp.Min: ${MinTemp3}°C`

                /*--------------------Description 3--------------------*/
                dayName = data.data[4].datetime
                console.log(dayName)
                day4.textContent = dayName

                /*--------------------Temp max-min--------------------*/
                const MaxTemp4 = data.data[4].max_temp
                tempMax4.textContent = `Temp.Max: ${MaxTemp4}°C`

                const MinTemp4 = data.data[4].min_temp
                tempMin4.textContent = `Temp.Min: ${MinTemp4}°C`
            })
        })
    }
})

