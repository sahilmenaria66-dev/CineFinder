let searchInput = document.querySelector("#search-input");
let searchButton = document.querySelector(".search-button");
let movieList = document.querySelector(".movie-grid");


let myMovieApi = fetch("https://www.omdbapi.com/?apikey=a9e10b18&s=Avengers")
.then(responce => responce.json())
.then(data => {
  console.log(data.Search);

 function createMovieCard(movie) {
let div1 = document.createElement("div");
div1.classList.add("movie-card");

let img = document.createElement("img");
img.classList.add("poster");
img.src = movie.Poster;
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

data.Search.forEach(element => {
  createMovieCard(element);
});



searchButton.addEventListener("click", (event) => {
event.preventDefault();
 let card = document.querySelectorAll(".movie-card")

card.forEach((allCards)=>{
  let h3 = allCards.querySelector("h3")
  if(!h3.textContent.toLowerCase().includes(searchInput.value.trim().toLowerCase())){
    allCards.style.display = "none"
  }else{
    allCards.style.display = "block"
  }

})

 let movieNAme = searchInput.value
  if(searchInput.value.trim() === ""){
    alert("pleace enter movie name ")
    return
  }else{
    let newApi = fetch(`https://www.omdbapi.com/?apikey=a9e10b18&s=${movieNAme}`)
   .then(newResponce => newResponce.json())
   .then(newData => {
    console.log(newData)
    newData.Search.forEach((elementss)=>{
      createMovieCard(elementss)

       if(movieList.innerHTML === ""){
    alert("no movie found")
  }

              })

          });

       }

   })

})