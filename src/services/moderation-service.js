const moderationRepository = require('../data/moderation-repository');

const ModerationActionType =
{
  Unknown: 0,
  SubmitRecord: 1,      // i.e. for another user
  DeleteRecord: 2
};

const moderationService = {};

moderationService.logSubmitRecord = async function(userContext, record)
{
  const action = createModerationAction(userContext, ModerationActionType.SubmitRecord);
  action.Description = `Created record [${record.ID}] for user [${record.Player}] in category [${record.CategoryId}]`;
  action.RelatedId1 = record.ID;
  await logAction(action);
};

moderationService.logDeleteRecord = async function(userContext, record)
{
  const action = createModerationAction(userContext, ModerationActionType.DeleteRecord);
  action.Description = `Deleted record [${record.ID}] for user [${record.Player}] in category [${record.CategoryId}]`;
  action.RelatedId1 = record.ID;
  await logAction(action);
};

function createModerationAction(userContext, action)
{
  const moderationAction = 
  {
    UserId: userContext.user.ID,
    Action: action,
    Date: new Date(),
    IpAddress: userContext.ipAddress,
    UserAgent: userContext.userAgent
  };

  return moderationAction;
}

async function logAction(moderationAction)
{
  await moderationRepository.logModerationAction(moderationAction);
}

module.exports = moderationService;
