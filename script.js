// script.js

const temperatureField = document.querySelector(".temp");
const locationField = document.querySelector(".location");
const dateField = document.querySelector(".date");
const weatherField = document.querySelector(".condition");
const iconField = document.querySelector(".weather_icon");
const errorBlock = document.querySelector(".error_message_block");
const searchField = document.querySelector("#searchField");
const form = document.querySelector("#searchForm");
const windspeedField =document.querySelector(".windspeed")

let target = 'Lucknow'; // Default location

const fetchResults = async (targetLocation) => {
    let url = `http://api.weatherapi.com/v1/current.json?key=c77959c4fdf54a81bce50646242307&q=${targetLocation}`;
    
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error('City not found');
        }
        const data = await res.json();
        console.log(data)
        updateDetails(data);
    } catch (error) {
        displayError(error.message);
    }
}

const updateDetails = (data) => {
    errorBlock.style.display = 'none'; // Hide error block
    document.querySelectorAll('.weather_blocks > div:not(.error_message_block)').forEach(block => {
        block.style.display = 'block'; // Show all blocks
    });

    let locationName = data.location.name;
    let time = data.location.localtime;
    let temp = data.current.temp_c;
    let condition = data.current.condition.text;
    let iconUrl = data.current.condition.icon;
    let windkph=data.current.wind_kph;
    console.log(windkph)

    let splitDate = time.split(' ')[0];
    let splitTime = time.split(' ')[1];
    let currentDay = getDayName(new Date(splitDate).getDay());

    temperatureField.innerText = `${temp}°C`;
    locationField.innerText = locationName;
    dateField.innerText = `${splitDate} ${currentDay} ${splitTime}`;
    weatherField.innerText = condition;
    iconField.src = `http:${iconUrl}`;
    windspeedField.innerText = `${windkph} kph`;

}

const displayError = (message) => {
    document.querySelectorAll('.weather_blocks > div:not(.error_message_block)').forEach(block => {
        block.style.display = 'none'; // Hide all blocks
    });
    errorBlock.style.display = 'block'; // Show error block
    document.querySelector(".error_message").innerText = message;
}

const searchForLocation = (e) => {
    e.preventDefault();
    target = searchField.value;
    fetchResults(target);
}

form.addEventListener('submit', searchForLocation);

fetchResults(target);

function getDayName(number) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[number];
}
