import axios from "axios";

export const getUserData = (userName: string) =>
  axios.get(`https://api.github.com/users/${userName}`);

export const getProjectData = (userName: string) =>
  axios.get(`https://api.github.com/users/${userName}/repos?sort=created`);
