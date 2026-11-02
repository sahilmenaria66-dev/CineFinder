let searchInput = document.querySelector("#search-input");
let searchButton = document.querySelector(".search-button");
let movieList = document.querySelector(".movie-grid");
let nodata = document.querySelector(".nodata");

let API_KEY = "YOUR_API_KEY";

// Create Movie Card
function createMovieCard(movie) {

    let div1 = document.createElement("div");
    div1.classList.add("movie-card");

    let img = document.createElement("img");
    img.classList.add("poster");
    img.src = movie.Poster !== "N/A" ? movie.Poster : "";
    img.alt = movie.Title;

    let h3 = document.createElement("h3");
    h3.textContent = movie.Title;

    let p = document.createElement("p");
    p.textContent = movie.Year;

    let span = document.createElement("span");
    span.textContent = movie.Type;

    movieList.appendChild(div1);
    div1.appendChild(img);
    div1.appendChild(h3);
    div1.appendChild(p);
    p.appendChild(span);
}

// Fetch Movies
function getMovies(movieName) {

    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(movieName)}`)

        .then(response => response.json())

        .then(data => {

            console.log(data);

            // Clear old cards
            movieList.innerHTML = "";

            if (data.Search && data.Search.length > 0) {

                // Hide no data message
                if (nodata) {
                    nodata.style.display = "none";
                }

                // Render new movie cards
                data.Search.forEach(movie => {
                    createMovieCard(movie);
                });

            } else {

                // Show no data message
                if (nodata) {
                    nodata.style.display = "block";
                    nodata.textContent = "No movies found!";
                }

            }

        })

        .catch(error => {

            console.log("API Error:", error);

            movieList.innerHTML = "";

            if (nodata) {
                nodata.style.display = "block";
                nodata.textContent = "Something went wrong. Please try again!";
            }

        });
}

// Initial Movies
getMovies("Avengers");

// Search Button
searchButton.addEventListener("click", (event) => {

    event.preventDefault();

    let movieName = searchInput.value.trim();

    if (movieName === "") {

        alert("Please enter movie name");
        return;

    } else {

        getMovies(movieName);

    }

});

// Search using Enter key
searchInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        searchButton.click();
    }

});