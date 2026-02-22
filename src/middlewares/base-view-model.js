const config = require('../config/config');
const accountService = require('../services/account-service');
const categoryService = require('../services/category-service');

const baseViewModel = {};

baseViewModel.handleRequest = async function(req, res, next)
{
  const user = await accountService.getAuthenticatedUser(req);

  res.locals.RequestUrl = req.originalUrl;
  res.locals.IsAuthenticated = !!user;
  res.locals.Username = user?.Name;
  res.locals.IsModerator = user?.IsModerator;
  res.locals.CurrentYear = new Date().getFullYear();  
  res.locals.IsPreviewSite = config.isPreviewSite;

  res.locals.MainCategories =
  {
    Sections: await categoryService.getSectionModels()
  };

  next();
};

module.exports = baseViewModel;
