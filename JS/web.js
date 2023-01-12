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


    let logo0 = document.querySelector('.logo0')
    let logo1 = document.querySelector('.logo1')
    let logo2 = document.querySelector('.logo2')
    let logo3 = document.querySelector('.logo3')
    let logo4 = document.querySelector('.logo4')


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
                    console.log(data)

                    const Clouds = data.data[0].clouds
                    if (Clouds <= 20) {
                        statusLogo.src = '../animated/day.svg'
                    } else if (Clouds <=50) {
                        statusLogo.src = '../animated/cloudy-day-3.svg'
                    } else if (Clouds <=70) {
                        statusLogo.src = '../animated/rainy-3.svg'
                    } else if (Clouds <=90) {
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
                dayName = data.data[1].datetime
                day0.textContent = dayName
                console.log(dayName)

                /*--------------------Icon's Section(0)--------------------*/
                const weather0 = data.data[1].weather.code
                if (weather0 >= 200  && weather0 <= 201) {
                    logo0.src = '../animated/thunderstorm-200.gif'
                } else if (weather0 >= 202 && weather0 <= 233) {
                    logo0.src = '../animated/icons8-granizo.gif'
                } else if (weather0 >= 300 && weather0 <= 302) {
                    logo0.src = '../animated/rainy-1.svg'
                } else if (weather0 >= 500 && weather0 <= 502 ) {
                    logo0.src = '../animated/rainy-6.svg'
                } else if (weather0 >= 511 && weather0 <= 522) {
                    logo0.src = '../animated/icons8-lluvia-torrencial.gif'
                } else if (weather0 >= 600 && weather0 <= 602) {
                    logo0.src = '../animated/icons8-nieve.gif'
                } else if (weather0 >= 610 && weather0 <= 623) {
                    logo0.src = '../animated/icons8-clima-ventoso.gif'
                } else if (weather0 >= 700 && weather0 <= 731) {
                    logo0.src = '../animated/cloudy.svg'
                } else if (weather0 >= 741 && weather0 <= 751) {
                    logo0.src = '../animated/icons8-noche-de-niebla.gif'
                } else if (weather0 == 800) {
                    logo0.src = '../animated/day.svg'
                } else if (weather0 >= 801 && weather0 <= 803) {
                    logo0.src = '../WetherPage/animated/cloudy-day-2.svg'
                } else if (weather0 == 804) {
                    logo0.src = '../animated/icons8-nubes.gif'
                } else if (weather0 == 900) {
                    logo0.src = '../animated/rainy-7.svg'
                }

                /*--------------------Temp max-min--------------------*/
                const MaxTemp0 = data.data[1].max_temp
                tempMax0.textContent = `Temp.Max: ${MaxTemp0}°C`

                const MinTemp0 = data.data[1].min_temp
                tempMin0.textContent = `Temp.Min: ${MinTemp0}°C`


                /*--------------------Description 1--------------------*/
                dayName = data.data[2].datetime
                day1.textContent = dayName
                console.log(dayName)

                /*--------------------Icon's Section(1)--------------------*/
                const weather1 = data.data[2].weather.code
                if (weather1 >= 200  && weather1 <= 201) {
                    logo1.src = '../animated/thunderstorm-200.gif'
                } else if (weather1 >= 202 && weather1 <= 233) {
                    logo1.src = '../animated/icons8-granizo.gif'
                } else if (weather1 >= 300 && weather1 <= 302) {
                    logo1.src = '../animated/rainy-1.svg'
                } else if (weather1 >= 500 && weather1 <= 502 ) {
                    logo1.src = '../animated/rainy-6.svg'
                } else if (weather1 >= 511 && weather1 <= 522) {
                    logo1.src = '../animated/icons8-lluvia-torrencial.gif'
                } else if (weather1 >= 600 && weather1 <= 602) {
                    logo1.src = '../animated/icons8-nieve.gif'
                } else if (weather1 >= 610 && weather1 <= 623) {
                    logo1.src = '../animated/icons8-clima-ventoso.gif'
                } else if (weather1 >= 700 && weather1 <= 731) {
                    logo1.src = '../animated/cloudy.svg'
                } else if (weather1 >= 741 && weather1 <= 751) {
                    logo1.src = '../animated/icons8-noche-de-niebla.gif'
                } else if (weather1 == 800) {
                    logo1.src = '../animated/day.svg'
                } else if (weather1 >= 801 && weather1 <= 803) {
                    logo1.src = '../WetherPage/animated/cloudy-day-2.svg'
                } else if (weather1 == 804) {
                    logo1.src = '../animated/icons8-nubes.gif'
                } else if (weather1 == 900) {
                    logo1.src = '../animated/rainy-7.svg'
                }

                /*--------------------Temp max-min--------------------*/
                const MaxTemp1 = data.data[2].max_temp
                tempMax1.textContent = `Temp.Max: ${MaxTemp1}°C`

                const MinTemp1 = data.data[2].min_temp
                tempMin1.textContent = `Temp.Min: ${MinTemp1}°C`


                /*--------------------Description 2--------------------*/
                dayName = data.data[3].datetime
                console.log(dayName)
                day2.textContent = dayName

                /*--------------------Icon's Section(2)--------------------*/
                const weather2 = data.data[3].weather.code
                if (weather2 >= 200  && weather2 <= 201) {
                    logo2.src = '../animated/thunderstorm-200.gif'
                } else if (weather2 >= 202 && weather2 <= 233) {
                    logo2.src = '../animated/icons8-granizo.gif'
                } else if (weather2 >= 300 && weather2 <= 302) {
                    logo2.src = '../animated/rainy-1.svg'
                } else if (weather2 >= 500 && weather2 <= 502 ) {
                    logo2.src = '../animated/rainy-6.svg'
                } else if (weather2 >= 511 && weather2 <= 522) {
                    logo2.src = '../animated/icons8-lluvia-torrencial.gif'
                } else if (weather2 >= 600 && weather2 <= 602) {
                    logo2.src = '../animated/icons8-nieve.gif'
                } else if (weather2 >= 610 && weather2 <= 623) {
                    logo2.src = '../animated/icons8-clima-ventoso.gif'
                } else if (weather2 >= 700 && weather2 <= 731) {
                    logo2.src = '../animated/cloudy.svg'
                } else if (weather2 >= 741 && weather2 <= 751) {
                    logo2.src = '../animated/icons8-noche-de-niebla.gif'
                } else if (weather2 == 800) {
                    logo2.src = '../animated/day.svg'
                } else if (weather2 >= 801 && weather2 <= 803) {
                    logo2.src = '../WetherPage/animated/cloudy-day-2.svg'
                } else if (weather2 == 804) {
                    logo2.src = '../animated/icons8-nubes.gif'
                } else if (weather2 == 900) {
                    logo2.src = '../animated/rainy-7.svg'
                }

                /*--------------------Temp max-min--------------------*/
                const MaxTemp2 = data.data[3].max_temp
                tempMax2.textContent = `Temp.Max: ${MaxTemp2}°C`

                const MinTemp2 = data.data[3].min_temp
                tempMin2.textContent = `Temp.Min: ${MinTemp2}°C`


                /*--------------------Description 3--------------------*/
                dayName = data.data[4].datetime
                console.log(dayName)
                day3.textContent = dayName

                /*--------------------Icon's Section(3)--------------------*/
                const weather3 = data.data[4].weather.code
                if (weather2 >= 200  && weather3 <= 201) {
                    logo3.src = '../animated/thunderstorm-200.gif'
                } else if (weather3 >= 202 && weather3 <= 233) {
                    logo3.src = '../animated/icons8-granizo.gif'
                } else if (weather3 >= 300 && weather3 <= 302) {
                    logo3.src = '../animated/rainy-1.svg'
                } else if (weather3 >= 500 && weather3 <= 502 ) {
                    logo3.src = '../animated/rainy-6.svg'
                } else if (weather3 >= 511 && weather3 <= 522) {
                    logo3.src = '../animated/icons8-lluvia-torrencial.gif'
                } else if (weather3 >= 600 && weather3 <= 602) {
                    logo3.src = '../animated/icons8-nieve.gif'
                } else if (weather3 >= 610 && weather3 <= 623) {
                    logo3.src = '../animated/icons8-clima-ventoso.gif'
                } else if (weather3 >= 700 && weather3 <= 731) {
                    logo3.src = '../animated/cloudy.svg'
                } else if (weather3 >= 741 && weather3 <= 751) {
                    logo3.src = '../animated/icons8-noche-de-niebla.gif'
                } else if (weather3 == 800) {
                    logo3.src = '../animated/day.svg'
                } else if (weather3 >= 801 && weather3 <= 803) {
                    logo3.src = '../WetherPage/animated/cloudy-day-2.svg'
                } else if (weather3 == 804) {
                    logo3.src = '../animated/icons8-nubes.gif'
                } else if (weather3 == 900) {
                    logo3.src = '../animated/rainy-7.svg'
                }

                /*--------------------Temp max-min--------------------*/
                const MaxTemp3 = data.data[4].max_temp
                tempMax3.textContent = `Temp.Max: ${MaxTemp3}°C`

                const MinTemp3 = data.data[4].min_temp
                tempMin3.textContent = `Temp.Min: ${MinTemp3}°C`


                /*--------------------Description 3--------------------*/
                dayName = data.data[5].datetime
                console.log(dayName)
                day4.textContent = dayName

                /*--------------------Icon's Section(3)--------------------*/
                const weather4 = data.data[5].weather.code
                if (weather4 >= 200  && weather4 <= 201) {
                    logo4.src = '../animated/thunderstorm-200.gif'
                } else if (weather4 >= 202 && weather4 <= 233) {
                    logo4.src = '../animated/icons8-granizo.gif'
                } else if (weather4 >= 300 && weather4 <= 302) {
                    logo4.src = '../animated/rainy-1.svg'
                } else if (weather4 >= 500 && weather4 <= 502 ) {
                    logo3.src = '../animated/rainy-6.svg'
                } else if (weather4 >= 511 && weather4 <= 522) {
                    logo4.src = '../animated/icons8-lluvia-torrencial.gif'
                } else if (weather4 >= 600 && weather4 <= 602) {
                    logo4.src = '../animated/icons8-nieve.gif'
                } else if (weather4 >= 610 && weather4 <= 623) {
                    logo4.src = '../animated/icons8-clima-ventoso.gif'
                } else if (weather4 >= 700 && weather4 <= 731) {
                    logo4.src = '../animated/cloudy.svg'
                } else if (weather4 >= 741 && weather4 <= 751) {
                    logo4.src = '../animated/icons8-noche-de-niebla.gif'
                } else if (weather4 == 800) {
                    logo4.src = '../animated/day.svg'
                } else if (weather4 >= 801 && weather4 <= 803) {
                    logo4.src = '../WetherPage/animated/cloudy-day-2.svg'
                } else if (weather4 == 804) {
                    logo4.src = '../animated/icons8-nubes.gif'
                } else if (weather4 == 900) {
                    logo4.src = '../animated/rainy-7.svg'
                }


                /*--------------------Temp max-min--------------------*/
                const MaxTemp4 = data.data[5].max_temp
                tempMax4.textContent = `Temp.Max: ${MaxTemp4}°C`

                const MinTemp4 = data.data[5].min_temp
                tempMin4.textContent = `Temp.Min: ${MinTemp4}°C`

            })
        })
    }
})

