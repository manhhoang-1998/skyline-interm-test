import axios from "axios";

const URL = "https://62a00597a9866630f80561eb.mockapi.io/v1/pokedex";
export const getPokeData = () => axios.get(URL);
