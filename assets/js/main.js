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
