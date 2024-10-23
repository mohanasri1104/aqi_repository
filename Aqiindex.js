
const apiKey = 'NVhLhB13wwaqJpK+DNtTBg==OzLOxO8w0BkWmQtH'

//selecting the serach button
//selecting city name
const searchBtn = document.getElementById("search-btn")


searchBtn.addEventListener("click", () => {

    //Fetches information from the api
    const getAqi =  async (cityName) => {
        try
        {
        const apiUrl = `https://api.api-ninjas.com/v1/airquality?city=${cityName}`
        let aqiObj = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'X-Api-key' : apiKey
            }
        })
        let response = await aqiObj.json();
        return response;
    }
    catch(error){
        console.log(error)
    }
    }

    //Call the function
    async function callAqi(){
        const city = document.getElementById("input-city")
        getAqi(city.value)
        .then((response) => 
        {
            updateAQI(response)
        }
        )
        .catch((error) => console.error(error))
    }

    callAqi();

})

function updateAQI(response){
    //selecting all the components required for updation
    const coAqi = document.getElementById("co-aqi")
    const noAqi = document.getElementById("no-aqi")
    const oAqi = document.getElementById("o-aqi")
    const pmAqi1 = document.getElementById("pm-aqi1")
    const pmAqi2 = document.getElementById("pm-aqi2")
    const soAqi = document.getElementById("so-aqi")

    //selecting concentration
    const coConc = document.getElementById("co-conc")
    const noConc = document.getElementById("no-conc")
    const oConc = document.getElementById("o-conc")
    const pmConc1 = document.getElementById("pm-conc1")
    const pmConc2 = document.getElementById("pm-conc2")
    const soConc = document.getElementById("so-conc")

    //selecting air quality index
    const actualAqi = document.getElementById("actual-aqi")
    const condition = document.getElementById("condition")

    //setting the values for aqi
    coAqi.innerText = response.CO.aqi
    noAqi.innerText = response.NO2.aqi
    oAqi.innerText = response.O3.aqi
    pmAqi1.innerText = response['PM2.5']['aqi']
    pmAqi2.innerText = response.PM10.aqi
    soAqi.innerText = response.SO2.aqi

    //setting the values for concentration
    coConc.innerText = response.CO.concentration
    noConc.innerText = response.NO2.concentration
    oConc.innerText = response.O3.concentration
    pmConc1.innerText = response['PM2.5']['concentration']
    pmConc2.innerText = response.PM10.concentration
    soConc.innerText = response.SO2.concentration

    //setting the values for overall aqi
    let overallAqi = response['overall_aqi']
    actualAqi.innerText = `AIR QUALITY INDEX : ${overallAqi}`
    if(overallAqi > 0 && overallAqi <= 50){
        condition.innerText = "GOOD"
        condition.style.backgroundColor = "#61dd61"
    }
    else if(overallAqi > 50 && overallAqi <= 100){
        condition.innerText = "MODERATE"
        condition.style.backgroundColor = "#f8791c"
    }
    else if(overallAqi > 100 && overallAqi <= 150){
        condition.innerText = "UNHEALTHY FOR SENSITIVE GROUPS"
        condition.style.backgroundColor = "#f93a29"
    }
    else if(overallAqi > 150 && overallAqi <= 200){
        condition.innerText = "UNHEALTHY"
        condition.style.backgroundColor = "#d60734"
    }
    else if(overallAqi > 200 && overallAqi <= 300){
        condition.innerText = "VERY UNHEALTHY"
        condition.style.backgroundColor = "#bb122d"
    }
    else {
        condition.innerText = "HAZARDOUS"
        condition.style.backgroundColor = "#781a29"
    }

    const aqi = document.getElementById("aqi")
    aqi.style.display = "flex"

}
