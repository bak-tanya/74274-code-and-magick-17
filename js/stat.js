'use strict';

var CLOUD_X = 110;
var CLOUD_Y = 10;
var GAP = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var TEXT_WIDTH = 16;
var MAX_BAR_HEIGHT = 150;

/**
 * функция, при вызове которой будет рисоваться прямоугольник.
 * @param {Object} ctx - контекст отображения
 * @param {Number} x - исходная координата по оси X
 * @param {Number} y - исходная координата по оси Y
 * @param {Number} width - ширина фигуры
 * @param {Number} height - высота фигуры
 * @param {String} color - цвет фигуры
*/
var renderCloud = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

/**
 * функция, при вызове которой будет выведен контекст
 * @param {Object} ctx - контекст отображения
 * @param {String} text - текст, который будет выведен
 * @param {String} color - цвет текста
 * @param {Number} x - исходная координата по оси X
 * @param {Number} y - исходная координата по оси Y
 * @param {Number} lineHeight - отступ между строками
*/
var showText = function (ctx, text, color, x, y, lineHeight) {
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = color;
  var textArray = text.split('\n');

  textArray.forEach(function (item) {
    ctx.fillText(item, x, y);
    y += lineHeight;
  });
};

/**
 * функция для нахождения в массиве элемента с максимальным значением
 * @param {Array} arr - массив в котором будет осуществляться поиск
 * @return {Number} найденное максимальное значение
*/
var getMaxElementFromArray = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

/**
 * функция, выводящая статистику прохождения игры
 * @param {Object} ctx - контекст отображения
 * @param {Array} players - массив с перечнем игроков
 * @param {Array} times - массив с перечнем временных показателей игроков
*/
window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_WIDTH, CLOUD_HEIGHT, 'rgba(0, 0, 0, 0.7');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, '#fff');

  if (players.length && times.length) {
    var maxTime = getMaxElementFromArray(times);

    for (var i = 0; i < players.length; i++) {

      var player = players[i] ? players[i] : 'Инкогнито';

      var barWidth = 40;
      var barGap = 10;
      if (players.length <= 4) {
        barGap = (CLOUD_WIDTH - players.length * barWidth) / (players.length + 1);
      } else {
        barWidth = barGap = CLOUD_WIDTH / (players.length * 2 + 1);
      }

      var barHeight = times[i] * MAX_BAR_HEIGHT / maxTime;
      var barX = CLOUD_X + barGap + (barWidth + barGap) * i;
      var barY = CLOUD_Y + GAP * 4 + TEXT_WIDTH * 3 + (MAX_BAR_HEIGHT - barHeight);

      var nameX = CLOUD_X + barGap + (barWidth + barGap) * i;
      var nameY = CLOUD_Y + GAP * 5 + TEXT_WIDTH * 3 + MAX_BAR_HEIGHT;

      var scoreX = CLOUD_X + barGap + (barWidth + barGap) * i;
      var scoreY = CLOUD_Y + GAP * 3 + TEXT_WIDTH * 2 + (MAX_BAR_HEIGHT - barHeight);

      var color = players[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'hsl(240, ' + (Math.random() * 100 + 1) + '%, 50%)';

      var textWelcome = 'Ура вы победили!\nСписок результатов:';
      showText(ctx, textWelcome, '#000', CLOUD_X + GAP, CLOUD_Y + GAP, TEXT_WIDTH + GAP);

      ctx.fillStyle = color;
      ctx.fillText(Math.round(times[i]), scoreX, scoreY);
      ctx.fillRect(barX, barY, barWidth, barHeight);
      ctx.fillText(player, nameX, nameY);
    }
  } else {
    var textError = 'К сожалению, данные для отображения\nстатистики не переданы';
    showText(ctx, textError, 'hsl(353, 100%, 50%)', CLOUD_X + GAP, CLOUD_Y + GAP, TEXT_WIDTH + GAP);
  }
};
