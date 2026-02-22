const utils = require('./utils');

const handlebarsExtensions = {};

handlebarsExtensions.register = function(hbs)
{
  hbs.registerHelper('encodeURI', encodeURI);
  hbs.registerHelper('encodeURIComponent', encodeURIComponent);
  hbs.registerHelper('escapeHtmlAttribute', utils.escapeHtml);

  // Helper for some simple expressions to use in #if conditions
  // Reference: https://stackoverflow.com/a/31632215
  hbs.registerHelper(
  {
    eq: (v1, v2) => v1 === v2,
    ne: (v1, v2) => v1 !== v2,
    lt: (v1, v2) => v1 < v2,
    gt: (v1, v2) => v1 > v2,
    lte: (v1, v2) => v1 <= v2,
    gte: (v1, v2) => v1 >= v2,
    and()
    {
      return Array.prototype.every.call(arguments, Boolean);
    },
    or()
    {
      return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
    }
  });
};

module.exports = handlebarsExtensions;
