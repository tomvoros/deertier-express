const dbConnectionProvider = require('./db-connection-provider');

const leaderboardRepository = {};

leaderboardRepository.getSections = async function()
{
  return await dbConnectionProvider.execute(async (connection) =>
  {
    const [sections] = await connection.execute('SELECT * FROM refSections ORDER BY ID');
    return sections;
  });
};

leaderboardRepository.getCategories = async function()
{
  return await dbConnectionProvider.execute(async (connection) =>
  {
    const [categories] = await connection.execute('SELECT * FROM tblCategories WHERE Enabled = 1 ORDER BY ID');
    return categories;
  });
};

leaderboardRepository.getRecord = async function(id)
{
  return await dbConnectionProvider.execute(async (connection) =>
  {
    const [records] = await connection.execute(
      'SELECT * FROM tblRecords WHERE ID = :Id LIMIT 1',
      { Id: id }
    );

    return records?.[0];
  });
};

leaderboardRepository.getRecords = async function(categoryId, excludeRecordsWithoutVideo)
{
  return await dbConnectionProvider.execute(async (connection) =>
  {
    let sql = 'SELECT * FROM tblRecords WHERE CategoryId = :CategoryId';
    if (excludeRecordsWithoutVideo)
    {
      sql += ' AND VideoURL <> \'\'';
    }

    const [records] = await connection.execute(
      sql,
      { CategoryId: categoryId });
    
    return records;
  });
};

leaderboardRepository.addRecord = async function(record)
{
  return await dbConnectionProvider.execute(async (connection) =>
  {
    try
    {
      await connection.beginTransaction();
    
      // Delete existing record
      await connection.execute(
        'DELETE FROM tblRecords WHERE Player = :Player AND CategoryId = :CategoryId LIMIT 1',
        { Player: record.Player, CategoryId: record.CategoryId });
      
      // Insert new record
      const [result] = await connection.query(
        'INSERT INTO tblRecords SET ?',
        [ record ]);

      await connection.commit();

      // Get new record ID
      record.ID = result.insertId;
    } 
    catch (error)
    {
      await connection.rollback();
      throw error;
    }
  });
};

leaderboardRepository.deleteRecord = async function(record, ipAddress, moderator)
{
  return await dbConnectionProvider.execute(async (connection) =>
  {
    try
    {
      await connection.beginTransaction();
    
      await connection.execute(
        'DELETE FROM tblRecords WHERE ID = :Id LIMIT 1',
        { Id: record.ID });
      
      await connection.query(
        'INSERT INTO tblRecordDeletionLog SET ?',
        [ { ...record, Moderator: moderator, DeletionDate: new Date(), IPAddress: ipAddress } ]);

      await connection.commit();

      return true;
    } 
    catch (error)
    {
      await connection.rollback();
      return false;
    }
  });
};

leaderboardRepository.getAllRecords = async function()
{
  return await dbConnectionProvider.execute(async (connection) =>
  {
    const [records] = await connection.execute('SELECT * FROM tblRecords');
    return records;
  });
};

leaderboardRepository.getAllDeletedRecords = async function()
{
  return await dbConnectionProvider.execute(async (connection) =>
  {
    const [results] = await connection.execute('SELECT * FROM tblRecordDeletionLog ORDER BY ID DESC');
    return results;
  });
};

module.exports = leaderboardRepository;
