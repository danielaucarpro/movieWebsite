//VARIABLES

//MY API
const url = 'https://api.themoviedb.org/3';
const myAPIKey = '57e818a124323472d87df0007c4cd0ca';
//GETING ID FROM URL
const urlParams = new URLSearchParams(window.location.search);
const movieID = urlParams.get('movieId');
console.log(movieID);
//DOM
const backdropPoster = document.getElementById('poster');
const movieTitle = document.getElementById('title-container');
const detailLine = document.getElementById('details-line');
const overviewContainer = document.getElementById('overview');
const specs = document.getElementById('data-container');
const trailer = document.getElementById('trailer');
const related = document.getElementById('related');
//BUTTON
const btn = document.getElementById('buy-btn');

//GET THE MOVIE ID FROM INDEX

//GET MOVIE CREDITS
const getMovieCredits = (id) => {
    console.log('Getting the movie for ' + id);
    //FETCH DATA FROM API
    fetch(`${url}/movie/${id}/credits?api_key=${myAPIKey}&language-en-US`)
        .then(response => {
            console.log('Your response is ' + response);
            if (response.status !== 200) {
                return `ERROR your server response is ${response}`;
            }
            response.json().then(data => {
                if (!Array.isArray(data)) data = [data];
                console.log(data);

                for (let credits of data) {
                    let director = credits.crew[0].name;
                    let cast = credits.cast[0].name;
                    let cast1 = credits.cast[1].name;
                    let cast2 = credits.cast[2].name;
                    populateCredits(director, cast, cast1, cast2);
                }
            })

                .catch(error => {
                    console.log(`We have some error ${error}`);
                })
        })
}

//GET MOVIE DATA    
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
                    let backdrop = movie.backdrop_path;
                    let title = movie.title;
                    let runtime = movie.runtime;
                    let releaseDate = movie.release_date;
                    let overview = movie.overview;
                    let genre = movie.genres[0].name;
                    let audio = movie.spoken_languages[0].english_name
                    populatePage(backdrop, title, runtime, releaseDate, overview, genre, audio);
                }
            })

                .catch(error => {
                    console.log(`We have some error ${error}`);
                })
        })
}

//GET MOVIE TRAILER
const getMovieTrailer = (id) => {
    console.log('Getting the movie for ' + id);
    //FETCH DATA FROM API
    fetch(`${url}/movie/${id}/videos?api_key=${myAPIKey}&language-en-US`)
        .then(response => {
            console.log('Your response is ' + response);
            if (response.status !== 200) {
                return `ERROR your server response is ${response}`;
            }
            response.json().then(data => {
                if (!Array.isArray(data)) data = [data];
                console.log(data);

                for (let videos of data) {
                    let key = videos.results[0].key
                    showTrailer(key);
                }
            })

                .catch(error => {
                    console.log(`We have some error ${error}`);
                })
        })
}

//GET SIMILAR
const getSimilar = (id) => {
    console.log('Getting the movie for ' + id);
    //FETCH DATA FROM API
    fetch(`${url}/movie/${id}/similar?api_key=${myAPIKey}&language-en-US&page=2`)
        .then(response => {
            console.log('Your response is ' + response);
            if (response.status !== 200) {
                return `ERROR your server response is ${response}`;
            }
            response.json().then(data => {
                if (!Array.isArray(data)) data = [data];
                console.log(data);

                for (i = 0; i < 5; i++) {
                    let similarMovies = data[0].results[i].poster_path
                    let id = data[0].results[i].id
                    showSimilar(similarMovies, id);
                    // addIDToURL(id);
                }
            })

                .catch(error => {
                    console.log(`We have some error ${error}`);
                })
        })
}

getMovieCredits(movieID);
getMovie(movieID);
getMovieTrailer(movieID);
getSimilar(movieID);

const populateCredits = (director, cast, cast1, cast2) => {
    specs.innerHTML += `<p class="data">${director}</p>` +
        `<p class="data">${cast}, ${cast1} and ${cast2}</p>`;
}

const populatePage = (backdrop, title, runtime, releaseDate, overview, genre, audio) => {
    backdropPoster.innerHTML = `<img id="backdrop" src="https://image.tmdb.org/t/p/original${backdrop}" alt="" srcset=""></img>`;
    movieTitle.innerHTML = `<h2 id="title">${title}</h2>`;
    detailLine.innerHTML = `<div class="details">${runtime} min | Release date: ${releaseDate}</div>`;
    overviewContainer.innerHTML = `<p class="description">${overview}</p>`;
    specs.innerHTML += `<p class="data">${genre}</p>` +
        `<p class="data">${audio}</p>`;
}

const showTrailer = (key) => {
    trailer.innerHTML = `<iframe class="youtube" src="https://www.youtube.com/embed/${key}"></iframe>`
}

const showSimilar = (movies, id) => {
    related.innerHTML += `<a onclick= "addIDToURL(${id})" href="#" id="${id}">` +
    `<img class="similarIMG" src="https://image.tmdb.org/t/p/w500${movies}" alt="" srcset="">` +
    `</a>`;
}

function addIDToURL(id) {
    // `./index.html?movieId=${id}`;
    window.open(`./detail.html?movieId=${id}`);
}

btn.addEventListener('click', function (){
    addIDToURLTickets(movieID);
});

function addIDToURLTickets(id) {
    // `./index.html?movieId=${id}`;
    window.open(`./selectTicket.html?movieId=${id}`);
}