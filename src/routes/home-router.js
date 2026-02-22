const express = require('express');
const config = require('../config/config');
const utils = require('../common/utils');
const accountService = require('../services/account-service');
const webContentService = require('../services/web-content-service');
const logger = require('../common/logger')(__filename);

const router = express.Router();

// Homepage
// ----------------------------------------------------------------------------

router.get('/', async function(req, res, next)
{
  const moderators = (await accountService.getModerators())
    .sort(new Intl.Collator().compare);

  let moderatorsText = '';
  for (let i = 0; i < moderators.length; i++)
  {
    if (i == moderators.length - 2)
    {
      moderatorsText += moderators[i] + ' and ';
    }
    else if (i == moderators.length - 1)
    {
      moderatorsText += moderators[i];
    }
    else
    {
      moderatorsText += moderators[i] + ', ';
    }
  }

  const viewModel = {};
  viewModel.Title = 'Home';
  viewModel.EmbeddedHtmlContent = await getHomepageContent();
  viewModel.FormattedModerators = moderatorsText;
  viewModel.DiscordUrl = config.discordUrl;

  res.render('home/index', viewModel);
});

async function getHomepageContent()
{
  try
  {
    const homepageContent = await webContentService.getContent(config.homepageContentUrl);
    if (utils.isNullOrWhitespace(homepageContent))
    {
      throw new Error('No homepage content');
    }
    return homepageContent;
  }
  catch (ex)
  {
    logger.error('Failed to get homepage content', ex);
    return '[Failed to load homepage content.]';
  }
}

// News
// ----------------------------------------------------------------------------

router.get('/news', async function(req, res, next)
{
  const viewModel = {};
  viewModel.Title = 'News';

  res.render('home/news', viewModel);
});

module.exports = router;
