import { Col, Row } from "antd";
import ComeBack from "component/comeback/ComeBack";
import { useEffect, useState } from "react";
import { getPokeData } from "./services/pokedexApi";
import "./Pokedex.scss";

function Pokedex() {
  const [pokeData, setPokeData] = useState([]);

  useEffect(() => {
    (async () => {
      const respose = await getPokeData();
      console.log(respose.data);
      setPokeData(respose.data);
    })();
  }, []);
  return (
    <div className="poke-page">
      <ComeBack />
      <h1 className="poke-page__title">Pokedex</h1>
      <div className="poke-page__body">
        <Row gutter={[{ xs: 8, sm: 16 }, 16]}>
          {pokeData.map((item: any, index: number) => (
            <Col
              key={index}
              xs={{ span: 12 }}
              sm={{ span: 8 }}
              md={{ span: 6 }}
              lg={{ span: 4 }}
            >
              <div className="poke-card" style={{ backgroundColor: "#387638" }}>
                <img className="poke-card__img" src={item.image} alt=""></img>
                <div className="poke-card__detail">
                  <span className="poke-card__detail-id">{item.id}</span>
                  <span className="poke-card__detail-name">Bulbasaur</span>
                  <span className="poke-card__detail-type">
                    Type: {item.type}
                  </span>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default Pokedex;
