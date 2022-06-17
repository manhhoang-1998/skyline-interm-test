import axios from "axios";

const baseUrl = "https://restcountries.com/v3.1";

export const worldApi = {
  getAll: () => axios.get(`${baseUrl}/all`),
  getByName: (name: string) => axios.get(`${baseUrl}/name/${name}`),
  getByRegion: (region: string) => axios.get(`${baseUrl}/region/${region}`),
};
