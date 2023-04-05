const API_KEY = `api_key=b16ef70f8cdae15511e9ae44cd65aac7`;
const base_url = 'https://api.themoviedb.org/3';
const api_url = base_url+'/discover/movie?sort_by=popularity.desc&'+API_KEY;
const img_url = 'https://image.tmdb.org/t/p/w500';
const searchURL = base_url+'/search/movie?'+API_KEY;

const main = document.getElementById('main');
const form = document.getElementById('form');
const searchText = document.getElementById('search');

getMovies(api_url);

function getMovies(url) {
    fetch(url).then(response => response.json())
    .then(card => {
        displayMovies(card.results);
    })
}

function displayMovies(card) {
    main.innerHTML = '';

    card.forEach(movie => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <a href="${img_url+movie.poster_path}"> <img src="${img_url+movie.poster_path}" alt="${movie.title}"> </a>
            <div class="movie_info">
                <h3>${movie.title}</h3>
                <h4> ${movie.release_date.slice(0, 4)} </h4>
                <span class="${getColor(movie.vote_average)}">${Number(movie.vote_average.toFixed(1))}</span>
            </div>
        `
        main.appendChild(movieEl);
    })
}
 //VOTE
function getColor(vote) {
    if(vote > 7){
        return 'green'
    }else if(vote > 5){
        return "blue"
    }else{
        return 'red'
    }
}
//SEARCH
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;
    if(searchTerm) {
        getMovies(searchURL+'&query='+searchTerm);
        search.value = "";
    }
    }
)