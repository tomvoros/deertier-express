const he = require('he');

const utils = {};

utils.isNullOrWhitespace = function(str)
{
  if (typeof str === 'string' &&
    str != null &&
    str.length > 0 &&
    str.trim().length > 0)
  {
    return false;
  }

  return true;
}

utils.escapeHtml = function(text)
{
  return he.encode(text);
}

utils.formatTimeComponent = function(num)
{
  if (num < 10)
    return '0' + num;
  else
    return num.toString();
}

module.exports = utils;
