import Popup from './Popup';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';

function OrderPopup(props) {
  // приняты ли условия
  const [isAgreed, setIsAgreed] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    getValues,
  } = useForm();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue(name, value);
  };

  return (
    <Popup
      isOpen={props.isOpen}
      onClose={() => {
        reset();
        props.onClose();
      }}
      popupName="order"
    >
      <h2>Введите данные</h2>
      <h3>Оставьте заявку на вступление в ассоциацию и получайте персональные предложения</h3>
      <form
        method="post"
        onSubmit={(event) => {
          event.preventDefault();
          const values = getValues();
          props.onSubmit(values);
        }}
      >
        <label>
          <input
            {...register('name', {
              required: 'Поле "ФИО" обязательно для заполнения',
              minLength: {
                value: 8,
                message: 'Минимальная длина поля "ФИО" составляет 8 символов',
              },
              maxLength: {
                value: 40,
                message: 'Максимальная длина поля "ФИО" составляет 100 символов',
              },
            })}
            type="text"
            placeholder="ФИО"
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </label>
        <label>
          {' '}
          <input
            {...register('telephone', {
              required: 'Поле "Номер телефона" обязательно для заполнения',
              minLength: {
                value: 11,
                message: 'Минимальная длина поля "Номер телефона" составляет 11 символов',
              },
              maxLength: {
                value: 20,
                message: 'Максимальная длина поля "Номер телефона" составляет 20 символов',
              },
              pattern: {
                value: /^[\d+\-() ]+$/,
                message: 'Пожалуйста, введите номер в правильном формате',
              },
            })}
            type="text"
            placeholder="+7 (000) 000-00-00"
            onChange={handleChange}
          />
          {errors.telephone && <p className="error">{errors.telephone.message}</p>}
        </label>
        <label>
          {' '}
          <input
            {...register('email', {
              required: 'Поле "E-mail" обязательно для заполнения',
              minLength: {
                value: 3,
                message: 'Минимальная длина поля "E-mail" составляет 3 символа',
              },
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Пожалуйста, введите адрес в правильном формате',
              },
            })}
            type="email"
            placeholder="E-mail"
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </label>
        <label>
          <input
            {...register('organization', {
              minLength: {
                value: 3,
                message: 'Минимальная длина поля "Название организации" составляет 3 символа',
              },
              required: 'Поле "Название организации" обязательно для заполнения',
            })}
            type="text"
            placeholder="Название организации"
            onChange={handleChange}
          />
          {errors.organization && <p className="error">{errors.organization.message}</p>}
        </label>

        <button type="submit">Отправить заказ</button>
        <label>
          <input
            type="checkbox"
            className="agreement"
            onChange={() => {
              setIsAgreed(!isAgreed);
            }}
          />
          Соглашаюсь с условиями передачи данных
        </label>
      </form>
    </Popup>
  );
}

export default OrderPopup;
