CREATE DATABASE  IF NOT EXISTS `mtld` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mtld`;
-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: j7a106.p.ssafy.io    Database: mtld
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `taking_medicine`
--

DROP TABLE IF EXISTS `taking_medicine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `taking_medicine` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `expect_date` date DEFAULT NULL,
  `dog_id` bigint DEFAULT NULL,
  `medicine_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKfwfousde144r0i5krnk2prf68` (`dog_id`),
  KEY `FKaxhs07kfrxhefnxacyupkq6ww` (`medicine_id`),
  CONSTRAINT `FKaxhs07kfrxhefnxacyupkq6ww` FOREIGN KEY (`medicine_id`) REFERENCES `medicine` (`id`),
  CONSTRAINT `FKfwfousde144r0i5krnk2prf68` FOREIGN KEY (`dog_id`) REFERENCES `dog` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taking_medicine`
--

LOCK TABLES `taking_medicine` WRITE;
/*!40000 ALTER TABLE `taking_medicine` DISABLE KEYS */;
INSERT INTO `taking_medicine` VALUES (40,'2023-05-14',59,2),(41,'2022-11-09',59,1),(42,'2023-04-19',59,3),(71,'2022-10-25',65,3),(72,'2022-10-19',65,1),(73,'2022-10-07',65,2),(77,'2022-11-16',60,1),(79,'2022-10-19',63,1),(80,'2022-10-20',64,3),(81,'2022-10-12',64,2),(82,'2022-10-26',64,1);
/*!40000 ALTER TABLE `taking_medicine` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-07  0:09:04
