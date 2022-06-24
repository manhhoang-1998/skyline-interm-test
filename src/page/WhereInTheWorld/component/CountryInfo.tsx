import { ArrowLeftOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "redux/store";
import { useInfo } from "../hook/useInfo";
import "./CountryInfo.scss";
import LoaddingScreen from "./LoaddingScreen";
import WorldHeader from "./WorldHeader";

function CountryInfo() {
  const { countryInfo, getCountryInfo } = useInfo();

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  const name = useQuery().get("name");

  useEffect(() => {
    if (name) {
      getCountryInfo(name);
    }
  }, [name]);

  const loading = useSelector((state: RootState) => state.loading);
  const navigate = useNavigate();

  return (
    <div className="country-info">
      <WorldHeader />
      {loading ? (
        <LoaddingScreen />
      ) : (
        <div className="country-body">
          <button
            className="country-body-back"
            onClick={() => {
              navigate("/world");
            }}
          >
            <ArrowLeftOutlined className="country-body-back__icon" />
            Back
          </button>
          <div className="country-info-detail">
            <img
              src={countryInfo?.flag}
              alt=""
              className="country-info-detail__flag"
            ></img>
            <div className="country-info-detail__desc">
              <h1 className="country-info-detail__desc-name">
                {countryInfo?.name}
              </h1>
              <div className="country-info-detail__desc-wrap">
                <div className="country-info-detail__desc-wrap-geo">
                  <h2 className="country-info-detail__desc-wrap-geo-key">
                    Native Name:
                    <span className="country-info-detail__desc-wrap-geo-key-value">
                      {countryInfo?.nativeName}
                    </span>
                  </h2>
                  <h2 className="country-info-detail__desc-wrap-geo-key">
                    Population:
                    <span className="country-info-detail__desc-wrap-geo-key-value">
                      {countryInfo?.population}
                    </span>
                  </h2>
                  <h2 className="country-info-detail__desc-wrap-geo-key">
                    Region:
                    <span className="country-info-detail__desc-wrap-geo-key-value">
                      {countryInfo?.region}
                    </span>
                  </h2>
                  <h2 className="country-info-detail__desc-wrap-geo-key">
                    Sub Region:
                    <span className="country-info-detail__desc-wrap-geo-key-value">
                      {countryInfo?.subregion}
                    </span>
                  </h2>
                  <h2 className="country-info-detail__desc-wrap-geo-key">
                    Capital:
                    <span className="country-info-detail__desc-wrap-geo-key-value">
                      {countryInfo?.capital}
                    </span>
                  </h2>
                </div>
                <div className="country-info-detail__desc-wrap-geo">
                  <h2 className="country-info-detail__desc-wrap-geo-key">
                    Top Level Domain:
                    <span className="country-info-detail__desc-wrap-geo-key-value">
                      {countryInfo?.tld}
                    </span>
                  </h2>
                  <h2 className="country-info-detail__desc-wrap-geo-key">
                    Currenies:
                    <span className="country-info-detail__desc-wrap-geo-key-value">
                      {countryInfo?.currencies}
                    </span>
                  </h2>
                  <h2 className="country-info-detail__desc-wrap-geo-key">
                    Languges:
                    <span className="country-info-detail__desc-wrap-geo-key-value">
                      {countryInfo?.languages}
                    </span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CountryInfo;
