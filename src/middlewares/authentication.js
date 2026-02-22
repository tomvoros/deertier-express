const jwt = require('jsonwebtoken');
const config = require('../config/config');
const utils = require('../common/utils');

const authentication = {};

const authTokenCookie = 'authtoken';
const authTokenCookieLifetime = 60 * 60 * 24 * 365 * 1000;

authentication.createToken = function(req, res, username)
{
  const token = jwt.sign(username, config.jwtSecret);
  res.cookie(authTokenCookie, token, { maxAge: authTokenCookieLifetime, httpOnly:true });
  req.username = username;
};

authentication.destroyToken = function(req, res)
{
  res.clearCookie(authTokenCookie);
  req.username = null;
};

authentication.authenticate = function(req, res, next)
{
  const token = req.cookies[authTokenCookie];
  if (token == null)
  {
    next();
    return;
  }

  jwt.verify(token, config.jwtSecret, (err, username) =>
  {
    if (!err)
    {
      req.username = username;
    }

    next();
  });
};

authentication.authorize = function(req, res, next)
{
  if (req.username)
  {
    next();
  }
  else
  {
    const returnUrl = req.originalUrl;
    res.redirect(`/account/login?returnUrl=${encodeURIComponent(returnUrl)}`);
  }
};

authentication.authorizeAdmin = function(req, res, next)
{
  // Verify adminKey in request query
  if (!utils.isNullOrWhitespace(config.adminKey) &&
    req.query.adminKey == config.adminKey)
  {
    next();
  }
  else
  {
    res.send('unauthorized access');
  }
};

module.exports = authentication;
