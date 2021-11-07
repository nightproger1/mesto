const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

//функция начала проверки
function enableValidation(validation) {
  //использование spread для интерпритации массива
  const formsArray = [...document.querySelectorAll(validation.formSelector)];
  formsArray.forEach(form => setEventListeners(form, validation));
}

//функция установки прослушивания событий
function setEventListeners(form, config) {
  form.addEventListener('submit', (event) => event.preventDefault());
  const inputsList =[...form.querySelectorAll(config.inputSelector)];
  inputsList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      isValidation(inputElement, form, config);
      changingSubmitButtonCondition(form, config);
  });
  });
  changingSubmitButtonCondition(form, config);
}

//функция провекри поля валидации
function isValidation(input, form, config) {
  if (!input.validity.valid) {
    showError(input, form, config);
  } else {
    hideError(input, form, config);
  }
}

//функция вывода ошибки в форму
function showError(input, form, config) {
  //передаем id поля с ошибкой
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.add(config.inputErrorClass);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = input.validationMessage;
}

//функция сокрытия ошибки в формe
function hideError(input, form, config) {
  //передаем id поля с ошибкой
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
}

//функция сокрытия всех ошибок
function hideInputErrors(form, config) {
  const inputsList =[...form.querySelectorAll(config.inputSelector)];
  inputsList.forEach((input) => hideError(input, form, config));
}

//функция контроля состояния popup`a
function checkoutPopupCondition(popup, config) {
  const form = popup.querySelector(config.formSelector);
  changingSubmitButtonCondition(form, config);
  hideInputErrors(form, config);
}

//функция изменения состояния кнопки отправки
function changingSubmitButtonCondition(form, config) {
    const buttonSubmit = form.querySelector(config.submitButtonSelector);
    if (hasInvalidInput(form)) {
      buttonSubmit.disabled
      buttonSubmit.classList.add(config.inactiveButtonClass);
    } else {
      buttonSubmit.classList.remove(config.inactiveButtonClass);
    }
}

//функция проверки на неверный ввод
function hasInvalidInput(form) {
  const inputsList =[...form.querySelectorAll(config.inputSelector)];
  return inputsList.some((inputElement) => {
    return  !inputElement.validity.valid;
  })
}

enableValidation(config);
