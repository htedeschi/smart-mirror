const WEATHER_API_TOKEN = '441b0294711a0d1d35d2053698ac763e';
const NUM_HEADLINES = 5;

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    document.getElementById('current-time').innerHTML =
        h + ":" + m;

    var t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;
}

function startDate() {
    n = new Date();
    y = n.getFullYear();
    m = n.getMonth() + 1;
    d = n.getDate();
    document.getElementById("current-date").innerHTML = m + "/" + d + "/" + y;
    var t = setTimeout(startTime, 3600000);
}

function getWeather() {
    // get current location
    getLocation();

    // run this every hour
    var t = setTimeout(getWeather, 3600000);
}

function getLocation(test = false) {
    var location = [];

    if (test) {
        location.coords.latitude = "43.816538";
        location.coords.longitude = "-111.792808";
        getCoordinates(location);
    } else {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getCoordinates);
        }
    }
}

function getCoordinates(position) {
    var location = [];
    location.latitude = position.coords.latitude;
    location.longitude = position.coords.longitude;

    // console.log("Coordinates: ", location);

    getCurrentWeatherAPI(location);
}

function getCurrentWeatherAPI(location) {
    // Set up our HTTP request
    var xhr = new XMLHttpRequest();

    // Setup our listener to process completed requests
    xhr.onload = function () {

        // Process our return data
        if (xhr.status >= 200 && xhr.status < 300) {
            // What do when the request is successful
            // console.log(JSON.parse(xhr.response));
            var response = JSON.parse(xhr.response);
            if (response.success) {
                var currently = response.response.currently;

                var temperature = document.getElementById('current-temperature');
                var icon = document.getElementById('current-weather-icon');
                var summary = document.getElementById('current-weather-summary');

                temperature.innerHTML = `${Math.round(currently.temperature)}&#176;F`;
                icon.innerHTML = '<img width="50%" src="' + findIconSrc(currently.icon) + '" alt="Picture that describes ' + currently.summary + '" />';
                summary.innerHTML = `${currently.summary}`;
            }
        } else {
            // What do when the request fails
            console.log('The request failed!');
        }

        // Code that should run regardless of the request status
        // console.log('This always runs...');
    };

    // Create and send a GET request
    xhr.open('GET', `/getWeather/${WEATHER_API_TOKEN}/${location.latitude}/${location.longitude}`);
    xhr.send();
}

function findIconSrc(i) {
    var icons = {
        'clear-day': "img/weather-icons/Sun.png",
        'wind': "img/weather-icons/Wind.png",
        'cloudy': "img/weather-icons/Cloud.png",
        'partly-cloudy-day': "img/weather-icons/PartlySunny.png",
        'rain': "img/weather-icons/Rain.png",
        'snow': "img/weather-icons/Snow.png",
        'snow-thin': "img/weather-icons/Snow.png",
        'fog': "img/weather-icons/Haze.png",
        'clear-night': "img/weather-icons/Moon.png",
        'partly-cloudy-night': "img/weather-icons/PartlyMoon.png",
        'thunderstorm': "img/weather-icons/Storm.png",
        'tornado': "img/weather-icons/Tornado.png",
        'hail': "img/weather-icons/Hail.png"
    };

    var icon = icons[i];

    return icon;
}

function getLatestNews(location = null) {
    // Set up our HTTP request
    var xhr = new XMLHttpRequest();

    // Setup our listener to process completed requests
    xhr.onload = function () {

        // Process our return data
        if (xhr.status >= 200 && xhr.status < 300) {
            // What do when the request is successful
            var response = JSON.parse(xhr.response);
            var items = response.response.rss.channel.item;
            var headlinesHTML = "";
            var headlines = document.getElementById('headlines');

            for (let index = 0; index < NUM_HEADLINES; index++) {
                const item = items[index];
                headlinesHTML += '<p class="headline"><i class="fas fa-newspaper"></i> ' + item.title._text + "</p><div class='sexy_line'></div>";
            }

            headlines.innerHTML = headlinesHTML;

        } else {
            // What do when the request fails
            console.log('The request failed!');
        }

        // Code that should run regardless of the request status
        // console.log('This always runs...');
    };

    // Create and send a GET request
    xhr.open('GET', '/getNews');
    xhr.send();
}

function ready() {
    // start time
    console.log("Starting time counter...");
    startTime();

    // start date
    console.log("Starting current date...");
    startDate();

    // get weather
    console.log("Getting Weather...");
    getWeather();

    // get news
    console.log("Getting Latest News...");
    getLatestNews();
}