/* What needs to be done on this page 

//#1 when the page is loaded ==> display the current seat map with the appropreage status
//--> get the local storage data with the movieId

//#2. when the seat is selected ==>update the local storage and count up the seat number and calculate the total price
// --> function updateSelectedCount()

// ******* POINT :D
//1. at the very first time, local storage is null. So I have added an template object (line 40)
//2. getting data from local storage. ==> JSON.parse()
//3. setting data into local storage. ==> JSON.stringify()
//4. array looping
*/


//PICK YOUR MOVIE SCRIPT
//MY API
const url = 'https://api.themoviedb.org/3';
const myAPIKey = '57e818a124323472d87df0007c4cd0ca';

//create a variable to pass the movie ID as a parameter 
const urlParams = new URLSearchParams(window.location.search);
const movieID = urlParams.get('movieId');

const container = document.getElementById('seat-container'); //seat container
const movieSelect = document.getElementById('movie'); //select tag
const text = document.getElementById('text'); //display total num and text
const seats = document.querySelectorAll('.seat'); //all individual seats
const buyBtn = document.getElementById('buy-btn');

let seatsNum = 0;
let total = 0;
let ticketPrice = +movieSelect.value;
console.log('TICKET VALUE IS: ' + movieSelect.value);
let movieObj;

const getMovie = (id) => {
  console.log('Getting the movie for ' + id);
  //FETCH DATA FROM API
  fetch(`${url}/movie/${id}?api_key=${myAPIKey}`)
    .then(response => {
      console.log('Your response is ' + response);
      if (response.status !== 200) {
        return `ERROR your server response is ${response}`;
      }
      response.json().then(data => {
        if (!Array.isArray(data)) data = [data];
        console.log(data);

        for (let movie of data) {
          let poster = movie.poster_path;
          let title = movie.title;
          let runtime = movie.runtime;
          populatePage(poster, title, runtime);
        }
      })

        .catch(error => {
          console.log(`We have some error ${error}`);
        })
    })
}

getMovie(movieID);

const populatePage = (poster, title, runtime) => {
  movieSelect.innerHTML = `<img class="poster" src="https://image.tmdb.org/t/p/w500${poster}" alt="" srcset="">` +
    `<div class="text-movie">` +
    `<h1 class="movieTitle">${title}</h1>` +
    `<p class="runtime">Runtime: ${runtime} min</p>` +
    `<p class="overview">Please select your seats</p>` +
    `</div>`;

}

console.log("starting for the movie title ", movieSelect.value); //value = the option value of <select> tag

//#1 when the page is loaded ==> display the current seat map with the appropreage status
window.addEventListener("DOMContentLoaded", function () {
  //get local storage data
  let movieObj = JSON.parse(localStorage.getItem("movieObj"));
  console.log("current local storage is ", movieObj);

  //for the very first time, local storage is null
  if (movieObj === null) {
    localStorage.setItem('movieObj', JSON.stringify({
      movieTitle: movieSelect.value,
      movieId: movieID,
      movieIndexOfSelectedSeats: [10]
    }));
  }
  console.log(seats);

  //for the already-booked seats: change the seat color to red
  //add class "seat-occupied"
  //which seats should I change? --> look at the "movieIndexOfSelectedSeats" :D
  //loop all the "seats (defined in line 31)"

  //**** only when the index is NOT null
  if (movieObj.movieIndexOfSelectedSeats !== []) {
    console.log("seats index needs to be kept occupied are... ", movieObj.movieIndexOfSelectedSeats)
    for (let i = 0; i < seats.length; i++) {
      //check all the element of index array and if it is the same index as "seats" index (i), add a class.
      movieObj.movieIndexOfSelectedSeats.map((index) => {
        if (i === index) {
          seats[i].classList.add("seat-occupied");
        }
      })
    }
  }

});

//#2. when the seat is selected 
//==>update the local storage
//==> count up the seat number and calculate the total price

container.addEventListener('click', (seat) => {
  if (seat.target.classList.contains('seat') && !seat.target.classList.contains('seat-occupied')) {
    //When the seat is selected, change the color to green(selected)
    seat.target.classList.toggle('seat-selected'); //change color to green
    updateSelectedCount();
  }
});

// Update local storage
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.seat-selected'); //get all selected seats

  //========================================== Current Storage ===================================== */
  //get current local storage data
  let movieObj = JSON.parse(localStorage.getItem("movieObj"));
  console.log("before update the local storage", movieObj);
  //========================================== Current Storage ===================================== */

  //=========================== Going to update Storage ============================ */
  // Copy selected seat into an array 
  // Map through the array
  // Return a new array indexes
  const seatsIndex = [...selectedSeats].map((seat) => {
    return [...seats].indexOf(seat);
  })
  console.log("index needs to be added is ", seatsIndex); //array

  //add the index of newly selected seat
  for (let i = 1; i < seatsIndex.length; i++) {
    movieObj.movieIndexOfSelectedSeats.push(seatsIndex[i]);
  };

  console.log("a new movieObj is", movieObj);

  //set the object into localstorage
  localStorage.setItem('movieObj', JSON.stringify(movieObj));
  //=========================== Update done!! ============================ */


  //display the seat num and total price
  const selectedSeatsCount = selectedSeats.length - 1;
  seatsNum = selectedSeatsCount;
  total = selectedSeatsCount * ticketPrice;
  //html append
  text.innerHTML = `You have selected ${seatsNum} seats for a price of $ ${total}.`;
};

buyBtn.addEventListener('click', function () {
    updateSelectedCount();
    location.reload();
});