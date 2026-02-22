const leaderboardRepository = require('../data/leaderboard-repository');
const moderationService = require('./moderation-service');

const leaderboardService = {};

leaderboardService.getRecord = async function(id)
{
  return await leaderboardRepository.getRecord(id);
};

leaderboardService.getRecords = async function(categoryId, excludeRecordsWithoutVideo)
{
  return await leaderboardRepository.getRecords(categoryId, excludeRecordsWithoutVideo);
};

leaderboardService.addRecord = async function(userContext, record, isModeratorAction)
{
  await leaderboardRepository.addRecord(record);

  if (isModeratorAction)
  {
    await moderationService.logSubmitRecord(userContext, record);
  }
};

leaderboardService.deleteRecord = async function(userContext, record)
{
  const result = await leaderboardRepository.deleteRecord(record, userContext.ipAddress, userContext.user.Name);

  await moderationService.logDeleteRecord(userContext, record);

  return result;
};

leaderboardService.getAllRecords = async function()
{
  return await leaderboardRepository.getAllRecords();
};

leaderboardService.getAllDeletedRecords = async function()
{
  return await leaderboardRepository.getAllDeletedRecords();
};

module.exports = leaderboardService;
