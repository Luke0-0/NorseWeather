// Luke Reinbach
// Norse Mythology Weather App

const button = document.getElementById("button")
const button2 = document.getElementById("button2")
const title = document.getElementById("title")
const search = document.getElementById("search")
const search2 = document.getElementById("search2")
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

const searchBar = document.querySelector(".searchBar") // get city from user input

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
    realmHeading.classList.remove("hover-muspelheim", "hover-asgard", "hover-helheim", "hover-ragnarok", "hover-alfheim", "hover-vanaheim", "hover-midgard", "hover-valhalla", "hover-niflheim", "hover-svartalfheim", "hover-jotunheim");

     // Helheim = fog/mist
     if (data.weather[0].main === "Fog" || data.weather[0].main === "Mist") {
        body.style.backgroundImage = "url('images/helheim.png')";
        body.style.backgroundSize = "cover";
        body.style.backgroundPosition = "center";
        body.style.backgroundRepeat = "no-repeat";

        document.querySelector(".miniRealm").innerHTML = "Foggy, misty, and ominous, welcome to";
        document.querySelector(".realmHeading").innerHTML = "Helheim";
        document.querySelector(".miniRealm2").innerHTML = "Realm of Death";

        realmHeading.classList.add("hover-helheim");
        miniRealm.style.marginLeft = "0.5rem";
    }

    // Ragnarok = thunderstorms
    if (data.weather[0].main === "Thunderstorm") {
        body.style.backgroundImage = "url('images/ragnarok.png')";
        body.style.backgroundSize = "cover";
        body.style.backgroundPosition = "center";
        body.style.backgroundRepeat = "no-repeat";

        document.querySelector(".miniRealm").innerHTML = "Thunder and lightning, doom is upon us!";
        document.querySelector(".realmHeading").innerHTML = "Ragnarok";
        document.querySelector(".miniRealm2").innerHTML = "The End Times";

        realmHeading.classList.add("hover-ragnarok");
        miniRealm.style.marginLeft = "0.5rem";
    }

    // Muspelheim = hot
    else if (Math.round(data.main.temp) > 28) {
        body.style.backgroundImage = "url('images/muspelheim.png')";
        body.style.backgroundSize = "cover";
        body.style.backgroundPosition = "center";
        body.style.backgroundRepeat = "no-repeat";

        document.querySelector(".miniRealm").innerHTML = "Wow, " + Math.round(data.main.temp) + "°c? It's so hot it's looking like";
        document.querySelector(".realmHeading").innerHTML = "Muspelheim";
        document.querySelector(".miniRealm2").innerHTML = "Realm of Fire";

        realmHeading.classList.add("hover-muspelheim");
        miniRealm.style.marginLeft = "0.5rem";
    }

    // Alfheim = mild and clear skies
    else if (Math.round(data.main.temp) > 11 && Math.round(data.main.temp) <= 19 && data.weather[0].main === "Clear") {
        body.style.backgroundImage = "url('images/alfheim.png')";
        body.style.backgroundSize = "cover";
        body.style.backgroundPosition = "center";
        body.style.backgroundRepeat = "no-repeat";

        document.querySelector(".miniRealm").innerHTML = "Bright skies and pleasant weather in";
        document.querySelector(".realmHeading").innerHTML = "Alfheim";
        document.querySelector(".miniRealm2").innerHTML = "Realm of the Light Elves";

        realmHeading.classList.add("hover-alfheim");
        miniRealm.style.marginLeft = "0.5rem";
    }

    // Midgard = cool weather, or light rain
    else if ((Math.round(data.main.temp) >= 6 && Math.round(data.main.temp) < 13 && (data.clouds.all < 80 || data.weather[0].main === "Drizzle")) || data.weather[0].number === 500) {
        body.style.backgroundImage = "url('images/midgard.png')";
        body.style.backgroundSize = "cover";
        body.style.backgroundPosition = "center";
        body.style.backgroundRepeat = "no-repeat";

        document.querySelector(".miniRealm").innerHTML = "Cool, fair weather, feels like the harmonious";
        document.querySelector(".realmHeading").innerHTML = "Midgard";
        document.querySelector(".miniRealm2").innerHTML = "Realm of the Humans";

        realmHeading.classList.add("hover-midgard");
      
    }

    // Valhalla = perfect clear day
    else if (Math.round(data.main.temp) <= 28 && Math.round(data.main.temp) > 19 && data.weather[0].main === "Clear") {
        body.style.backgroundImage = "url('images/valhalla.png')";
        body.style.backgroundSize = "cover";
        body.style.backgroundPosition = "center";
        body.style.backgroundRepeat = "no-repeat";

        document.querySelector(".miniRealm").innerHTML = "A glorious day, one would feel like a champion of";
        document.querySelector(".realmHeading").innerHTML = "Valhalla";
        document.querySelector(".miniRealm2").innerHTML = "Hall of the Slain";

        realmHeading.classList.add("hover-valhalla");
      
    }

    // Vanaheim = mild, some clouds or drizzle
    else if (Math.round(data.main.temp) >= 13 && Math.round(data.main.temp) <= 19 && (data.clouds.all < 80 || data.weather[0].main === "Drizzle")) {
        body.style.backgroundImage = "url('images/vanaheim.png')";
        body.style.backgroundSize = "cover";
        body.style.backgroundPosition = "center";
        body.style.backgroundRepeat = "no-repeat";

        document.querySelector(".miniRealm").innerHTML = "Relaxing, calm weather, just like the illustrious";
        document.querySelector(".realmHeading").innerHTML = "Vanaheim";
        document.querySelector(".miniRealm2").innerHTML = "Realm of Prosperity";

        realmHeading.classList.add("hover-vanaheim");
      
    }

    // Asgard = beautiful day
    else if ((Math.round(data.main.temp) > 19 && Math.round(data.main.temp) <= 28 && data.clouds.all < 51)) {
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
    else if (Math.round(data.main.temp) < 6 || data.weather[0].main === "Snow") {
        body.style.backgroundImage = "url('images/niflheim.png')";
        body.style.backgroundSize = "cover";
        body.style.backgroundPosition = "center";
        body.style.backgroundRepeat = "no-repeat";

        document.querySelector(".miniRealm").innerHTML = "Brrr, " + Math.round(data.main.temp) + "°c! A place this cold could only be";
        document.querySelector(".realmHeading").innerHTML = "Niflheim";
        document.querySelector(".miniRealm2").innerHTML = "Realm of Ice";

        realmHeading.classList.add("hover-niflheim");
        miniRealm.style.marginLeft = "0.5rem";
    }

    // Svartaflheim = cloudy
    else if (data.clouds.all > 50) {
        body.style.backgroundImage = "url('images/svartalfheim.png')";
        body.style.backgroundSize = "cover";
        body.style.backgroundPosition = "center";
        body.style.backgroundRepeat = "no-repeat";

        document.querySelector(".miniRealm").innerHTML = "Dark and overcast, as if one was underground in";
        document.querySelector(".realmHeading").innerHTML = "Svartalfheim";
        document.querySelector(".miniRealm2").innerHTML = "Realm of the Dark Elves";

        realmHeading.classList.add("hover-svartalfheim");
        miniRealm.style.marginLeft = "0.5rem";
    }

    // Jotunheim = rainy
    else if (data.weather[0].main === "Rain") {
        body.style.backgroundImage = "url('images/jotunheim.png')";
        body.style.backgroundSize = "cover";
        body.style.backgroundPosition = "center";
        body.style.backgroundRepeat = "no-repeat";

        document.querySelector(".miniRealm").innerHTML = "Brace yourself for strong weather and rain";
        document.querySelector(".realmHeading").innerHTML = "Jotunheim";
        document.querySelector(".miniRealm2").innerHTML = "Realm of the Giants";

        realmHeading.classList.add("hover-jotunheim");
        miniRealm.style.marginLeft = "0.5rem";
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
    titleTrans();
  
});

search.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        titleTrans();
    }
  
});

button2.addEventListener('click', () => {
    overlay.style.transition = "opacity 0.4s ease 0s";
    realm.style.transition = "opacity 0.2s ease 0s";
    overlay.style.opacity = "1";
    realm.style.opacity = "0";

    checkWeather(search2.value);

    setTimeout (() => {
        overlay.style.opacity = "0";
        realm.style.opacity = "1";
    }, 1400);
  
});

search2.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        overlay.style.transition = "opacity 0.4s ease 0s";
        realm.style.transition = "opacity 0.2s ease 0s";
        overlay.style.opacity = "1";
        realm.style.opacity = "0";

        checkWeather(search2.value);

        setTimeout (() => {
            overlay.style.opacity = "0";
            realm.style.opacity = "1";
        }, 1400);
    }
});

// Transition from the opening title to the main page
function titleTrans () {
    checkWeather(searchBar.value);

    // Remove the intial fade in class so it does not interfere with other future effects
    button.classList.remove("fadeIn");
    search.classList.remove("fadeIn");
    title.classList.remove("fadeIn");

    // When the first search is entered, remove the search bar and move the title to the top left corner
    button.classList.add("hidden");
    search.classList.add("hidden");
    title.classList.add("titleTransition");

    search2.style.opacity = "1";
    button2.style.opacity = "1";
    
    
    weather.style.opacity = "1";
    overlay.style.opacity = "0";
    realm.style.opacity = "1";
}