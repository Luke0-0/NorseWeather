// Luke Reinbach
// Norse Mythology Weather App

const button = document.getElementById("button")
const title = document.getElementById("title")
const search = document.getElementById("search")
const overlay = document.querySelector(".overlay")
const body = document.body
const main = document.querySelector("main")
const weather = document.querySelector(".weather-card")
const realm = document.querySelector(".realmTitleBox")
const realmHeading = document.querySelector(".realmHeading")
const miniRealm = document.querySelector(".miniRealm")
const miniRealm2 = document.querySelector(".miniRealm2")

// API info
const apiKey = "63f114228fabc0137a823cd2bfcb08ef";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBar = document.querySelector(".inputTitle") // get city from user input

// Receive the weather data from the API
async function checkWeather(city) {
    const response = await fetch(apiURL+ city + `&appid=${apiKey}`);
    var data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = Math.round(data.main.humidity) + "% humidity";
    document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + "km/h wind speed";

    // Change locations depending on weather

    // Reset hover classes before applying new ones
    realmHeading.classList.remove("hover-muspelheim", "hover-asgard");

    // Muspelheim = hot
    if (Math.round(data.main.temp) > 28) {
        body.style.backgroundImage = "url('images/muspelheim.png')";
        body.style.backgroundSize = "cover";
        body.style.backgroundPosition = "center";
        body.style.backgroundRepeat = "no-repeat";

        document.querySelector(".miniRealm").innerHTML = "Wow, " + Math.round(data.main.temp) + "°c? It's so hot it's looking like";
        document.querySelector(".realmHeading").innerHTML = "Muspelheim";
        document.querySelector(".miniRealm2").innerHTML = "the Fire Realm";

        realmHeading.classList.add("hover-muspelheim");
    }

    // Asgard = perfect day
    else if (Math.round(data.main.temp) < 28 && Math.round(data.main.temp) > 19) {
        body.style.backgroundImage = "url('images/asgard.png')";
        body.style.backgroundSize = "cover";
        body.style.backgroundPosition = "center";
        body.style.backgroundRepeat = "no-repeat";

        document.querySelector(".miniRealm").innerHTML = "A day fit for the gods, it's like";
        document.querySelector(".realmHeading").innerHTML = "Asgard";
        document.querySelector(".miniRealm2").innerHTML = "Realm of the Aesir";

        miniRealm.style.marginLeft = "1.25rem";
        realmHeading.classList.add("hover-asgard");
    }

    // Niflheim = cold
    else if (Math.round(data.main.temp) < 8) {
        body.style.backgroundImage = "url('images/niflheim.png')";
        body.style.backgroundSize = "cover";
        body.style.backgroundPosition = "center";
        body.style.backgroundRepeat = "no-repeat";

        document.querySelector(".miniRealm").innerHTML = "Brrr, " + Math.round(data.main.temp) + "°c! A place this cold could only be";
        document.querySelector(".realmHeading").innerHTML = "Niflheim";
        document.querySelector(".miniRealm2").innerHTML = "the Ice Realm";

        realmHeading.style.color = "rgb(59, 144, 178)";
        realmHeading.classList.add("hover-niflheim");
    }
    
    miniRealm2.style.width = `${realmHeading.offsetWidth}px`;
}


window.onload = function() {
    // fade in on load
    title.classList.add("fadeIn");
    setTimeout(() => {
        search.classList.add("fadeIn");
        button.classList.add("fadeIn");
    }, 1500)
}

button.addEventListener('click', () => {
    checkWeather(searchBar.value);

    // Remove the intial fade in class so it does not interfere with other future effects
    title.classList.remove("fadeIn");
    button.classList.remove("fadeIn");
    search.classList.remove("fadeIn");

    // When the first search is entered, remove the search bar and move the title to the top left corner
    title.classList.add("titleTransition");
    button.classList.add("hidden");
    search.classList.add("hidden");
    
    
    weather.style.opacity = "1";
    overlay.style.opacity = "0";
    realm.style.opacity = "1";
  
});