const config = {
    formSelector: '.form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_invalid',
    errorClass: 'error-message_active'
    };

    const configProfile = {
    profileNameSelector: '.profile__name',
    profileDescriptionSelector: '.profile__description',
    profileAvatarSelector: '.profile__avatar'
    }

  //записываем данные относящиеся к popupEdit в переменные
    const userInfoEditButton = document.querySelector('.profile__edit-button'); //кнопка редактирования
    const userInfoEditForm = document.querySelector('.popup__edit-form'); //форма редактирования
    
    const popupAvatarEditButton = document.querySelector('.profile__avatar-button'); //кнопка редактирования аватара
    const userAvatarEditForm = document.querySelector('.popup__avatar-form'); //форма редактирования аватара

  //записываем данные относящиеся к popupAdd в переменные
    const popupAddCardOpenButton = document.querySelector('.profile__add-button'); //кнопка добавления новой карточки
    const cardAddForm = document.querySelector('.popup__add-form'); //форма добавления новой карточки
    const templateSelector = document.querySelector('#card-template') //темплейт
    const gallery = document.querySelector('.gallery') //галерея

    const optionsApi = {
    url: 'https://mesto.nomoreparties.co/v1/cohort-75',
    headers: {
        authorization: 'a3be5fd8-a845-485e-b459-773d089bf2dd',
        'Content-Type': 'application/json'
    }
    }

    export { config, userInfoEditButton, userInfoEditForm,
    popupAddCardOpenButton, cardAddForm, templateSelector, gallery, configProfile,
    popupAvatarEditButton, userAvatarEditForm, optionsApi };