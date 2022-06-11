import { Route, Routes } from "react-router-dom";
import { ROUTE_LIST } from "./routers/router";
function App() {
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
