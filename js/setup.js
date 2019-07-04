'use strict';

var NUMBER_OF_WIZARDS = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var WizardNames = {
  FIRST_NAMES: [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ],
  SURNAMES: [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ]
};

var WizardColors = {
  COAT: [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ],
  EYES: [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ],
  FIREBALL: [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ]
};

var userDialog = document.querySelector('.setup');
var userDialogOpen = document.querySelector('.setup-open');
var userDialogClose = userDialog.querySelector('.setup-close');
var userDialogForm = userDialog.querySelector('.setup-wizard-form');

var userCoatColor = userDialogForm.querySelector('.setup-player')
    .querySelector('.setup-wizard-appearance')
    .querySelector('.setup-wizard')
    .querySelector('.wizard-coat');

var inputUserCoatColor = userDialogForm.elements['coat-color'];

var userEyesColor = userDialogForm.querySelector('.setup-player')
    .querySelector('.setup-wizard-appearance')
    .querySelector('.setup-wizard')
    .querySelector('.wizard-eyes');

var inputUserEyesColor = userDialogForm.elements['eyes-color'];

var userFireballColor = userDialogForm.querySelector('.setup-player')
    .querySelector('.setup-fireball-wrap');

var inputUserFireballColor = userDialogForm.elements['fireball-color'];

/**
 * функция возвращает значение случайного элемента массива
 * @param {Array} arr - массив
 * @return {String} - возращаемый случайный элемент массива
*/
var getRandomItemFromArray = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

/**
 * функция отвечает за закрытие всплывающего окна
 */
var closePopup = function () {
  userDialog.classList.add('hidden');
};

/**
 * функция отвечает за закрытие всплывающего окна при нажатии на Esc
 * @param {Object} evt
 */
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    if (document.activeElement.className !== 'setup-user-name') {
      closePopup();
    }
  }
};

/**
 * функция отвечает за открытие окна при нажатии Enter
 * @param {Object} evt
 */
var openPopup = function () {
  userDialog.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
};

userDialogOpen.addEventListener('click', function () {
  openPopup();
});

userDialogOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

userDialogClose.addEventListener('click', function () {
  closePopup();
});

userDialogClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    closePopup();
  }
});

userCoatColor.addEventListener('click', function () {
  var randomCoatColor = getRandomItemFromArray(WizardColors.COAT);
  userCoatColor.style.fill = randomCoatColor;
  inputUserCoatColor.value = randomCoatColor;
});

userEyesColor.addEventListener('click', function () {
  var randomEyesColor = getRandomItemFromArray(WizardColors.EYES);
  userEyesColor.style.fill = randomEyesColor;
  inputUserEyesColor.value = randomEyesColor;
});

userFireballColor.addEventListener('click', function () {
  var randomFireballColor = getRandomItemFromArray(WizardColors.FIREBALL);
  userFireballColor.style.background = randomFireballColor;
  inputUserFireballColor.value = randomFireballColor;
});

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

/**
 * функция создает массив объектов волшебников
 * @param {Number} wizardCount - количество создаваемых элементов массива
 * @param {Array.<string>} wizardNames - массив с возможными именами
 * @param {Array.<string>} wizardSurnames - массив с возможными фамилиями
 * @param {Array.<string>} wizardCoatColors - массив с возможными цветами мантии
 * @param {Array.<string>} wizardEyesColors - массив с возможными цветами глаз
 * @return {Array.<object>} - массив объектов с параметрами волшебников
*/
var createWizards = function (wizardCount, wizardNames, wizardSurnames, wizardCoatColors, wizardEyesColors) {
  var wizards = [];
  for (var i = 0; i < wizardCount; i++) {
    wizards[i] = {
      name: getRandomItemFromArray(wizardNames),
      surname: getRandomItemFromArray(wizardSurnames),
      coatColor: getRandomItemFromArray(wizardCoatColors),
      eyesColor: getRandomItemFromArray(wizardEyesColors)
    };
  }

  return wizards;
};

var wizards = createWizards(NUMBER_OF_WIZARDS, WizardNames.FIRST_NAMES, WizardNames.SURNAMES, WizardColors.COAT, WizardColors.EYES);

/**
 * создает новый DOM-элемент с волшебником и передает ему значения
 * @param {Array.<object>} wizard - массив, данными которого будет заполняться новый элемент
 * @return {NodeList} - блок, выводящий очередного волшебника на странице
*/
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.surname;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
wizards.forEach(function (wizard) {
  fragment.appendChild(renderWizard(wizard));
});

similarListElement.appendChild(fragment);
userDialog.querySelector('.setup-similar').classList.remove('hidden');
