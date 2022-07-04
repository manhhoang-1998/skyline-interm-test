import { SearchOutlined, StarFilled } from "@ant-design/icons";
import { Checkbox, Col, Radio, Row, Slider, Spin } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { useDebounce } from "./hook/useDebounce";
import { TourData, useTour } from "./hook/useTour";
import "./TourApp.scss";

function TourApp() {
  const {
    tourData,
    getAllData,
    onChangeCategory,
    onChangeCuisine,
    onChangePrice,
    onChangeRating,
    onSearch,
  } = useTour();

  const loading = useSelector((state: RootState) => state.loading);
  const [inputValue, setInputValue] = useState<string>("");
  const debounceValue = useDebounce(inputValue);

  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    onSearch(debounceValue);
  }, [debounceValue]);

  return (
    <div className="tour-app">
      <div className="tour-header">
        <div className="tour-header__search">
          <SearchOutlined className="tour-header__search-icon" />
          <input
            onChange={(e) => setInputValue(e.target.value)}
            className="tour-header__search-input"
            placeholder="Woodland Hills"
          ></input>
        </div>
      </div>
      {loading ? (
        <div className="tour-loading">
          <Spin tip="Loading..." size="large"></Spin>
        </div>
      ) : (
        <div className="tour-body">
          <div className="tour-category">
            <h1 className="tour-category-title">Category</h1>
            <Radio.Group
              defaultValue="place"
              buttonStyle="solid"
              className="tour-category-radio"
              onChange={(e) => onChangeCategory(e.target.value)}
            >
              <Radio.Button
                name="place"
                value="place"
                className="tour-category-radio__btn"
              >
                PLACES
              </Radio.Button>
              <Radio.Button
                name="dish"
                value="dish"
                className="tour-category-radio__btn"
              >
                DISHES
              </Radio.Button>
            </Radio.Group>
            <Checkbox.Group
              className="tour-category-checkbox"
              onChange={(value) => onChangeCuisine(value)}
            >
              <h1 className="tour-category-checkbox__title">Cuisine</h1>
              <label
                className="tour-category-checkbox__item"
                htmlFor="american"
              >
                American
                <Checkbox
                  className="tour-category-checkbox__item-input"
                  id="american"
                  name="american"
                  value="american"
                ></Checkbox>
              </label>
              <label className="tour-category-checkbox__item" htmlFor="chinese">
                Chinese
                <Checkbox
                  className="tour-category-checkbox__item-input"
                  id="chinese"
                  name="chinese"
                  value="chinese"
                ></Checkbox>
              </label>
              <label className="tour-category-checkbox__item" htmlFor="italian">
                Italian
                <Checkbox
                  className="tour-category-checkbox__item-input"
                  id="italian"
                  name="italian"
                  value="italian"
                ></Checkbox>
              </label>
            </Checkbox.Group>
            <div className="tour-category-price">
              <h1 className="tour-category-price__text">Price Range</h1>
              <Slider
                max={5000}
                min={1000}
                range={true}
                step={10}
                defaultValue={[1000, 5000]}
                tooltipVisible={true}
                className="tour-category-price__slider"
                onChange={(value) => onChangePrice(value)}
              />
            </div>
            <div className="tour-category-rate">
              <h1 className="tour-category-rate__text">Star Rating</h1>
              <Radio.Group
                defaultValue={0}
                buttonStyle="solid"
                className="tour-category-rate__radio"
                onChange={(e) => onChangeRating(e.target.value)}
              >
                <Radio.Button value={1}>
                  1 <StarFilled style={{ color: "gold" }} />
                </Radio.Button>
                <Radio.Button value={2}>
                  2 <StarFilled style={{ color: "gold" }} />
                </Radio.Button>
                <Radio.Button value={3}>
                  3 <StarFilled style={{ color: "gold" }} />
                </Radio.Button>
                <Radio.Button value={4}>
                  4 <StarFilled style={{ color: "gold" }} />
                </Radio.Button>
                <Radio.Button value={5}>
                  5 <StarFilled style={{ color: "gold" }} />
                </Radio.Button>
                <Radio.Button value={0}>All</Radio.Button>
              </Radio.Group>
            </div>
          </div>
          <div className="tour-content">
            {tourData.length < 1 ? (
              <div className="tour-content__empty">
                <img src={require("./images/gif/empty.gif")} alt=""></img>
              </div>
            ) : (
              <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 24]}>
                {tourData.map((item: TourData, index: number) => (
                  <Col
                    key={index}
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 12 }}
                    lg={{ span: 8 }}
                  >
                    <img
                      src={require(`.${item?.coverSrc}`)}
                      className="tour-content__img"
                      alt=""
                    ></img>
                    <div className="tour-content__title">
                      <span className="tour-content__title-name">
                        {item?.title}
                      </span>
                      <span className="tour-content__title-rate">
                        {item?.rating}
                        <StarFilled style={{ color: "gold" }} />
                      </span>
                    </div>
                    <div className="tour-content__desc">
                      <span className="tour-content__desc-time">
                        {item?.serviceTime}
                      </span>
                      <span className="tour-content__desc-delivery">
                        Delivery Fee {item?.deliveryFee}$
                      </span>
                      <span className="tour-content__desc-price">
                        {item.price}$
                      </span>
                    </div>
                  </Col>
                ))}
              </Row>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default TourApp;
