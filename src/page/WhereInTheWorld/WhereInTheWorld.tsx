import { Col, Input, Row, Select, Spin } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "redux/store";
import WorldHeader from "./component/WorldHeader";
import { useWorld } from "./hook/useWorld";
import "./WhereInTheWorld.scss";

function WhereInTheWorld() {
  const loading = useSelector((state: RootState) => state.loading);
  const { Search } = Input;
  const { Option } = Select;
  const {
    inputValue,
    countryList,
    getAllCountry,
    onChangeInput,
    onSearchCountry,
    onSelectRegion,
    onGetCountryInfo,
  } = useWorld();

  useEffect(() => {
    getAllCountry();
  }, []);

  return (
    <div className="world-page">
      <WorldHeader />
      {loading ? (
        <div className="loading-screen">
          <Spin tip="Loading..." size="large"></Spin>
        </div>
      ) : (
        <div className="world-body">
          <div className="world-option">
            <Search
              value={inputValue}
              className="world-option__search"
              placeholder="Search for a Country"
              style={{ width: 250 }}
              onChange={(e) => onChangeInput(e)}
              onPressEnter={() => onSearchCountry()}
            />
            <Select
              className="world-option__select"
              defaultValue="Filter by Region"
              onChange={(value) => onSelectRegion(value)}
            >
              <Option value="Africa">Africa</Option>
              <Option value="America">America</Option>
              <Option value="Asia">Asia</Option>
              <Option value="Europe">Europe</Option>
              <Option value="Oceania">Oceania</Option>
            </Select>
          </div>

          <div className="world-list">
            <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 16]}>
              {countryList.map((item: any, index: number) => (
                <Col
                  xs={{ span: 12 }}
                  sm={{ span: 8 }}
                  md={{ span: 6 }}
                  lg={{ span: 4 }}
                  key={index}
                >
                  <Link
                    to="info"
                    className="world-card"
                    onClick={() => onGetCountryInfo(item)}
                  >
                    <img
                      className="world-card__flag"
                      src={item.flags.svg}
                      alt=""
                    />
                    <div className="world-card__desc">
                      <span className="world-card__desc-name">
                        {item.name.common}
                      </span>
                      <span className="world-card__desc-population">
                        Population: {item.population}
                      </span>
                      <span className="world-card__desc-region">
                        Region: {item.region}
                      </span>
                      <span className="world-card__desc-capital">
                        Capital: {item.capital}
                      </span>
                    </div>
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      )}
    </div>
  );
}

export default WhereInTheWorld;
