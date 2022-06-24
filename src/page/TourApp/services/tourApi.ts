import axios from "axios";

const URL = " https://62a00597a9866630f80561eb.mockapi.io/v1/tour";

export const getTour = () => axios.get(URL);
