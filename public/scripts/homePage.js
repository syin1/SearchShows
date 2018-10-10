// API KEY variable.
const API_KEY = config.API_KEY;

// Todays date.
let today = new Date().toJSON().slice(0, 10);
// Setting the maximum(end) date. This is not dynamic. Looking for solution.
let endDate = new Date(2019, 4, 17 + 1).toJSON().slice(0, 10);

window.onload = function featuredMovies() {
  // Random page number generator for popular movies and tv shows.
  let minPopular = 1;
  let maxPopular = 7;
  minPopular = Math.ceil(minPopular);
  maxPopular = Math.floor(maxPopular);
  let popular =
    Math.floor(Math.random() * (maxPopular - minPopular + 1)) + minPopular;

  // POPULAR MOVIES.
  axios
    .get(
      'https://api.themoviedb.org/3/discover/movie?api_key=' +
        API_KEY +
        '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=' +
        popular +
        '&primary_release_date.gte=2017-12-01&primary_release_date.lte=' +
        today +
        '&vote_average.gte=6&vote_average.lte=10&with_original_language=en'
    )
    .then(response => {
      const featured = response.data.results;
      console.log(featured);
      featured.length = 8;
      let output = '';
      for (let i = 0; i < featured.length; i++) {
        output += `
                <div class="card">
                    <div class="overlay">
                        <div class="movie">
                            <h2>${featured[i].title}</h2>
                            <p id="p_rating"><strong>Rating:</strong> <span>${
                              featured[i].vote_average
                            } / 10  <i class="material-icons star">star_rate</i></span> </p>
                            <p><strong>Release date:</strong> <span>${
                              featured[i].release_date
                            } <i class="material-icons date">date_range</i> </span></p>
                            <a onclick="movieSelected('${
                              featured[i].id
                            }')" href="#">Details</a>
                        </div>
                    </div>
                    <img src="http://image.tmdb.org/t/p/w400/${
                      featured[i].poster_path
                    }" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
                </div>
                `;
        let featuredOutput = document.getElementById('movies');
        featuredOutput.innerHTML = output;
      }
    });

  // POPULAR TV SHOWS.
  axios
    .get(
      'https://api.themoviedb.org/3/tv/popular?api_key=' +
        API_KEY +
        '&language=en-US&page=' +
        popular
    )
    .then(response => {
      const shows = response.data.results;
      shows.length = 8;
      console.log(shows);
      let output = '';
      for (let i = 0; i < shows.length; i++) {
        output += `
                    <div class="card">
                        <div class="overlay">
                        <div class="movie">
                                <h2>${shows[i].name}</h2>
                                <p id="p_rating"><strong>Rating:</strong> <span>${
                                  shows[i].vote_average
                                } / 10  <i class="material-icons star">star_rate</i></span> </p>
                                <p><strong>First air date:</strong> <span>${
                                  shows[i].first_air_date
                                } <i class="material-icons date">date_range</i> </span></p>
                                <a onclick="showSelected('${
                                  shows[i].id
                                }')" href="#">Details</a>
                        </div>
                        </div>
                        <img src="http://image.tmdb.org/t/p/w400/${
                          shows[i].poster_path
                        }" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
                    </div>`;
      }
      const popularShows = document.getElementById('tvShows');
      popularShows.innerHTML = output;
    });

  // NOW PLAYING MOVIES
  axios
    .get(
      'https://api.themoviedb.org/3/movie/now_playing?api_key=' +
        API_KEY +
        '&language=en-US&page=1&region=US'
    )
    .then(response => {
      let nowPlaying = response.data.results;
      nowPlaying.length = 8;
      let output = '';
      for (let i = 0; i < nowPlaying.length; i++) {
        output += `
                    <div class="card">
                        <div class="overlay">
                            <div class="movie">
                                <h2>${nowPlaying[i].title}</h2>
                                <p id="p_rating"><strong>Rating:</strong> <span>${
                                  nowPlaying[i].vote_average
                                } / 10  <i class="material-icons star">star_rate</i></span> </p>
                                <p><strong>Release date:</strong> <span>${
                                  nowPlaying[i].release_date
                                } <i class="material-icons date">date_range</i> </span></p>
                                <a onclick="movieSelected('${
                                  nowPlaying[i].id
                                }')" href="#">Details</a>
                            </div>
                        </div>
                        <img src="http://image.tmdb.org/t/p/w400/${
                          nowPlaying[i].poster_path
                        }" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
                    </div>`;
      }
      const nowPlayingOutput = document.getElementById('nowPlaying');
      nowPlayingOutput.innerHTML = output;
    });
};
// Popular movies slider
const slider = document.querySelectorAll('.scroll');
let isDown = false;
let startX;
let scrollLeft;

slider.forEach(scroll =>
  scroll.addEventListener('mousedown', e => {
    isDown = true;
    startX = e.pageX - scroll.offsetLeft;
    scrollLeft = scroll.scrollLeft;
    e.preventDefault();
  })
);

slider.forEach(scroll =>
  scroll.addEventListener('mouseup', () => {
    isDown = false;
  })
);

slider.forEach(scroll =>
  scroll.addEventListener('mouseleave', e => {
    scroll.classList.remove('active');
    isDown = false;
  })
);

slider.forEach(scroll =>
  scroll.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scroll.offsetLeft;
    const walk = x - startX;
    scroll.scrollLeft = scrollLeft - walk;
  })
);
//Takes you to detailed info page.
function movieSelected(id) {
  sessionStorage.setItem('movieId', id);
  location.replace('movie-page.html');
  return false;
} //Takes you to detailed tv shows info page.
function showSelected(id) {
  sessionStorage.setItem('showId', id);
  location.replace('shows-page.html');
  return false;
}
// Smooth scroll to about section
document.getElementById('aboutLink').addEventListener('click', () => {
  document.getElementById('aboutSection').scrollIntoView({
    behavior: 'smooth'
  });
});
