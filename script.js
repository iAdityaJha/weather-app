// const apiKey= "441a57aa8ba4c3d2b218c46df37ea84a";
// const card= document.getElementById('card');
//         const apiUrl="https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
//         async function checkWeather(city){
//             const response= await fetch(apiUrl +city + `&appid=${apiKey}`);
//             var data= await response.json();
//             console.log(data);
//             if(data.name===undefined)
//             document.querySelector(".city").innerHTML= "⚠️Invalid City Name"
//         else{
//             document.querySelector(".city").innerHTML= data.name;
//             document.querySelector(".temp").innerHTML= Math.round(data.main.temp)+"°C";
//             document.querySelector(".humidity").innerHTML= data.main.humidity+"%";
//             document.querySelector(".wind").innerHTML= data.wind.speed+" Km/h";
//         }
//         var weatherImage=document.getElementById('weatherImage');
//         var fetchedImg=data.weather[0].main.toLowerCase();
//         if(data.weather[0] && data.weather[0].main){
//             if(fetchedImg==="haze")
//                 fetchedImg="rain"
//             const path=`images/${fetchedImg}.png`;
//             weatherImage.src=path;
//             saveData(data.name);
//         }
//         }
//         var inputElement=document.getElementById('input')
//         var button=document.getElementById('search')
//         button.addEventListener('click',()=>{
//             const city=inputElement.value;
//             checkWeather(city);
//         })

//         function saveData(city){
//             localStorage.setItem("data",city);
//             localStorage.setItem("res",inputElement.value);
//         }
//         function showData(){
//             var cityol=localStorage.getItem("data");;
//             checkWeather(cityol.name);
//             inputElement.value=localStorage.getItem("res");
//         }
//         window.addEventListener('beforeunload',saveData(city));
//         showData()

document.addEventListener('DOMContentLoaded', () => {
    const apiKey = "441a57aa8ba4c3d2b218c46df37ea84a";
    const card = document.getElementById('card');
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
    const inputElement = document.getElementById('input');
    inputElement.addEventListener("keydown",function(e){
        if(e.key==="Enter"){
            e.preventDefault();
            saveData(inputElement.value);
            checkWeather(inputElement.value);
        }
    })
    async function checkWeather(city) {
        try {
            const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
            const data = await response.json();
            console.log(data);

            if (!response.ok || !data.name) {
                document.querySelector(".city").innerHTML = "⚠️ Invalid City Name";
            } else {
                document.querySelector(".city").innerHTML = data.name;
                document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
                document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
                document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";
                
                const weatherImage = document.getElementById('weatherImage');
                let fetchedImg = data.weather[0].main.toLowerCase();
                if (fetchedImg === "haze") fetchedImg = "rain";
                const path = `images/${fetchedImg}.png`;
                weatherImage.src = path;

                saveData(data.name);
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            document.querySelector(".city").innerHTML = "⚠️ Error fetching data";
        }
    }

    const button = document.getElementById('search');

    button.addEventListener('click', () => {
        const city = inputElement.value.trim(); // Trim to remove any leading/trailing whitespace
        if (city === '') {
            document.querySelector('.city').innerHTML = '⚠️ Enter a valid city name';
        } else {
            checkWeather(city);
        }
    });
    function saveData(city) {
        localStorage.setItem("data", city);
        localStorage.setItem("res", inputElement.value);
    }

    function showData() {
        const city = localStorage.getItem("data");
        if (city) {
            inputElement.value = localStorage.getItem("res");
            checkWeather(city);
        }
    }

    // window.addEventListener('beforeunload', () => saveData(inputElement.value));
    showData();
});
