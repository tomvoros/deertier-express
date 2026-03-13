-- tblRecords is the table that holds records (i.e. times/runs) for all categories

-- TODO: 
-- - replace the Player column with UserId
-- - remove RealTimeString and GameTimeString columns
-- - normalize how times are stored in general

CREATE TABLE `tblRecords` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `CategoryId` int NOT NULL,
  `Player` varchar(100) NOT NULL,
  `RealTimeSeconds` int NOT NULL,
  `RealTimeString` varchar(100) NOT NULL,
  `GameTimeSeconds` int DEFAULT NULL,
  `GameTimeString` varchar(100) DEFAULT NULL,
  `Comment` varchar(100) DEFAULT NULL,
  `VideoURL` varchar(100) DEFAULT NULL,
  `CeresTime` decimal(4,2) DEFAULT NULL,
  `DateSubmitted` datetime(6) DEFAULT NULL,
  `SubmittedByUserId` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `idx_tblRecords_CategoryId` (`CategoryId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
