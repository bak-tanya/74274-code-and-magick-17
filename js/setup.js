'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var NUMBER_OF_WIZARDS = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

/**
 * функция возвращает значение случайного элемента массива
 * @param {Array} arr - массив
 * @return {String} - возращаемое случайно значение
*/
var getRandomData = function (arr) {
  var j = Math.floor(Math.random() * arr.length);
  return arr[j];
};

var wizards = [];

/**
 * функция создает массив объектов волшебников
 * @param {Number} wizardNumber - количество создаваемых желементов массива
 * @param {Array} wizardName - массив с возможными именами
 * @param {Array} wizardSurname - массив с возможными фамилиями
 * @param {Array} wizardCoatColor - массив с возможными цветами мантии
 * @param {Array} wizardEyesColor - массив с возможными цветами глаз
*/
var createWizard = function (wizardNumber, wizardName, wizardSurname, wizardCoatColor, wizardEyesColor) {
  for (var i = 0; i < wizardNumber; i++) {
    var wizard = {};

    wizard.name = getRandomData(wizardName);
    wizard.surname = getRandomData(wizardSurname);
    wizard.coatColor = wizardCoatColor[i];
    wizard.eyesColor = wizardEyesColor[i];

    wizards[i] = wizard;
  }
};

createWizard(NUMBER_OF_WIZARDS, WIZARD_NAMES, WIZARD_SURNAMES, COAT_COLORS, EYES_COLORS);

/**
 * создает новый DOM-элемент с волшебником и передает ему значения
 * @param {Array} wizard - массив, данными которого будет заполняться новый элемент
 * @return {NodeList} - блок, выводящий очередного волшебника
*/
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.surname;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarListElement.appendChild(fragment);
userDialog.querySelector('.setup-similar').classList.remove('hidden');
