import { useState } from "react";
import { jokeApi } from "../services/dadJokesApi";

interface IHook {
  jokeContent: string;
  getJoke: () => void;
}
export const useHook = (): IHook => {
  const [jokeContent, setJokeContent] = useState("");

  const getJoke = async () => {
    try {
      const response = await jokeApi.getData();
      setJokeContent(response.data.attachments[0].text);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    jokeContent,
    getJoke,
  };
};
