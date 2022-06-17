import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { onChangeTheme } from "redux/slice/themeSlice";
import "./WorldHeader.scss";

function WorldHeader() {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme);

  return (
    <div className="world-header">
      <div className="world-header-wrap">
        <span className="world-header-wrap__title">Where is the World?</span>
        <label htmlFor="theme" className="world-header-wrap__theme">
          <i className="world-header-wrap__theme-icon fa-solid fa-circle-half-stroke"></i>
          Theme
        </label>
        <button
          id="theme"
          style={{ display: "none" }}
          onClick={() => onChangeTheme(dispatch, theme)}
        ></button>
      </div>
    </div>
  );
}

export default WorldHeader;
