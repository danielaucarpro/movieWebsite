//FETCHING MOVIE API
//MY API
const url = 'https://api.themoviedb.org/3';
const myAPIKey = '57e818a124323472d87df0007c4cd0ca';
//GETING ID FROM URL
const urlParams = new URLSearchParams(window.location.search);
const movieID = urlParams.get('movieId');
//GENRES
const actionDiv = document.getElementById('action');
const animationDiv = document.getElementById('animation');
const comedyDiv = document.getElementById('comedy');
//DOM
const popularDiv = document.getElementById('popular');
const latestDiv = document.getElementById('latest');
const banner = document.getElementById('carousel');
const col = document.querySelectorAll('.col');
//SEARCH
// const searchBtn = document.getElementById('link-btn');
const searchResult = document.getElementById('search');

//GET MOVIE FETCH DATA
// const getMovie = (movie) => {
//     console.log('Getting the movie for ' + movie);
//     //FETCH DATA FROM API
//     fetch(`${url}/movie/${movie}?api_key=${myAPIKey}`)
//         .then(response => {
//             console.log('Your response is ' + response);
//             if (response.status !== 200) {
//                 return `ERROR your server response is ${response}`;
//             }
//             response.json().then(data => {
//                 if (!Array.isArray(data)) data = [data];
//                 console.log(data);
//             })

//                 .catch(error => {
//                     console.log(`We have some error ${error}`);
//                 })
//         })
// }

// getMovie('500');


const nowPlaying = () => {
    //FETCH DATA FROM API
    fetch(`${url}/movie/now_playing?api_key=${myAPIKey}&language=en-US`)
        .then(response => {
            if (response.status !== 200) {
                return `ERROR your server response is ${response}`;
            }
            response.json().then(data => {
                if (!Array.isArray(data)) data = [data];
                console.log('YOU PLAYING NOW MOVIES');
                console.log(data);

                for (i = 0; i < 4; i++) {
                    // console.log("Hello!");
                    let backdrop = data[0].results[i].backdrop_path;
                    let title = data[0].results[i].title;
                    let score = data[0].results[i].vote_average;
                    showBackdrop(backdrop, title, score);
                }
            })

                .catch(error => {
                    console.log(`We have some error ${error}`);
                })
        })
}

//LATEST MOVIES
const latestMovies = () => {
    //FETCH DATA FROM API
    fetch(`${url}/movie/top_rated?api_key=${myAPIKey}&language=en-US&page=1`)
        .then(response => {
            if (response.status !== 200) {
                return `ERROR your server response is ${response}`;
            }
            response.json().then(data => {
                if (!Array.isArray(data)) data = [data];
                console.log('YOUR LATEST MOVIES');
                console.log(data);

                for (i = 0; i < 14; i++) {
                    // console.log("Hello!");
                    let poster = data[0].results[i].poster_path;
                    let id = data[0].results[i].id
                    showLatest(poster, id);
                }
            })

                .catch(error => {
                    console.log(`We have some error ${error}`);
                })
        })
}

//GET POPULAR MOVIES
const getPopularMovies = () => {
    //FETCH DATA FROM API
    fetch(`${url}/movie/popular?api_key=${myAPIKey}&language=en-US&sort_by=popularity.desc&page=7`)
        .then(response => {
            if (response.status !== 200) {
                return `ERROR your server response is ${response}`;
            }
            response.json().then(data => {
                if (!Array.isArray(data)) data = [data];
                console.log('YOU POPULAR MOVIES');
                console.log(data);

                for (i = 0; i < 14; i++) {
                    // console.log("Hello!");
                    let poster = data[0].results[i].poster_path;
                    let id = data[0].results[i].id;
                    let backdrop = data[0].results[i].backdrop_path;
                    showPopularMovies(poster, id);
                }
            })

                .catch(error => {
                    console.log(`We have some error ${error}`);
                })
        })
}

//GETTING MOVIES FROM GENRE
const getMoviesFromGenre = (genre) => {
    // console.log('Getting the movie genres ');
    //FETCH DATA FROM API
    fetch(`${url}/discover/movie?api_key=${myAPIKey}&language=en-US&with_genres=${genre}&page=3`)
        .then(response => {
            if (response.status !== 200) {
                return `ERROR your server response is ${response}`;
            }
            //converting response into json and checking if it is an array
            response.json().then(data => {
                //if data is not an array than convert it to array
                if (!Array.isArray(data)) data = [data];
                console.log('YOU MOVIES OF YOUR GENRE ARE');
                console.log(data);
                // let length = data.lenght;
                // console.log(length);

                //for each movie poster in data, send poster path to showActionMovies function
                for (i = 0; i < 14; i++) {
                    // console.log("Hello!");
                    let poster = data[0].results[i].poster_path;
                    let id = data[0].results[i].id
                    showActionMovies(poster, id);
                    addIDToURL(id);
                }
            })
                .catch(error => {
                    console.log(`We have some error ${error}`);
                })
        })
}

const getAnimationMovies = (genre) => {
    // console.log('Getting the movie genres ');
    //FETCH DATA FROM API
    fetch(`${url}/discover/movie?api_key=${myAPIKey}&language=en-US&with_genres=${genre}&page=1`)
        .then(response => {
            if (response.status !== 200) {
                return `ERROR your server response is ${response}`;
            }
            //converting response into json and checking if it is an array
            response.json().then(data => {
                //if data is not an array than convert it to array
                if (!Array.isArray(data)) data = [data];
                console.log('YOU MOVIES OF YOUR GENRE ARE');
                console.log(data);
                // let length = data.lenght;
                // console.log(length);

                //for each movie poster in data, send poster path to showActionMovies function
                for (i = 0; i < 14; i++) {
                    // console.log("Hello!");
                    let poster = data[0].results[i].poster_path;
                    let id = data[0].results[i].id
                    showAnimationMovies(poster, id);
                    addIDToURL(id);
                }
            })
                .catch(error => {
                    console.log(`We have some error ${error}`);
                })
        })
}

const getComedyMovies = (genre) => {
    // console.log('Getting the movie genres ');
    //FETCH DATA FROM API
    fetch(`${url}/discover/movie?api_key=${myAPIKey}&language=en-US&with_genres=${genre}&page=4`)
        .then(response => {
            if (response.status !== 200) {
                return `ERROR your server response is ${response}`;
            }
            //converting response into json and checking if it is an array
            response.json().then(data => {
                //if data is not an array than convert it to array
                if (!Array.isArray(data)) data = [data];
                console.log('YOU MOVIES OF YOUR GENRE ARE');
                console.log(data);
                // let length = data.lenght;
                // console.log(length);

                //for each movie poster in data, send poster path to showActionMovies function
                for (i = 0; i < 14; i++) {
                    // console.log("Hello!");
                    let poster = data[0].results[i].poster_path;
                    let id = data[0].results[i].id
                    showComedy(poster, id);
                    addIDToURL(id);
                }
            })
                .catch(error => {
                    console.log(`We have some error ${error}`);
                })
        })
}

// console.log("Hello! Stay a while and listen!");
nowPlaying();
latestMovies();
getPopularMovies();
getMoviesFromGenre('28');
getAnimationMovies('16');
getComedyMovies('35');

//APPEND BACKDROPS IMGS INSIDE BANNER 
const showBackdrop = (backdrop, title, score) => {
    banner.innerHTML +=
        `<div class="carousel-item">` +
        `<img src="https://image.tmdb.org/t/p/original${backdrop}" class="d-block w-100" alt="...">` +
        `<div id="carousel-txt" class="carousel-caption d-none d-md-block">` +
        `<h1>${title}</h1>` +
        `<p id="score-text">Movie Score: ${score}.</p>` +
        `</div>` +
        `</div>`;
}

//SHOW LATEST MOVIES IN WEB PAGE
const showLatest = (poster, id) => {
    //append a link which contains a image with the poster link
    // console.log("Hello! Stay a while and listen!");
    latestDiv.innerHTML += `<a onclick= "addIDToURL(${id})" href="#" class="col" id="${id}">` +
        `<img class="img" src="https://image.tmdb.org/t/p/w500${poster}" alt="" srcset=""></img>` +
        `</a>`;
}

//SHOW POPULAR MOVIES IN WEB PAGE
const showPopularMovies = (poster, id) => {
    //append a link which contains a image with the poster link
    // console.log("Hello! Stay a while and listen!");
    popularDiv.innerHTML += `<a onclick= "addIDToURL(${id})" href="#" class="col" id="${id}">` +
        `<img class="img" src="https://image.tmdb.org/t/p/w500${poster}" alt="" srcset=""></img>` +
        `</a>`;
}

//upload the movie poster inside the html
const showActionMovies = (poster, id) => {
    //append a link which contains a image with the poster link
    // console.log("Hello! Stay a while and listen!");
    actionDiv.innerHTML += `<a onclick= "addIDToURL(${id})" href="#" class="col" id="${id}">` +
        `<img class="img" src="https://image.tmdb.org/t/p/w500${poster}" alt="" srcset=""></img>` +
        `</a>`;
}

const showAnimationMovies = (poster, id) => {
    //append a link which contains a image with the poster link
    // console.log("Hello! Stay a while and listen!");
    animationDiv.innerHTML += `<a onclick= "addIDToURL(${id})" href="#" class="col" id="${id}">` +
        `<img class="img" src="https://image.tmdb.org/t/p/w500${poster}" alt="" srcset=""></img>` +
        `</a>`;
}

const showComedy = (poster, id) => {
    comedyDiv.innerHTML += `<a onclick= "addIDToURL(${id})" href="#" class="col" id="${id}">` +
    `<img class="img" src="https://image.tmdb.org/t/p/w500${poster}" alt="" srcset=""></img>` +
    `</a>`;
}

function addIDToURL(id) {
    // `./index.html?movieId=${id}`;
    window.open(`./detail.html?movieId=${id}`);
}

// let value = searchResult.innerText;
// searchBtn.addEventListener('click', function(value){
//     window.open(`./search.html?search=${value}`);
// });