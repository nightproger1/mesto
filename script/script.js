// Находим форму в DOM
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__profile');
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input_user_name');
let jobInput = document.querySelector('.popup__input_user_profession');
let openPopup = document.querySelector('.profile__edit-btn');
let closePopup = document.querySelector('.popup__close');
let titleInput = document.querySelector('.profile__title');
let paragraphInput = document.querySelector('.profile__paragraph');

function openForm() {
  popup.classList.add('popup_active');
  nameInput.value = titleInput.textContent;
  jobInput.value = paragraphInput.textContent;
}

function closeForm() {
  popup.classList.remove('popup_active');
}
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  titleInput.textContent = nameInput.value;
  paragraphInput.textContent = jobInput.value;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

closePopup.addEventListener('click', closeForm);
openPopup.addEventListener('click', openForm);
