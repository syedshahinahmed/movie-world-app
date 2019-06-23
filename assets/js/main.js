$(document).ready(() => {
  // alert(1);
  $("#searchForm").on("submit", e => {
    let searchText = $("#searchText").val();
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText) {
  axios
    .get("https://www.omdbapi.com/?s=" + searchText + "&apikey=bfae7d3")
    .then(res => {
      console.log(res);
      let movies = res.data.Search;
      let output = "";
      $.each(movies, (index, movie) => {
        output += `
                  <div class="col-md-4 ">
                      <div class="card mb-3">
                          <img class="card-img-top" src="${
                            movie.Poster
                          }" alt="Sorry Img Not Available At The Moment" style="border-radius: 5px">
                          <div class="card-body">
                              <h5 class="card-title text-center">${
                                movie.Title
                              }</h5>
                              <a onclick="movieSelected('${
                                movie.imdbID
                              }')" class="btn btn-primary d-flex text-center justify-content-center" href="#">Movie Deails</a>
                          </div>
                      </div>
              </div>
          `;
      });

      $("#movies").html(output);
    })
    .catch(err => {
      console.log(err);
    });
}

function movieSelected(id) {
  sessionStorage.setItem("movieID", id);
  window.location = "movie_info.html";
  return false;
}

function getMovie() {
  let movieID = sessionStorage.getItem("movieID");

  axios
    .get("https://www.omdbapi.com/?i=" + movieID + "&apikey=bfae7d3")
    .then(res => {
      console.log(res);
      console.log(res.data.Plot);
      let movie = res.data;
      let output = `
                  <div class="row">
                      <div class="col-md-4">
                          <img src="${
                            movie.Poster
                          }" class="img-fluid rounded mx-auto d-block">
                      </div>
  
                      <div class="col-md-8">
                          <h2>${movie.Title}</h2>
                          <div class="list-group">
                              <a href="#" class="list-group-item list-group-item-action"><strong>Genre:</strong> ${
                                movie.Genre
                              }</a>
                              <a href="#" class="list-group-item list-group-item-action list-group-item-primary"><strong>Released:</strong>
                                  ${movie.Released}</a>
                              <a href="#" class="list-group-item list-group-item-action list-group-item-secondary"><strong>Rated:</strong>
                                  ${movie.Rated}</a>
                              <a href="#" class="list-group-item list-group-item-action list-group-item-success"><strong>IMDB Rating:</strong>
                                  ${movie.imdbRating}</a>
                              <a href="#" class="list-group-item list-group-item-action list-group-item-danger"><strong>Rotten Tomatoes
                                      Rating:</strong> ${
                                        movie.Ratings[1].Value
                                      }</a>
                              <a href="#" class="list-group-item list-group-item-action list-group-item-warning"><strong>Production:</strong>
                                  ${movie.Production}</a>
                              <a href="#" class="list-group-item list-group-item-action list-group-item-info"><strong>Director:</strong>
                                  ${movie.Director}</a>
                              <a href="#" class="list-group-item list-group-item-action list-group-item-light"><strong>Writer:</strong>
                                  ${movie.Writer}</a>
                              <a href="#" class="list-group-item list-group-item-action list-group-item-dark"><strong>Actors:</strong>
                                  ${movie.Actors}</a>
                          </div>
                      </div>
  
                  </div>
  
                  <div class="row mt-3 mb-3">
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"> 
                          <p class="h4">${movie.Plot}</p>
                          <hr class="bg-info">
                          <a href="http://imdb.com/title/${
                            movie.imdbID
                          }" target="_blank" class="btn btn-success">View IMDB</a>
                          <a href="index.html" class="btn btn-info float-right">Go Back To Search</a>
                      </div>
                  </div>
              
              `;

      $("#movieInfo").html(output);
    })
    .catch(err => {
      console.log(err);
    });
}
