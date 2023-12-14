import React from 'react';
import deleteicon from '../images/deleteicon.svg';
import { Link } from 'react-router-dom';
import { backUrl } from '../utils/db';

function Cart(props) {
  return (
    <div className="cart">
      <div className="path">
        <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit' }}>
          <p>Главная</p>
        </Link>
        <div className="arrow"></div>
        <p>Корзина</p>
      </div>
      <h2>Корзина</h2>
      <div className="container">
        <div className="choices">
          <div className="delete">
            <img src={deleteicon} alt="Кнопка удаления из корзины" />
            <p
              onClick={() => {
                props.onDeleteAll();
              }}
            >
              Очистить корзину
            </p>
          </div>
        </div>
        <ul className="items">
          {props.cards &&
            props.cards.map((card) => {
              return (
                <li key={card.cardId}>
                  <div className="description">
                    <img src={`${backUrl}${card.image.data.attributes.url}`} alt={card.name} />
                    <h3>{card.name}</h3>
                    <p className="offers">
                      Предложений: <span>{card.offers ? card.offers.data.length : '0'}</span>
                    </p>
                    <p
                      className="show"
                      onClick={() => {
                        props.openPopup(card);
                      }}
                    >
                      Смотреть описание
                    </p>
                  </div>
                  <p
                    className="delete"
                    onClick={() => {
                      props.onDeleteCard(card);
                    }}
                  >
                    Удалить
                  </p>
                </li>
              );
            })}
        </ul>
        <div className="table-bottom">
          <p>
            <span>Итого: </span>
            {props.cards.length}
          </p>
          <button
            onClick={() => {
              props.onOrderItems();
            }}
          >
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
