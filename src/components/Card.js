import React from 'react';
import { backUrl } from '../utils/db';

function Card(props) {
  return (
    <article className="card">
      <img
        className="card__image"
        src={`${backUrl}${props.data && props.data.image.data.attributes.url}`}
        alt={`${props.data.name} лого`}
        onClick={() => {
          props.openPopup(props.data);
        }}
      />
      <p>
        Предложений: <span>{props.data.offers ? props.data.offers.data.length : '1'}</span>
      </p>
      <h4>{props.data.name}</h4>
      <div className="buttons">
        <button
          className={`button ${props.isCardInCart(props.data) ? 'button_delete' : 'button_add'}`}
          onClick={() => {
            props.onAddCard(props.data);
          }}
        >
          {props.isCardInCart(props.data) ? 'Удалить из корзины' : <span>Добавить в корзину</span>}
        </button>
        <button
          className="info"
          onClick={() => {
            props.openPopup(props.data);
          }}
        ></button>
      </div>
    </article>
  );
}

export default Card;
