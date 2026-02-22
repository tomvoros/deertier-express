const config =
{
  // Authentication secret
  jwtSecret: process.env.JWT_SECRET,

  discordUrl: 'https://discord.gg/rT2fWZt',
  webContentBackupPath: '../WebContentBackup',
  homepageContentUrl: 'https://wiki.supermetroid.run/User:Phantomsnake/Deer_Tier_Homepage?action=render',

  // Key for admin commands
  adminKey: process.env.ADMIN_KEY,

  dbConnectionPool: 10,

  // Adjust database timezone offset to match the .net site deployed at MonsterASP.net
  dbTimezone: '-07:00',

  isPreviewSite: false
};

module.exports = config;
