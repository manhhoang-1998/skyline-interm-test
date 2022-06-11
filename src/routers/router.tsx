import DadJokes from "page/DadJokes/DadJokes";
import Github from "page/Github/Github";
import Home from "page/home/Home";
import TodoList from "page/TodoList/TodoList";
import Movies from "page/Movies/Movies";
import Pokedex from "page/Pokedex/Pokedex";
import WhereInTheWorld from "page/WhereInTheWorld/WhereInTheWorld";
import TourApp from "page/TourApp/TourApp";

export const ROUTE_LIST = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/todo",
    element: <TodoList />,
  },
  {
    path: "/dadjokes",
    element: <DadJokes />,
  },
  {
    path: "/github",
    element: <Github />,
  },
  {
    path: "/movies",
    element: <Movies />,
  },
  {
    path: "/pokedex",
    element: <Pokedex />,
  },
  {
    path: "/world",
    element: <WhereInTheWorld />,
  },
  {
    path: "/tourapp",
    element: <TourApp />,
  },
];
