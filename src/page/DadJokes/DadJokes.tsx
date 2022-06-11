import ComeBack from "component/comeback/ComeBack";
import { FC } from "react";
import "./DadJokes.scss";
import { useHook } from "./hook/useHook";

const DadJokes: FC = () => {
  const { jokeContent, getJoke } = useHook();

  return (
    <div className="jokes-page">
      <ComeBack />
      <div className="jokes-container">
        <span className="jokes-notify">Don't Laugh Challenge</span>
        <p className="jokes-content"> {jokeContent}</p>
        <button className="jokes-btn" onClick={() => getJoke()}>
          Get Another Joke
        </button>
      </div>
    </div>
  );
};

export default DadJokes;
