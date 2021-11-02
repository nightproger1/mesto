// edit popup
const popupEdit = document.getElementById('edit');
const formElement = popupEdit.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_user_name');
const jobInput = document.querySelector('.popup__input_user_profession');
const openPopup = document.querySelector('.profile__edit-btn');
const closePopup = popupEdit.querySelector('.popup__close');
const titleInput = document.querySelector('.profile__title');
const paragraphInput = document.querySelector('.profile__paragraph');

//location popup
const popupLocation = document.getElementById('location');
const formLocation = popupLocation.querySelector('.popup__form');
const openCardPopup = document.querySelector('.profile__add');
const closeCardPopup = popupLocation.querySelector('.popup__close');
const locationInput = document.querySelector('.popup__input_location');
const imagelInput = document.querySelector('.popup__input_image');
const card = document.querySelector('.card').content.querySelector('.element');
const elements = document.querySelector('.elements');

//enlarged popup
const popupEnlarged = document.getElementById('enlarged');
const closeEnlargedPopup = popupEnlarged.querySelector('.popup__close');
const imageEnlarged = popupEnlarged.querySelector('.popup__img-enlarged');
const imageDescription = popupEnlarged.querySelector('.popup__img-title');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//создание карточки
function cardCreation(item) {
  const element = card.cloneNode(true);
  const cardImage = element.querySelector('.element__image');
  const cardTitle = element.querySelector('.element__title');
  const cardLike = element.querySelector('.element__like-btn');
  const cardDelete = element.querySelector('.element__remove');

 //поставить лайка
  cardLike.addEventListener('click', () => {
    cardLike.classList.toggle('element__like-btn_active');
  });

 //удаление
  cardDelete.addEventListener('click', () => {
    element.remove();
  });

  //откртыие попапа с увеличенной фотографией
  cardImage.addEventListener('click', function () {
    imageDescription.textContent = item.name;
    imageEnlarged.src = item.link;
    imageEnlarged.alt = 'Фотография';
    openCardForm(popupEnlarged);
  });

  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = 'Фотография';
  return element;
};

function renderCard(item) {
  elements.prepend(cardCreation(item));
};

initialCards.forEach((item) => {
  renderCard(item);
});

function openCardForm(popup) {
  popup.classList.add('popup_active');
}

function openForm(popup) {
  popup.classList.add('popup_active');
  nameInput.value = titleInput.textContent;
  jobInput.value = paragraphInput.textContent;
}

function closeForm(popup) {
  popup.classList.remove('popup_active');
}
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  titleInput.textContent = nameInput.value;
  paragraphInput.textContent = jobInput.value;
  closeForm(popupEdit);
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

function сardSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  renderCard({name: locationInput.value, link: imagelInput.value});
  closeForm(popupLocation);
  formLocation.reset();
};

formLocation.addEventListener('submit', сardSubmitHandler);

//открытие и закрытия попапов
openPopup.addEventListener('click', () => openForm(popupEdit));
closePopup.addEventListener('click', () => closeForm(popupEdit));
openCardPopup.addEventListener('click', () => openForm(popupLocation));
closeCardPopup.addEventListener('click', () => closeForm(popupLocation));
closeEnlargedPopup.addEventListener('click', () => closeForm(popupEnlarged));
