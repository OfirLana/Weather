
const box = document.querySelector('.box');
const main_weather = document.querySelector('.main_weather');
const temp = document.querySelector('.temp');
const btn = document.querySelector('.btn');
const input = document.querySelector('.input_search');
const country_box = document.querySelector('.box_country');
const country = document.querySelector('.country');
const card = document.querySelector('.box_card');
const celsius = document.querySelector('.temp_text');
const weather_title = document.querySelector('.weather_title')
const date_hour = document.querySelector('.date_hour')


const city = input.value;
input.addEventListener('keyup', function (e) {
    e.preventDefault();
    if (e.keyCode === 13) {
        console.log(input.value)
        get_data(city)
    }

});
document.querySelector('.input_search')
.addEventListener('onkeydown', function (e) {
    e.preventDefault();
    if (e.keyCode == 13){
    get_data();
    }
});
//button event click plus getting Json data.
btn.addEventListener('click', function (e) {
    e.preventDefault();
    get_data()
});


//starting Async function
async function get_data(value) {
    let city = '';
    if (input.value === '') {
        city = value
    }
    city = input.value;
    // console.log(city)

    //url of json with a variable
    let url = `http://api.openweathermap.org/data/2.5/forecast?appid=0dbad44851667d998b4c0f15ebbc7420&q=${city}&cnt=16`;

    //making the url and json file inside data
    const res = await fetch(url);
    const data = await res.json();

    //list array&object of images.
    const imageArray = [
        {
            type: "Sunweather",
            url: "img/sunweather.jpg"
        },
        {
            type: "Clear",
            url: "img/clear.jpg"
        },
        {
            type: "Snow",
            url: "img/snow.jpg"
        },
        {
            type: "Cloudy",
            url: "img/cloud.jpg"
        },
        {
            type: "Rain",
            url: "img/rain.jpg"
        },

    ]


    //loop all over the ImageArray and when the type  equal to url json main,
    //   it change the background image.
    for (var i = 0; i < imageArray.length; i++) {
        if (imageArray[i].type === data.list[0].weather[0].main) {
            card.style.backgroundImage = `url(${imageArray[i].url})`;
        }
    }

    //getting celsius convert with simple calculator.
    // °C =K - 273.15
    let c = data.list[0].main.temp - 273.15;
    //making the number round 
    c = Math.floor(c)

    celsius.textContent = c
    date_hour.textContent = data.list[0].dt_txt;
    weather_title.textContent = data.list[0].weather[0].description;
    main_weather.textContent = data.list[0].weather[0].main;
    country.textContent = data.city.name;
}

