import axios from "axios";

export async function getMovies() {
  const data = await axios
    .get("https://5f50ca542b5a260016e8bfb0.mockapi.io/api/v1/movies")
    .then(function (res) {
      return res.data;
    })
    .catch(function (error) {
      console.error(error);
      throw new Error("Failed to fetch API - data");
    });

  return data;
}

export async function getMovieDetails(id) {
  const data = await axios
    .get(`https://5f50ca542b5a260016e8bfb0.mockapi.io/api/v1/movies/${id}`)
    .then(function (res) {
      return res.data;
    })
    .catch(function (error) {
      console.error(error);
      throw new Error("Failed to fetch API - details");
    });

  return data;
}
