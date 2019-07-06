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
var userAppearance = userDialog.querySelector('.setup-wizard-appearance');

var inputUserCoatColor = userDialogForm.elements['coat-color'];
// var defaultUserCoatColor = inputUserCoatColor.value;

var inputUserEyesColor = userDialogForm.elements['eyes-color'];
// var defaultUserEyesColor = inputUserEyesColor.value;

var userFireball = userDialogForm.querySelector('.setup-fireball-wrap');
var inputUserFireballColor = userDialogForm.elements['fireball-color'];
// var defaultUserFireballColor = inputUserFireballColor.value;

/**
 * функция возвращает значение случайного элемента массива
 * @param {Array} arr - массив
 * @param {String} lastValue
 * @return {String} - возращаемый случайный элемент массива
*/
var getRandomItemFromArray = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

/*
var getRandomItemFromArray = function (arr, lastValue) {
  var newValue = arr[Math.floor(Math.random() * arr.length)];
  while (newValue === lastValue) {
    newValue = arr[Math.floor(Math.random() * arr.length)];
  }
  return newValue;
};
*/

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

var changeColorElement = function (element, colorList, isSVG, elementInput) {
  var randomColor = getRandomItemFromArray(colorList);
  if (isSVG) {
    element.style.fill = randomColor;
  } else {
    element.style.background = randomColor;
  }
  elementInput.value = randomColor;
};

userAppearance.addEventListener('click', function (evt) {
  var target = evt.target;
  if (target.classList.contains('wizard-coat')) {
    changeColorElement(target, WizardColors.COAT, true, inputUserCoatColor);
  } else if (target.classList.contains('wizard-eyes')) {
    changeColorElement(target, WizardColors.EYES, true, inputUserEyesColor);
  }
});

userFireball.addEventListener('click', function (evt) {
  var currentTarget = evt.currentTarget;
  if (currentTarget.classList.contains('setup-fireball-wrap')) {
    changeColorElement(currentTarget, WizardColors.FIREBALL, false, inputUserFireballColor);
  }
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
