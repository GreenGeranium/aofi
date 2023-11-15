import Card from "./Card";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";

function SectionWithoutCategories(props) {
  const [offers, setOffers] = useState([]);

  // отображение категорий
  useEffect(() => {
    api
      .getCardsForCategory(props.databaseLink)
      .then((data) => {
        setOffers(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="section_no-categories">
      <div className="path">
        <Link to="/" style={{ color: "inherit", textDecoration: "inherit" }}>
          <p>Главная</p>
        </Link>
        <div className="arrow"></div>
        <p>{props.name}</p>
      </div>
      <h2>{props.name}</h2>
      <div className="cardcolumn">
        <img className="main_image" src={props.image} alt={props.name} />
        <ul>
          {offers &&
            offers.map((element) => {
              return (
                <li key={element.id}>
                  <Card
                    data={element.attributes}
                    openPopup={props.openPopup}
                    onAddCard={props.onAddCard}
                    isCardInCart={props.isCardInCart}
                  ></Card>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

export default SectionWithoutCategories;
