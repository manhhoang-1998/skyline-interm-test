import { Link } from "react-router-dom";
import "./Home.scss";

function Main() {
  return (
    <div className="page">
      <div className="heading">
        <Link className="heading-text" to="/">
          Home Page
        </Link>
      </div>
      <div className="container">
        <h1 className="title">Project List</h1>
        <ol className="list">
          <li>
            <Link className="item" to="/todo">
              Todo List
            </Link>
          </li>
          <li>
            <Link className="item" to="/dadjokes">
              Dad Jokes
            </Link>
          </li>
          <li>
            <Link className="item" to="/github">
              Github
            </Link>
          </li>
          <li>
            <Link className="item" to="/movies">
              Movies
            </Link>
          </li>
          <li>
            <Link className="item" to="/pokedex">
              Pokedex
            </Link>
          </li>
          <li>
            <Link className="item" to="/world">
              Where in the world ?
            </Link>
          </li>
          <li>
            <Link className="item" to="/tourapp">
              Tour app
            </Link>
          </li>
        </ol>
      </div>
    </div>
  );
}

export default Main;
