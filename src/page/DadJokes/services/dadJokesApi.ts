import axios from "axios";

const URL = "https://icanhazdadjoke.com/slack";

export const jokeApi = {
  getData: () => axios.get(URL),
};
