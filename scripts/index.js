const selectors = {
  popupEditProfile: '.popup_type_profile-edit',
  popupAddCard: '.popup_type_add-card',
  popupExpandPic: '.popup_type_expand-image',
  inputUsername: '.form__input_type_username',
  inputJob: '.form__input_type_job',
  inputImgName: '.form__input_type_name',
  inputImgLink: '.form__input_type_link',
  userName: '.profile__title',
  userJob: '.profile__description',
  buttonEdit: '.profile__edit-button',
  buttonAdd: '.profile__add-button',
  buttonClose: '.popup__close',
  buttonLike: '.element__like-button',
  buttonDel: '.element__del-button',
  form: '.popup__form',
  cardsList: '.elements__list',
  card: '.element',
  cardImg: '.element__image',
  cardName: '.element__title',
  cardTemplate: '.element-tmp',
  fullSizeImg: '.popup__image',
  fullSizeImgCaption: '.popup__caption',
  popup: '.popup_opened'
};

const classAddRemove = {
  like: 'element__like-button_active',
  popupOpenClose: 'popup_opened'
};

// ищем попап редактирования профиля
const popupEditProfile = document.querySelector(selectors.popupEditProfile);
// ищем кнопку для открытия попапа редактирования профиля
const popupEditProfileButton = document.querySelector(selectors.buttonEdit);
// ищем кнопку закрытия попапа редактирования профиля
const popupCloseButton = popupEditProfile.querySelector(selectors.buttonClose);
// ищем форму попапа редактирования профиля
const formEditProfileSubmit = popupEditProfile.querySelector(selectors.form);
// ищем инпуты (переменные) формы попапа редактирования профиля
const nameInput = popupEditProfile.querySelector(selectors.inputUsername);
const jobInput = popupEditProfile.querySelector(selectors.inputJob);
// задаем переменные, в которые будут сохраняться данные из формы
const profileName = document.querySelector(selectors.userName);
const profileJob = document.querySelector(selectors.userJob);

// ищем попап добавления карточки
const popupAddCard = document.querySelector(selectors.popupAddCard);
// ищем кнопку открытия попапа добавления карточки
const popupAddCardButton = document.querySelector(selectors.buttonAdd);
// ищем кнопку для закрытия попапа добавления карточки
const popupCloseAddCardButton = popupAddCard.querySelector(selectors.buttonClose);
// ищем форму попапа добавления карточки
const formAddCardSubmit = popupAddCard.querySelector(selectors.form);

// ищем контейнер, в который будем вставлять карточки
const cardsList = document.querySelector(selectors.cardsList);
// ищем шаблон карточки
const cardTemplate = document.querySelector(selectors.cardTemplate).content;
// ищем инпуты (переменные) формы попапа добавления карточки
const cardNameInput = formAddCardSubmit.querySelector(selectors.inputImgName);
const cardLinkInput = formAddCardSubmit.querySelector(selectors.inputImgLink);

// ищем попап просмотра фото
const popupExpandPic = document.querySelector(selectors.popupExpandPic);
// ищем кнопку закрытия просмотра фото
const popupCloseExpandPicButton = popupExpandPic.querySelector(selectors.buttonClose);
// ищем фото попапа просмотра
const expandPicImage = popupExpandPic.querySelector(selectors.fullSizeImg);
// ищем название фото попапа просмотра
const expandPicName = popupExpandPic.querySelector(selectors.fullSizeImgCaption);

//Likes
// функция добавления класса (модификатора) кнопке лайк
const toggleLike = (e) => {
  e.target.classList.toggle(classAddRemove.like);
};

//Delete
// функция удаления карточки
const cardRemove = (e) => {
  e.target.closest(selectors.card).remove();
};

//Full Size (работа с попапом)
// функция открытия попапа просмотра фото
const openExpandPicPopup = (bigPic) => {
  // задаем начальные атрибуты (ссылка, название, alt) для попапа просмотра изображения
  expandPicImage.src = bigPic.src;
  expandPicName.textContent = bigPic.alt;
  expandPicImage.alt = bigPic.alt;
  openPopup(popupExpandPic);
};

const createCard = (cardData) => {
  // ищем элемент карточки, который создавать
  const cardElement = cardTemplate.querySelector(selectors.card).cloneNode(true);

  // ищем картинку
  const cardImg = cardElement.querySelector(selectors.cardImg);
  // задаем соответствия аргументам
  cardImg.src = cardData.imgValue;
  cardImg.alt = cardData.nameValue;

  // слушаем нажатие на картинку карточки
  cardImg.addEventListener('click', () => openExpandPicPopup(cardImg));

  // ищем название картинки
  const cardName = cardElement.querySelector(selectors.cardName);
  cardName.textContent = cardData.nameValue;

  // ищем кнопку лайка карточки
  const cardLikeButton = cardElement.querySelector(selectors.buttonLike);
  // слушаем кнопку лайк
  cardLikeButton.addEventListener('click', toggleLike);

  // ищем кнопку удаления карточки
  const cardDeleteButton = cardElement.querySelector(selectors.buttonDel);
  // слушаем кнопку корзины
  cardDeleteButton.addEventListener('click', cardRemove);

  return cardElement;
}

const addCardsFromArray = (array) => {
  const newList = [];
  array.reverse().forEach((card) => {
    const imgData = {
      nameValue: card.name,
      imgValue: card.link
    };
    const newCard = createCard(imgData);
    newList.push(newCard);
  });
  // вставляем элемент перед концом с разбиванием массива оператором spread на аргументы функции
  cardsList.prepend(...newList);
};

// вызываем функцию добавления карточек из массива с аргументом нашего массива
addCardsFromArray(initialCards);

/*---------------------------------------------------------------------------------------*/
// функция закрытия попапа
const closePopup = (popup) => {
  popup.classList.remove(classAddRemove.popupOpenClose);
  document.removeEventListener(`keydown`, closePopupByPressEscape);
  disableButtons();
}

// функция открытия попапа
const openPopup = (popup) => {
  popup.classList.add(classAddRemove.popupOpenClose);
  document.addEventListener(`keydown`, closePopupByPressEscape);
};

// функция закрытия попапа по клику вне окна попапа
const closePopupByClickOnOverlay = (e) => {
  if (e.target !== e.currentTarget) {
    return;
  }
  closePopup(e.currentTarget);
};
// слушатели событий по клику вне попапов
popupEditProfile.addEventListener('click', closePopupByClickOnOverlay);
popupAddCard.addEventListener('click', closePopupByClickOnOverlay);
popupExpandPic.addEventListener('click', closePopupByClickOnOverlay);

// функция закрытия попапа по нажатию на Escape
const closePopupByPressEscape = (e) => {
  if (e.key === 'Escape') {
    const openedPopup = document.querySelector(selectors.popup);
    closePopup(openedPopup);
  }
};


  /*---------------------------------------------------------------------------------------*/
//Edit-Profile (работа с попапом)
// функция, выполняемая по нажатию кнопки редактирования профиля
const openEditProfilePopup = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEditProfile);
}
// функция отправки данных редактирования профиля
const handleEditFormSubmit = (evt) => {
  evt.preventDefault(); //отменяет дефолтную отправку данных
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

/*---------------------------------------------------------------------------------------*/
//Add-Card (работа с попапом)
// функция, выполняемая по нажатию кнопки добавления карточки
const openAddCardPopup = () => {
  openPopup(popupAddCard);
}

// функция отправки данных добавленой карточки
const handleAddFormSubmit = (evt) => {
  evt.preventDefault(); //отменяет дефолтную отправку данных
  const formData = {
    nameValue: cardNameInput.value,
    imgValue: cardLinkInput.value
  };
  const addNewCardValue = createCard(formData);
  // добавляем в начало галереи
  cardsList.prepend(addNewCardValue);
  closePopup(popupAddCard);
  // обнуляем поля формы
  formAddCardSubmit.reset();
}

// слушаем кнопку редактирования профиля пользователя
popupEditProfileButton.addEventListener('click', openEditProfilePopup);
// слушаем кнопку закрытия попапа редактирования профиля пользователя
popupCloseButton.addEventListener('click', () => closePopup(popupEditProfile));
// Submit формы данных пользователя
formEditProfileSubmit.addEventListener('submit', handleEditFormSubmit);

// слушаем кнопку добавления карточки
popupAddCardButton.addEventListener('click', openAddCardPopup);
// слушаем кнопку закрытия попапа добавления карточки
popupCloseAddCardButton.addEventListener('click', () => closePopup(popupAddCard));
// Submit формы карточки
formAddCardSubmit.addEventListener('submit', handleAddFormSubmit);

// слушаем кнопку закрытия попапа просмотра фото
popupCloseExpandPicButton.addEventListener('click', () => closePopup(popupExpandPic));
