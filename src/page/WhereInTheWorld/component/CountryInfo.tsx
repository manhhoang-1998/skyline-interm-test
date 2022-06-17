import WorldHeader from "./WorldHeader";
import "./CountryInfo.scss";
import { useWorld } from "../hook/useWorld";
import { useEffect } from "react";

function CountryInfo() {
  const { countryInfo } = useWorld();
  useEffect(() => {
    console.log("info", countryInfo);
  }, []);

  return (
    <div className="country-info">
      <WorldHeader />
      <div className="country-body">
        <button>Back</button>
        <div className="country-info-detail">
          {/* <img src={countryInfo.flags.png} alt=""></img> */}
        </div>
      </div>
    </div>
  );
}

export default CountryInfo;
