-- refSections is the table for top level sections (i.e. NMG, MG, Misc)

CREATE TABLE `refSections` (
  `Id` int NOT NULL,
  `Name` varchar(200) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
