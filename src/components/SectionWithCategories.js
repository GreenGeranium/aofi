import { Link } from 'react-router-dom';
import Card from './Card';
import React, { useEffect, useState } from 'react';
import api from '../utils/api';

function SectionWithCategories(props) {
  // выделенная категория
  const [currentCategory, setCurrentCategory] = useState({});
  // определение предложений
  const [offers, setOffers] = useState([]);
  // определение категорий
  const [categories, setCategories] = useState([]);

  // получение всех предложений данной секции
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

  // распределение предложений по категориям
  useEffect(() => {
    const updatedCategories = [];

    offers.forEach((element) => {
      const categoriesOfElement = [
        element.attributes.category1,
        element.attributes.category2,
        element.attributes.category3,
        element.attributes.category4,
        element.attributes.category5,
      ];

      categoriesOfElement.forEach((categoryOfElement) => {
        if (categoryOfElement) {
          let addedToCategory = false;

          updatedCategories.forEach((category) => {
            if (category.title === categoryOfElement) {
              category.data.push(element.attributes);
              addedToCategory = true;
            }
          });

          if (!addedToCategory) {
            updatedCategories.push({
              title: categoryOfElement,
              data: [element.attributes],
            });
          }
        }
      });
    });

    setCategories(updatedCategories);
    setCurrentCategory(updatedCategories[0]);
  }, [offers]);

  return (
    <div className="section_categories">
      <div className="path">
        <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit' }}>
          <p>Главная</p>
        </Link>
        <div className="arrow"></div>
        <p>{props.name}</p>
      </div>
      <h2>{props.name}</h2>
      <ul className="types">
        {categories &&
          categories.map((element) => {
            return (
              <li
                className={`type ${element.title === currentCategory.title ? 'type_active' : ''}`}
                onClick={() => {
                  setCurrentCategory(element);
                }}
                key={element.title}
              >
                {`${element.title} (${element.data.length})`}
              </li>
            );
          })}
      </ul>
      <div className="cardcolumn">
        <img src={props.image} alt={props.name} />
        <h3>{currentCategory && currentCategory.title}</h3>
        <ul>
          {currentCategory &&
            currentCategory.data &&
            currentCategory.data.map((element) => {
              return (
                <li key={element.name}>
                  <Card
                    data={element}
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

export default SectionWithCategories;
