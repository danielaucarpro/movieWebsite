const searchBtn = document.getElementById('link-btn');
const searchInput = document.getElementById('search');
let value = searchInput.innerText;
console.log(value);

//SEARCH
const multiSearch = (value) => {
    // console.log('Getting the movie genres ');
    //FETCH DATA FROM API
    fetch(`${url}/search/multi?api_key=${myAPIKey}&language=en-US&page=1&include_adult=true&query=${value}`)
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
                    showMultiSearch(poster, id);
                    addIDToURL(id);
                }
            })
                .catch(error => {
                    console.log(`We have some error ${error}`);
                })
        })
}

//ADD A EVENT LISTENER

searchBtn.addEventListener('click', function () {
    console.log(searchInput.innerText);
    searchInput.innerText = value;
    console.log(value);
    multiSearch(value);
    // document.body.innerHTML = '';
});

//TRIGGER MULTISEARCH FETCH WITH EVENT LISTENER AND PASS INNER TEXT AS A VALUE
// const triggerSearch = () => {
//     let value = searchBtn.innerText;
//     console.log(value);
//     multiSearch(value);
//     document.body.innerHTML = '';
// }

const showMultiSearch = (poster, id) => {
    //append a link which contains a image with the poster link
    // console.log("Hello! Stay a while and listen!");
    document.body.innerHTML += `<a onclick= "addIDToURL(${id})" href="#" class="col" id="${id}">` +
        `<img class="img" src="https://image.tmdb.org/t/p/w500${poster}" alt="" srcset=""></img>` +
        `</a>`;
}

function addIDToURL(id) {
    // `./index.html?movieId=${id}`;
    window.open(`./detail.html?movieId=${id}`);
}