import axios from "axios";

export const getMoviesData = () =>
  axios.get("https://62a00597a9866630f80561eb.mockapi.io/v1/movies");
