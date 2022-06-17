import { Route, Routes } from "react-router-dom";
import { ROUTE_LIST } from "./routers/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

function App() {
  const theme = useSelector((state: RootState) => state.theme);
  useEffect(() => {
    const themeSeting = localStorage.getItem("theme");
    document
      .getElementsByTagName("html")[0]
      .setAttribute("data-theme", `${themeSeting}`);
  }, [theme]);

  return (
    <div className="App">
      <Routes>
        {ROUTE_LIST.map((item, index) => (
          <Route key={index} path={item.path} element={item.element}></Route>
        ))}
      </Routes>
    </div>
  );
}

export default App;
