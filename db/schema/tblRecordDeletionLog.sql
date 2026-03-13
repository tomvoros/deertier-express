-- tblRecordDeletionLog keeps a copy of every record that is deleted from tblRecords

-- TODO:
-- - consider leaving deleted records in tblRecords with an IsDeleted flag instead of copying them here

CREATE TABLE `tblRecordDeletionLog` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Moderator` varchar(100) NOT NULL,
  `DeletionDate` datetime(6) DEFAULT NULL,
  `CategoryId` int NOT NULL,
  `Player` varchar(100) NOT NULL,
  `RealTimeString` varchar(100) NOT NULL,
  `GameTimeString` varchar(100) DEFAULT NULL,
  `RealTimeSeconds` int NOT NULL,
  `GameTimeSeconds` int DEFAULT NULL,
  `Comment` varchar(100) DEFAULT NULL,
  `VideoURL` varchar(100) DEFAULT NULL,
  `CeresTime` decimal(4,2) DEFAULT NULL,
  `DateSubmitted` datetime(6) DEFAULT NULL,
  `SubmittedByUserId` int DEFAULT NULL,
  `IPAddress` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
