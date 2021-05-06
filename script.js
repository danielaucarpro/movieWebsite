//FETCHING MOVIE API

const url = 'https://api.themoviedb.org/3';
const myAPIKey = '57e818a124323472d87df0007c4cd0ca';
//DOM
const actionDiv = document.getElementById('action');
const col = document.querySelectorAll('.col');

//GET MOVIE FETCH DATA
const getMovie = (movie) => {
    console.log('Getting the movie for ' + movie);
    //FETCH DATA FROM API
    fetch(`${url}/movie/${movie}?api_key=${myAPIKey}`)
        .then(response => {
            console.log('Your response is ' + response);
            if (response.status !== 200) {
                return `ERROR your server response is ${response}`;
            }
            response.json().then(data => {
                if (!Array.isArray(data)) data = [data];
                console.log(data);
                console.log(response);
                return response;
            })

                .catch(error => {
                    console.log(`We have some error ${error}`);
                })
        })
}

const getPopularMovies = () => {
    console.log('Getting the movie genres ');
    //FETCH DATA FROM API
    fetch(`${url}/movie/popular?api_key=${myAPIKey}&language=en-US&page=1`)
        .then(response => {
            console.log('Your response for genre ' + response);
            if (response.status !== 200) {
                return `ERROR your server response is ${response}`;
            }
            response.json().then(data => {
                if (!Array.isArray(data)) data = [data];
                console.log('YOU POPULAR MOVIES');
                console.log(data);
            })

                .catch(error => {
                    console.log(`We have some error ${error}`);
                })
        })
}

getPopularMovies();

const showPopularMovies = (poster, id) => {
    //append a link which contains a image with the poster link
    console.log("Hello! Stay a while and listen!");
    actionDiv.innerHTML += `<a href="./detail.html" class="col" id="${id}">` +
        `<img class="img" src="https://image.tmdb.org/t/p/w500${poster}" alt="" srcset=""></img>` +
        `</a>`;
}

//Getting Movies from genre
const getMoviesFromGenre = (genre) => {
    // console.log('Getting the movie genres ');
    //FETCH DATA FROM API
    fetch(`${url}/discover/movie?api_key=${myAPIKey}&language=en-US&with_genres{${genre}}`)
        .then(response => {
            console.log('Your response for genre ' + response);
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
                    console.log("Hello!");
                    let poster = data[0].results[i].poster_path;
                    let id = data[0].results[i].id
                    showActionMovies(poster, id);
                }
            })
                .catch(error => {
                    console.log(`We have some error ${error}`);
                })
        })
}

getMoviesFromGenre('Action');

//upload the movie poster inside the html
const showActionMovies = (poster, id) => {
    //append a link which contains a image with the poster link
    console.log("Hello! Stay a while and listen!");
    actionDiv.innerHTML += `<a href="./detail.html" class="col" id="${id}">` +
        `<img class="img" src="https://image.tmdb.org/t/p/w500${poster}" alt="" srcset=""></img>` +
        `</a>`;
}