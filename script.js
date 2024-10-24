const button = document.getElementById("button")
const title = document.getElementById("title")
const search = document.getElementById("search")
const overlay = document.querySelector(".overlay")
const body = document.body
const weather = document.querySelector(".weather-card")

window.onload = function() {

    // fade in on load
    title.classList.add("fadeIn");
    setTimeout(() => {
        search.classList.add("fadeIn");
        button.classList.add("fadeIn");
    }, 1500)
}

button.addEventListener('click', () => {

    // Remove the intial fade in class so it does not interfere with other future effects
    title.classList.remove("fadeIn");
    button.classList.remove("fadeIn");
    search.classList.remove("fadeIn");

    // When the first search is entered, remove the search bar and move the title to the top left corner
    title.classList.add("titleTransition");
    button.classList.add("hidden");
    search.classList.add("hidden");

    body.style.backgroundImage = "url('images/underworld.png')";
    body.style.backgroundSize = "cover";
    body.style.backgroundPosition = "center";
    body.style.backgroundRepeat = "no-repeat";

    weather.style.opacity = "1";
    overlay.style.opacity = "0";
  
});