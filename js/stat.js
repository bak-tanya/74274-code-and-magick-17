'use strict';

var CLOUD_X = 110;
var CLOUD_Y = 10;
var GAP = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var TEXT_WIDTH = 16;

/**
функция, при вызове которой будет рисоваться прямоугольник.
@param {Object} ctx - контекст отображения
@param {Number} x - исходная координата по оси X
@param {Number} y - исходная координата по оси Y
@param {String} color - цвет фигуры
*/
var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

/**
функция, при вызове которой будет выводиться приветственный текст
@param {Object} ctx - контекст отображения
@param {String} text - тескт, который будет выведен на страницу
*/
var showTextWelcome = function(ctx, text) {
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = '#000';

  if (Array.isArray(text)) {
    for (var i = 0; i < text.length; i++) {
      ctx.fillText(text[i], CLOUD_WIDTH / 2 - text.length / 2, CLOUD_Y + GAP + (GAP + TEXT_WIDTH) * i);
    }
  } else {
    ctx.fillText(text, CLOUD_WIDTH / 2 - text.length / 2, CLOUD_Y + GAP);
  }
};

/**
функция, при вызове которой будет выводиться текст с ошибкой
@param {Object} ctx - контекст отображения
@param {String} text - тескт, который будет выведен на страницу
*/
var showTextError = function(ctx, text) {
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = 'red';

  if (Array.isArray(text)) {
    for (var i = 0; i < text.length; i++) {
      ctx.fillText(text[i], CLOUD_WIDTH / 2 - text.length / 2, CLOUD_Y + GAP * 8 + (GAP + TEXT_WIDTH) * i);
    }
  } else {
    ctx.fillText(text, CLOUD_WIDTH / 2 - text.length / 2, CLOUD_Y + GAP * 8);
  }
};

/**
функция для нахождения в массиве элемента с максимальным значением
@param {Array} arr - массив в котором будет осуществляться поиск
@return {Number} maxElement - найденное максимальное значение
*/
var getMaxElement = function(arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

/**
функция, выводящая статистику прохождения игры
@param {Object} ctx - контекст отображения
@param {Array} players - массив с перечнем игроков
@param {Array} times - массив с перечнем временных показателей игроков
*/
window.renderStatistics = function(ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  var textWelcome = ['Ура вы победили!', 'Список результатов:'];
  showTextWelcome(ctx, textWelcome);

  if (players.length && times.length) {
    var maxTime = getMaxElement(times);

    for (var i = 0; i < players.length; i++) {

      var player;
      if (players[i]) {
        player = players[i];
      } else {
        player = 'Инкогнито';
      }

      var barWidth = 40;
      var barGap = 10;
      if (players.length <= 4) {
        barGap = (CLOUD_WIDTH - players.length * barWidth) / (players.length + 1);
      } else {
        barWidth = barGap = CLOUD_WIDTH / (players.length * 2 + 1);
      }

      var barHeight = times[i] * 150 / maxTime;
      var barX = CLOUD_X + barGap + (barWidth + barGap) * i;
      var barY = CLOUD_Y + GAP * 4 + TEXT_WIDTH * 3 + (150 - barHeight);

      var nameX = CLOUD_X + barGap + (barWidth + barGap) * i;
      var nameY = CLOUD_Y + GAP * 5 + TEXT_WIDTH * 3 + 150;

      var scoreX = CLOUD_X + barGap + (barWidth + barGap) * i;
      var scoreY = CLOUD_Y + GAP * 3 + TEXT_WIDTH * 2 + (150 - barHeight);

      var color;
      if (players[i] === 'Вы') {
        color = 'rgba(255, 0, 0, 1)';
      } else {
        color = 'rgba(0, ' + (Math.random() * 100 + 1) + ', ' + (Math.random() * 255 + 80) + ', 1)';
      }

      ctx.fillStyle = color;
      ctx.fillText(Math.round(times[i]), scoreX, scoreY);
      ctx.fillRect(barX, barY, barWidth, barHeight);
      ctx.fillText(player, nameX, nameY);
    }
  } else {
    var textError = ['К сожалению, данные для', 'отображения статистики', 'не переданы'];
    showTextError(ctx, textError);
  }
};
