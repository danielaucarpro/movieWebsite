//FETCHING MOVIE API

const url = 'https://api.themoviedb.org/3/movie/';
const myAPIKey = '?api_key=57e818a124323472d87df0007c4cd0ca';

console.log(url);
//GET MOVIE FETCH DATA
const getMovie = (movie) => {
    console.log('Getting the movie for ' + movie);
    //FETCH DATA FROM API
    fetch(`${url}${movie}${myAPIKey}`)
        .then(response => {
            console.log('Your response is ' + response);
            if (response.status !== 200) {
                return `ERROR your server response is ${response}`;
            }
            response.json().then(data => {
                if (!Array.isArray(data)) data = [data];
                console.log(data);
            })

                .catch(error => {
                    console.log(`We have some error ${error}`);
                })
        })
}

getMovie("500");


const getData = () => {
    for (let movie of movieData) {
        //RATING
        let isForAdult = movie.adult;
        //IMAGES
        let poster = movie.poster_path;
        let backImg = movie.backdrop_path;
        //GENRE
        let genre = movie.genres[0];
        let id = movie.id;
        let originalLanguage = movie.original_language;
        let originalTitle = movie.original_title;
        let title = movie.title;
        //OVERVIEW
        let overviewText = movie.overview;
        let tag = movie.tagline;
        let popularity = movie.popularity;
        //COMPANY
        let company = movie.production_companies;
        //ASK LATER 
        let companyLogo = company[1].logo_path;
        let companyName = company[1].name;
        //RELEASE DATE 
        let releaseDate = movie.release_date;
        //RUNTIME
        let runtime = movie.runtime;
        //AUDIO
        let audio = movie.spoken_languages[0];
        //SCORE
        let movieScore = movie.vote_average;
        let voteCount = movie.vote_count;
        console.log(overviewText);
    }
}