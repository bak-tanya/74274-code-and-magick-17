'use strict';

var NUMBER_OF_WIZARDS = 4;

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

var Colors = {
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
  ]
};

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

/**
 * функция возвращает значение случайного элемента массива
 * @param {Array} arr - массив
 * @return {String} - возращаемый случайный элемент массива
*/
var getRandomItemFromArray = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

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

var wizards = createWizards(NUMBER_OF_WIZARDS, WizardNames.FIRST_NAMES, WizardNames.SURNAMES, Colors.COAT, Colors.EYES);

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
