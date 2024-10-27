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
const weatherIcon = document.querySelector(".weather-icon");
const invalidLocation = document.querySelector(".invalidLocation")
const invalidLocation2 = document.getElementById("invalidLocation2");

// Preload every image so it loads faster
const imageUrls = ["images/jotunheim.png", "images/muspelheim.png", "images/niflheim.png", "images/svartalfheim.png", "images/alfheim.png", "images/vanaheim.png", "images/asgard.png", "images/midgard.png"]; 
imageUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
});

// API info
const apiKey = "63f114228fabc0137a823cd2bfcb08ef";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBar = document.querySelector(".searchBar") // get city from user input

// Receive the weather data from the API
async function checkWeather(city) {
    const response = await fetch(apiURL+ city + `&appid=${apiKey}`);

    // Clear previous weather data
    document.querySelector(".city").innerHTML = "";
    document.querySelector(".temp").innerHTML = "";
    document.querySelector(".humidity").innerHTML = "";
    document.querySelector(".wind").innerHTML = "";

    var data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = Math.round(data.main.humidity) + "% humidity";
    document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + " m/s wind speed";


    // Calculate if it is daytime or nighttime
    const timezone = data.timezone; 
    const sunrise = data.sys.sunrise;  
    const sunset = data.sys.sunset;      

    const currentTime = Math.floor(Date.now() / 1000);

    // Calculate city's local current time by adding the timezone
    const localTime = currentTime + timezone;

    let timeOfDay;
    if (localTime >= sunrise && localTime <= sunset) {
        timeOfDay = "day";
    } else {
        timeOfDay = "night";
    }

    // Change weather icon
    if (data.weather[0].main === "Fog" || data.weather[0].main === "Mist") {
        weatherIcon.src ="images/fog.png";
    } 
    else if (data.weather[0].main === "Thunderstorm") {
        weatherIcon.src ="images/storm.png";
    } 
    else if (data.weather[0].main === "Snow") {
        weatherIcon.src ="images/snow.png";
    } 
    else if (data.weather[0].main === "Drizzle" || data.weather[0].main === "Rain") {
        weatherIcon.src ="images/rain.png";
    } 
    else if (timeOfDay === "night" && data.weather[0].main === "Clear") {
        weatherIcon.src ="images/night.png";
    }
    else if (timeOfDay === "night" && data.clouds.all > 0) {
        weatherIcon.src ="images/cloudyNight.png";
    }  
    else if (data.weather[0].main === "Clear") {
        weatherIcon.src ="images/clear.png";
    } 
    else if (data.clouds.all >= 80) {
        weatherIcon.src ="images/cloud.png";
    } 
    else if (data.clouds.all < 80) {
        weatherIcon.src ="images/partlyCloudy.png";
    }

    // Change locations depending on weather

    // Reset hover classes before applying new ones
    realmHeading.classList.remove("hover-muspelheim", "hover-asgard", "hover-helheim", "hover-ragnarok", "hover-alfheim", "hover-vanaheim", "hover-midgard", "hover-valhalla", "hover-niflheim", "hover-svartalfheim", "hover-jotunheim");

    // Determine the background image based on the weather
    let bgImage = '';

    // Helheim = fog
    if (data.weather[0].main === "Fog" || data.weather[0].main === "Mist") {
        bgImage = "images/helheim.png";
        document.querySelector(".miniRealm").innerHTML = "Foggy, misty, and ominous, welcome to";
        document.querySelector(".realmHeading").innerHTML = "Helheim";
        document.querySelector(".miniRealm2").innerHTML = "Realm of Death";
        realmHeading.classList.add("hover-helheim");
        miniRealm.style.marginLeft = "0.5rem";
    } 

    // Ragnarok = Thunderstorm
    else if (data.weather[0].main === "Thunderstorm") {
        bgImage = "images/ragnarok.png";
        document.querySelector(".miniRealm").innerHTML = "Thunder and lightning, doom is upon us!";
        document.querySelector(".realmHeading").innerHTML = "Ragnarok";
        document.querySelector(".miniRealm2").innerHTML = "The End Times";
        realmHeading.classList.add("hover-ragnarok");
    }

    // Jotunheim = rainy
    else if (data.weather[0].main === "Rain" && data.weather[0].number != 500) {
        bgImage = "images/jotunheim.png"
        document.querySelector(".miniRealm").innerHTML = "Brace yourself for strong weather and rain";
        document.querySelector(".realmHeading").innerHTML = "Jotunheim";
        document.querySelector(".miniRealm2").innerHTML = "Realm of the Giants";

        realmHeading.classList.add("hover-jotunheim");
        miniRealm.style.marginLeft = "0.5rem";
    }

    // Muspelheim = hot
    else if (Math.round(data.main.temp) > 28) {
        bgImage = "images/muspelheim.png";
        document.querySelector(".miniRealm").innerHTML = "Wow, " + Math.round(data.main.temp) + "°c? It's so hot it's looking like";
        document.querySelector(".realmHeading").innerHTML = "Muspelheim";
        document.querySelector(".miniRealm2").innerHTML = "Realm of Fire";
        realmHeading.classList.add("hover-muspelheim");
    }

    // Niflheim = cold
    else if (Math.round(data.main.temp) < 6 || data.weather[0].main === "Snow") {
        bgImage = "images/niflheim.png"

        document.querySelector(".miniRealm").innerHTML = "Brrr, " + Math.round(data.main.temp) + "°c! A place this cold could only be";
        document.querySelector(".realmHeading").innerHTML = "Niflheim";
        document.querySelector(".miniRealm2").innerHTML = "Realm of Ice";

        realmHeading.classList.add("hover-niflheim");
        miniRealm.style.marginLeft = "0.5rem";
    }

    // Svartaflheim = cloudy
    else if (data.clouds.all > 50) {
        bgImage = "images/svartalfheim.png"

        document.querySelector(".miniRealm").innerHTML = "Dark and overcast, as if one was underground in";
        document.querySelector(".realmHeading").innerHTML = "Svartalfheim";
        document.querySelector(".miniRealm2").innerHTML = "Realm of the Dark Elves";

        realmHeading.classList.add("hover-svartalfheim");
        miniRealm.style.marginLeft = "0.5rem";
    }

    // Alfheim = mild and clear skies
    else if (Math.round(data.main.temp) > 11 && Math.round(data.main.temp) <= 19 && data.weather[0].main === "Clear") {
        bgImage = "images/alfheim.png"

        document.querySelector(".miniRealm").innerHTML = "Bright skies and pleasant weather in";
        document.querySelector(".realmHeading").innerHTML = "Alfheim";
        document.querySelector(".miniRealm2").innerHTML = "Realm of the Light Elves";

        realmHeading.classList.add("hover-alfheim");
        miniRealm.style.marginLeft = "0.5rem";
    }

    // Midgard = cool weather, or light rain
    else if ((Math.round(data.main.temp) >= 6 && Math.round(data.main.temp) < 13 && (data.clouds.all < 80 || data.weather[0].main === "Drizzle")) || data.weather[0].number === 500) {
        bgImage = "images/midgard.png"

        document.querySelector(".miniRealm").innerHTML = "Cool, fair weather, feels like the harmonious";
        document.querySelector(".realmHeading").innerHTML = "Midgard";
        document.querySelector(".miniRealm2").innerHTML = "Realm of the Humans";

        realmHeading.classList.add("hover-midgard");
        miniRealm.style.marginLeft = "0.5rem";
      
    }

    // Valhalla = perfect clear day
    else if (Math.round(data.main.temp) <= 28 && Math.round(data.main.temp) > 19 && data.weather[0].main === "Clear") {
        bgImage = "images/valhalla.png"

        document.querySelector(".miniRealm").innerHTML = "A glorious day, one would feel like a champion of";
        document.querySelector(".realmHeading").innerHTML = "Valhalla";
        document.querySelector(".miniRealm2").innerHTML = "Hall of the Slain";

        realmHeading.classList.add("hover-valhalla");
        miniRealm.style.marginLeft = "0.5rem";
      
    }

    // Vanaheim = mild, some clouds or drizzle
    else if (Math.round(data.main.temp) >= 13 && Math.round(data.main.temp) <= 19 && (data.clouds.all < 80 || data.weather[0].main === "Drizzle" || data.weather[0].number === 500)) {
        bgImage = "images/vanaheim.png"

        document.querySelector(".miniRealm").innerHTML = "Relaxing, calm weather, just like the illustrious";
        document.querySelector(".realmHeading").innerHTML = "Vanaheim";
        document.querySelector(".miniRealm2").innerHTML = "Realm of Prosperity";

        realmHeading.classList.add("hover-vanaheim");
        miniRealm.style.marginLeft = "0.5rem";
      
    }

    // Asgard = beautiful day
    else if ((Math.round(data.main.temp) > 19 && Math.round(data.main.temp) <= 28 && (data.clouds.all < 51 && data.clouds.all > 0))) {
        bgImage = "images/asgard.png"

        document.querySelector(".miniRealm").innerHTML = "A day fit for the gods, just like";
        document.querySelector(".realmHeading").innerHTML = "Asgard";
        document.querySelector(".miniRealm2").innerHTML = "Realm of the Aesir";

        miniRealm.style.marginLeft = "1.25rem";
        realmHeading.classList.add("hover-asgard");
    }

    miniRealm2.style.width = `${realmHeading.offsetWidth}px`;

    // Clear existing background
    body.style.backgroundImage = '';

    // Function to set the background image with lazy loading
    const setLazyBackgroundImage = (imageUrl) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = imageUrl;
            img.onload = () => {
                body.style.backgroundImage = `url(${imageUrl})`;
                body.style.backgroundSize = "cover";
                body.style.backgroundPosition = "center";
                body.style.backgroundRepeat = "no-repeat";
                resolve();
            };
        });
    };

    // Create a target element for the observer
    const targetElement = document.createElement('div');
    targetElement.style.height = '1px'; // This can be any small height
    document.body.appendChild(targetElement);

    // Use the Intersection Observer to lazy load the background image
    const observer = new IntersectionObserver(async (entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                // Load the background image
                await setLazyBackgroundImage(bgImage);
                observer.unobserve(entry.target);
            }
        }
    });

    // Start observing the target element
    observer.observe(targetElement);
    await setLazyBackgroundImage(bgImage);
    setTimeout (() => {
        overlay.style.opacity = "0";
        realm.style.opacity = "1";
    }, 300);
}


window.onload = function() {
    // fade in on load
    title.classList.add("fadeIn");
    setTimeout(() => {
        search.classList.add("fadeIn");
        button.classList.add("fadeIn");
    }, 1500)
}

button.addEventListener('click', async () => {
    invalidLocation.style.opacity = "0";
    const isValidCity = await checkCity(search.value);

    if (isValidCity) {
        titleTrans();
    }

});

search.addEventListener('keydown', async (event) => {
    if (event.key === "Enter") {
        invalidLocation.style.opacity = "0";
        const isValidCity = await checkCity(search.value);

        if (isValidCity) {
            titleTrans();
        }

    }
});

button2.addEventListener('click', async () => {
    invalidLocation2.style.opacity = "0";
    const isValidCity = await checkCity(search2.value);

    if (isValidCity) {
        overlay.style.transition = "opacity 0.6s ease 0s";
        realm.style.transition = "opacity 0.2s ease 0s";
        overlay.style.opacity = "1";
        realm.style.opacity = "0";
        body.style.transition = "0.1s ease 0s";

        checkWeather(search2.value);

        search2.value=""; // reset search value
    }
  
});

search2.addEventListener('keydown', async (event) => {
    if (event.key === "Enter") {
        invalidLocation2.style.opacity = "0";
        const isValidCity = await checkCity(search2.value);

        if (isValidCity) {
            overlay.style.transition = "opacity 0.25s ease 0s";
            realm.style.transition = "opacity 0.2s ease 0s";
            overlay.style.opacity = "1";
            realm.style.opacity = "0";
            body.style.transition = "0.1s ease 0s";

            checkWeather(search2.value);

            search2.value=""; // reset search value
        }
    }
});

// Transition from the opening title to the main page
function titleTrans() {
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
    invalidLocation.remove();
}

// Check if city being searched is valid
async function checkCity(city) {
    const response = await fetch(apiURL+ city + `&appid=${apiKey}`);

    if (!response.ok) {
        invalidLocation.style.opacity = "1"; 
        invalidLocation2.style.opacity = "1"; 

        // Add shake animation class
        void search.offsetWidth;
        search.classList.add("shake");
        search2.classList.add("shake");
        button.classList.add("shakeButton");
        button2.classList.add("shakeButton");

        // Remove shake class after animation ends
        setTimeout(() => {
            search.classList.remove("shake");
            search2.classList.remove("shake");
            button.classList.remove("shakeButton");
            button2.classList.remove("shakeButton");
        }, 500);
        
        return false;
    }
    else {
        invalidLocation.style.opacity = "0";
        invalidLocation2.style.opacity = "0"; 
        return true;
    }
}