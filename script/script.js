// edit popup
const popupEdit = document.getElementById('edit');
const formProfile = document.querySelector('.popup__form_edit');
const nameInput = document.querySelector('.popup__input_user_name');
const jobInput = document.querySelector('.popup__input_user_profession');
const popupEditOpen = document.querySelector('.profile__edit-btn');
const popupEditClose = popupEdit.querySelector('.popup__close');
const titleInput = document.querySelector('.profile__title');
const paragraphInput = document.querySelector('.profile__paragraph');
const editSaveBtn = popupEdit.querySelector('.popup__save-btn');

//location popup
const popupLocation = document.getElementById('location');
const formLocation = popupLocation.querySelector('.popup__form');
const popupLocationOpen = document.querySelector('.profile__add');
const popupLocationClose = popupLocation.querySelector('.popup__close');
const locationInput = document.querySelector('.popup__input_location');
const imagelInput = document.querySelector('.popup__input_image');
const card = document.querySelector('.card').content.querySelector('.element');
const elements = document.querySelector('.elements');
const locationSaveBtn = popupLocation.querySelector('.popup__save-btn');

//enlarged popup
const popupEnlarged = document.getElementById('enlarged');
const popupEnlargedClose = popupEnlarged.querySelector('.popup__close');
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
function createCard(item) {
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
    imageEnlarged.alt = item.name;
    openPopup(popupEnlarged);
  });

  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  return element;
};

function renderCard(item) {
  elements.prepend(createCard(item));
};

initialCards.forEach((item) => {
  renderCard(item);
});

function openPopup(popup) {
  popup.classList.add('popup_active');
  document.addEventListener('keydown', closePopupESC);
  document.addEventListener('click', closePopupOverlay);
}

function openProfileForm(editPopup) {
  nameInput.value = titleInput.textContent;
  jobInput.value = paragraphInput.textContent;
  editSaveBtn.classList.remove('popup__save-btn_disabled');
  openPopup(editPopup);
}

function closePopup(popup) {
  popup.classList.remove('popup_active');
  document.removeEventListener('keydown', closePopupESC);
  document.removeEventListener('click', closePopupOverlay);
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formEditSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  titleInput.textContent = nameInput.value;
  paragraphInput.textContent = jobInput.value;
  closePopup(popupEdit);
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formProfile.addEventListener('submit', formEditSubmitHandler);

function сardSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  renderCard({name: locationInput.value, link: imagelInput.value});
  closePopup(popupLocation);
  formLocation.reset();
  locationSaveBtn.classList.add('popup__save-btn_disabled');
};

formLocation.addEventListener('submit', сardSubmitHandler);

//открытие и закрытия попапов
popupEditOpen.addEventListener('click', () => openProfileForm(popupEdit));
popupEditClose.addEventListener('click', () => closePopup(popupEdit));
popupLocationOpen.addEventListener('click', () => openPopup(popupLocation));
popupLocationClose.addEventListener('click', () => closePopup(popupLocation));
popupEnlargedClose.addEventListener('click', () => closePopup(popupEnlarged));

function closePopupESC(event) {
  const activePopup = document.querySelector('.popup_active');
   if (event.key === 'Escape') {
    closePopup(activePopup);
  }
}

function closePopupOverlay(event) {
  const activePopup = document.querySelector('.popup_active');
  if (event.target.classList.contains('popup')) {
    closePopup(activePopup);
  }
}

