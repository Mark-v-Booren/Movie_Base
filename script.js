

const radioBtns = document.getElementsByName('radio');
const resetBtn = document.getElementById('reset');
const searchBar = document.getElementById('searchbar');
const movieList = document.querySelector('#movie-list');
const latestMovies = 2014;

const addMoviesToDom = (allmovies) => {
    const listItems = allmovies.map(movie => {
        const item = document.createElement('li');
        item.classList.add("main__list-li")
        item.innerHTML = `<a class="main__list-li__a" href="http://www.imdb.com/title/${movie.imdbID}" target="_blank">
        <img class="main__list-li__img" src ="${movie.Poster}"></img></a>`;
        return item;
    });
    listItems.forEach(movie => {
        movieList.append(movie);
    });
};
addMoviesToDom(allmovies)

const addEventListeners = () => {
    radioBtns.forEach(radio => {
        radio.addEventListener('change', (event) => {
            handleOnChangeEvent(event.target.id)
        });
    });
    resetBtn.addEventListener('click', () => {
        reset();
        searchBar.value = '';
        addMoviesToDom(allmovies);
    });
    searchBar.addEventListener('keyup', (event) => {
        handleOnChangeEvent(event.target.value.toLowerCase());
    });
};

addEventListeners(radioBtns, resetBtn, searchBar);

const handleOnChangeEvent = (event) => {
    let filteredMovies = allmovies
    switch (event) {
        case 'X-Men':
        case 'Avengers':
        case 'Princess':
        case 'Batman':
            filteredMovies = allmovies.filter(movie => movie.Title.includes(event));
            break;
        case 'New-Movies':
            filteredMovies = allmovies.filter(movie => movie.Year > latestMovies);
            break;
        default:
            filteredMovies = allmovies.filter(movie => movie.Title.toLowerCase().includes(event));
    }
    reset();
    addMoviesToDom(filteredMovies);
}

const reset = () => {
    movieList.innerHTML = '';
};

