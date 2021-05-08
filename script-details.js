//VARIABLES
const backdropPoster = document.getElementById('poster');
const movieTitle = document.getElementById('title-container');
const detailLine = document.getElementById('details-line');
const overviewContainer = document.getElementById('overview');
const specs = document.getElementById('data-container');

//GET THE MOVIE ID FROM INDEX

//POPULATE THE PAGE WITH DATA
const getMovie = (id) => {
    console.log('Getting the movie for ' + movie);
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
                    let genre = movie.genres[genres.length];
                    let audio = movie.spoken_lanuages[0].name;
                    populatePage(backdrop, title, runtime, releaseDate, overview, genre, audio);
                }
            })

                .catch(error => {
                    console.log(`We have some error ${error}`);
                })
        })
}

const populatePage = (backdrop, title, runtime, releaseDate, overview, genre, audio) => {
    backdropPoster.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${backdrop}" alt="" srcset=""></img>`;
    movieTitle.innerHTML = `<h2 id="title">${title}</h2>`;
    detailLine.innerHTML = `<div class="details">${runtime} ${releaseDate}</div>`;
    overviewContainer.innerHTML = `<p class="description">${overview}</p>`;
    specs.innerHTML = `<p class="data">Directors</p>` +
        `<p class="data">Directors</p>` +
        `<p class="data">Starring</p>` +
        `<p class="data">${genre}</p>` +
        `<p class="data">Subtitles</p>` +
        `<p class="data">${audio}</p>`;
}