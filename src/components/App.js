import '../scss/app.scss';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import InfoPopup from './InfoPopup';
import Cart from './Cart';
import SectionWithCategories from './SectionWithCategories';
import SectionWithoutCategories from './SectionWithoutCategories';
import OrderPopup from './OrderPopup';
import api from '../utils/api';
import { backUrl } from '../utils/db';

function App() {
  // данные по категориям
  const [mainCategoriesData, setMainCategoriesData] = useState([]);

  // информация для попапа с карточкой
  const [popupCard, setPopupCard] = useState({});

  // карточки в корзине
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  // все ли карточки выбраны
  const [isAllItemsSelected, setIsAllItemsSelected] = useState(false);

  function handleSelectAll() {
    setIsAllItemsSelected(!isAllItemsSelected);
  }

  // удаление всех карточек из корзины
  function handleDeleteAll() {
    if (isAllItemsSelected) {
      setIsAllItemsSelected(false);
      setCartItems((prevCartItems) => []);
    }
  }

  // логика удаления и добавления карточки в корзину
  function handleAddCard(card) {
    const cardIndex = cartItems.findIndex((value) => value.cardId === card.cardId);
    if (cardIndex < 0) {
      setCartItems((prevCartItems) => [...prevCartItems, card]);
    } else {
      setCartItems((prevCartItems) => prevCartItems.filter((item) => item.cardId !== card.cardId));
    }
  }

  // отправка формы
  async function handleSubmitForm(data) {
    const combinedData = {
      ...data,
      cartItems: cartItems,
    };

    const formattedMessage = formatDataForEmail(combinedData);

    const formData = {
      to: data.email,
      subject: 'Заявка на сайте АОФИ',
      message: JSON.stringify(formattedMessage),
    };

    console.log(formData);

    try {
      const response = await fetch('http://emailer.fitnessassociation.ru/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Письмо успешно отправлено');
      } else {
        alert('Возникла ошибка при отправке. Попробуйте позднее');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    closePopups();
    console.log('Combined Data:', combinedData);
  }

  // Function to format data for email
  function formatDataForEmail(data) {
    const formattedMessage = `
    <html>
      <head>
        <style>
          /* Add any additional styling here */
        </style>
      </head>
      <body>
        <p>Name: ${data.name}</p>
        <p>Telephone: ${data.telephone}</p>
        <p>Email: ${data.email}</p>
        <p>Organization: ${data.organization}</p>

        <h2>Cart Items:</h2>
        <ul>
          ${data.cartItems
            .map(
              (item, index) => `
            <li>
              ${index + 1}. Product Name: ${item.name}<br>
              Card ID: ${item.cardId}<br>

              <h3>Offers:</h3>
              <ul>
                ${item.offers.data
                  .map(
                    (offer, offerIndex) => `
                  <li>
                    ${offerIndex + 1}. Name: ${offer.attributes.name}<br>
                    Description: ${offer.attributes.description}<br>
                    Value: ${offer.attributes.value}
                  </li>
                `,
                  )
                  .join('<br>')}
              </ul>
            </li>
          `,
            )
            .join('<br>')}
        </ul>
      </body>
    </html>
  `;

    return formattedMessage;
  }

  // при изменении корзины обновляется localstorage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // проверка есть ли данный объект в корзине
  function isCardInCart(card) {
    return cartItems.map((item) => item.cardId).includes(card.cardId);
  }

  // изначально попапы закрыты
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [isOrderPopupOpen, setIsOrderPopupOpen] = useState(false);

  // открытие попапа с информацией карточки
  function openInfoPopup(data) {
    setPopupCard(data);
    setIsInfoPopupOpen(true);
  }

  // открытие попапа с формой заказа
  function openOrderPopup() {
    setIsOrderPopupOpen(true);
  }

  // закрытие попапа
  function closePopups() {
    setIsInfoPopupOpen(false);
    setIsOrderPopupOpen(false);
    setPopupCard({});
  }

  // прогрузка основных категорий с сервера
  useEffect(() => {
    api
      .getMainCategories()
      .then((data) => {
        setMainCategoriesData(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="page">
      <Header numberOfItems={cartItems.length}></Header>
      <Routes>
        <Route path="/" element={<Main data={mainCategoriesData} />}></Route>
        {mainCategoriesData &&
          mainCategoriesData.map((category) => {
            return (
              <Route
                path={category.attributes.link}
                key={category.id}
                element={
                  category.attributes.isWithCategories ? (
                    <SectionWithCategories
                      databaseLink={category.attributes.database_link}
                      openPopup={openInfoPopup}
                      name={category.attributes.section_title}
                      image={`${backUrl}${category.attributes.section_image.data.attributes.url}`}
                      onAddCard={handleAddCard}
                      isCardInCart={isCardInCart}
                    />
                  ) : (
                    <SectionWithoutCategories
                      databaseLink={category.attributes.database_link}
                      openPopup={openInfoPopup}
                      name={category.attributes.section_title}
                      image={`${backUrl}${category.attributes.section_image.data.attributes.url}`}
                      onAddCard={handleAddCard}
                      isCardInCart={isCardInCart}
                    />
                  )
                }
              ></Route>
            );
          })}

        <Route
          path="/cart"
          element={
            <Cart
              openPopup={openInfoPopup}
              cards={cartItems}
              onDeleteCard={handleAddCard}
              onSelectAll={handleSelectAll}
              onDeleteAll={handleDeleteAll}
              isAllItemsSelected={isAllItemsSelected}
              onOrderItems={openOrderPopup}
            />
          }
        ></Route>
      </Routes>
      <InfoPopup
        card={popupCard}
        isOpen={isInfoPopupOpen}
        onClose={closePopups}
        onAddCard={handleAddCard}
        isCardInCart={isCardInCart}
      ></InfoPopup>{' '}
      <OrderPopup
        isOpen={isOrderPopupOpen}
        onClose={closePopups}
        onSubmit={handleSubmitForm}
      ></OrderPopup>
      <Footer></Footer>
    </div>
  );
}

export default App;
