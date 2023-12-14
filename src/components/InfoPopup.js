import { useEffect, useState } from 'react';
import basketicon from '../images/popupbasket.svg';
import Popup from './Popup';
import api from '../utils/api';
import { backUrl } from '../utils/db';

function InfoPopup(props) {
  const [cardData, setCardData] = useState({});

  // является ли описание расширенным или нет
  const [isTextExpanded, setIsTextExpanded] = useState(false);

  // при рендере попапа устанавливать данные карточки
  useEffect(() => {
    if (props.card) {
      setCardData(props.card);
    }
  }, [props.isOpen, props.card]);

  return (
    <Popup isOpen={props.isOpen} onClose={props.onClose} popupName="info">
      <div className="principal">
        <img
          src={`${backUrl}${
            cardData.image && cardData.image.data && cardData.image.data.attributes.url
          }`}
          alt={cardData.name}
        />
        <div className="description">
          <div className="title">
            <h2>{cardData.name}</h2>
            <p>
              Подробнее:
              <a href={cardData.link} target="_blank">
                {cardData.link}
              </a>
            </p>
          </div>
          <button
            className={`button ${props.isCardInCart(cardData) ? 'button_delete' : 'button_add'}`}
            onClick={() => {
              props.onAddCard(cardData);
            }}
          >
            {props.isCardInCart(cardData) ? (
              'Удалить из корзины'
            ) : (
              <span>
                Добавить в <img src={basketicon} alt="Иконка корзины" />
              </span>
            )}
          </button>
          <p className={`text ${isTextExpanded ? 'text_expanded' : ''}`}>{cardData.description}</p>
          <p
            className="readmore"
            onClick={() => {
              setIsTextExpanded(!isTextExpanded);
            }}
          >
            {isTextExpanded ? 'Свернуть' : 'Читать всё'}
          </p>
        </div>
      </div>
      <h3 className="bar">Для членов АОФИ</h3>
      <ul className="offers">
        <li>
          <h4>{cardData.offer_name}</h4>
          <p className="description">{cardData.offer_description}</p>
          <p className="value">{cardData.offer_value}</p>
        </li>
      </ul>
    </Popup>
  );
}

export default InfoPopup;
