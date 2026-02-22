const express = require('express');
const authentication = require('../middlewares/authentication');
const leaderboardService = require('../services/leaderboard-service');

const router = express.Router();

// Score deletion log
// ----------------------------------------------------------------------------

router.get('/scoreDeletionLog', authentication.authorizeAdmin, async function(req, res, next)
{
  const records = await leaderboardService.getAllDeletedRecords();

  const viewModel = {};
  viewModel.layout = null;    // Force no hbs layout
  viewModel.Records = records;
  res.render('admin/scoreDeletionLog', viewModel);
});

module.exports = router;
