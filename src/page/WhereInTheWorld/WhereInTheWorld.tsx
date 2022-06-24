import { Col, Input, Pagination, Row, Select, Spin } from "antd";
import ComeBack from "component/comeback/ComeBack";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "redux/store";
import LoaddingScreen from "./component/LoaddingScreen";
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
  } = useWorld();

  useEffect(() => {
    getAllCountry();
  }, []);

  return (
    <div className="world-page">
      <ComeBack />
      <WorldHeader />
      {loading ? (
        <LoaddingScreen />
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
                    to={`info?name=${item.name.common}`}
                    className="world-card"
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
                        Capital: {item.capital?.join(", ")}
                      </span>
                    </div>
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      )}
      {/* <Pagination defaultCurrent={1} total={200} /> */}
    </div>
  );
}

export default WhereInTheWorld;
