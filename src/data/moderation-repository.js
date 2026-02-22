const dbConnectionProvider = require('./db-connection-provider');

const moderationRepository = {};

moderationRepository.logModerationAction = async function(moderationAction)
{
  return await dbConnectionProvider.execute(async (connection) =>
  {
    const [result] = await connection.query(
      'INSERT INTO tblModerationLog SET ?',
      [ moderationAction ]);

    // Get moderation action ID
    moderationAction.Id = result.insertId;
  });
};

module.exports = moderationRepository;
