import logo from '../images/АОФИ_LOGO.svg';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import basket_icon from '../images/basketbutton.svg';

function Header(props) {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  return (
    <div className={`header ${isBurgerOpen ? 'header_active' : ''}`}>
      <Link to="https://fitnessassociation.ru/">
        <img alt="Логотип АОФИ" className="logo" src={logo}></img>
      </Link>
      <nav className="navbar">
        <ul className={`${isBurgerOpen ? 'active' : ''}`}>
          <li>
            <Link to="https://fitnessassociation.ru/offices">Представильства</Link>
          </li>
          <li>
            <Link to="https://fitnessassociation.ru/kontakt">Контакты</Link>
          </li>
          <li>
            <Link to="https://fitnessassociation.ru/sale">Fitness Market</Link>
          </li>
          <li>
            <Link to="https://fitnessassociation.ru/event">Мероприятия</Link>
          </li>
          <li>
            <Link to="https://fitnessassociation.ru/news">Новости</Link>
          </li>
          <li>
            <Link to="https://fitnessassociation.ru/educationaofi">Обучение</Link>
          </li>
          <li>
            <Link to="https://fitnessassociation.ru/#popup:aofi">Вступить в АОФИ</Link>
          </li>
          <li>
            <Link to="/cart">
              <button className="button_basket">
                <span className="counter">{props.numberOfItems}</span>
                <img alt="Иконка корзины" src={basket_icon} />
                Корзина
              </button>
            </Link>
          </li>
        </ul>
      </nav>
      <div
        className="menuburger"
        onClick={() => {
          setIsBurgerOpen(!isBurgerOpen);
        }}
      >
        <span className={`${isBurgerOpen ? 'active' : ''}`}></span>
        <span className={`${isBurgerOpen ? 'active' : ''}`}></span>
        <span className={`${isBurgerOpen ? 'active' : ''}`}></span>
        <span className={`${isBurgerOpen ? 'active' : ''}`}></span>
      </div>
    </div>
  );
}

export default Header;
