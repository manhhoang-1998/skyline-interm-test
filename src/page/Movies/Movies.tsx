import { Col, Input, Row } from "antd";
import ComeBack from "component/comeback/ComeBack";
import { useEffect, useState } from "react";
import "./Movies.scss";
import { getMoviesData } from "./services/moviesApi";

function Movies() {
  const [moviesData, setMoviesData] = useState([]);

  useEffect(() => {
    (async () => {
      const respose = await getMoviesData();
      setMoviesData(respose.data);
    })();
  }, []);

  return (
    <div className="movies-page">
      <ComeBack />
      <div className="movies-page__header">
        <Input
          placeholder="Search"
          className="movies-page__header-search"
        ></Input>
      </div>
      <div className="movies-page__body">
        <Row gutter={[{ xs: 8, sm: 16 }, 16]}>
          {[...moviesData, ...moviesData, ...moviesData].map(
            (item: any, index: number) => (
              <Col
                key={index}
                xs={{ span: 12 }}
                sm={{ span: 8 }}
                md={{ span: 6 }}
                lg={{ span: 4 }}
              >
                <div className="movie">
                  <img
                    className="movie-poster"
                    src={item.poster}
                    alt=""
                    style={{ width: "100%" }}
                  ></img>
                  <div className="movie-detail">
                    <span className="movie-detail__title">{item.title}</span>
                    <span className="movie-detail__rating">{item.imdb}</span>
                  </div>
                  <div className="movie-desc">
                    <p className="movie-desc__text">{item.description}</p>
                  </div>
                </div>
              </Col>
            )
          )}
        </Row>
      </div>
    </div>
  );
}

export default Movies;
