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
-- Table structure for table `upload_file`
--

DROP TABLE IF EXISTS `upload_file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `upload_file` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `record_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKqd16g4c7q04hr2sg40urm5vey` (`record_id`),
  CONSTRAINT `FKqd16g4c7q04hr2sg40urm5vey` FOREIGN KEY (`record_id`) REFERENCES `record` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `upload_file`
--

LOCK TABLES `upload_file` WRITE;
/*!40000 ALTER TABLE `upload_file` DISABLE KEYS */;
INSERT INTO `upload_file` VALUES (1,'2022-10-03 07:48:30','2022-10-03 07:48:30','ea3787d7-a938-4fdb-bc82-4cd244452ab3.png','https://a106mtld.s3.ap-northeast-2.amazonaws.com/ea3787d7-a938-4fdb-bc82-4cd244452ab3.png',1),(4,'2022-10-05 05:38:41','2022-10-05 05:38:41','36ee310f-20c4-482d-b706-fa8374a7fe28.jpg','https://a106mtld.s3.ap-northeast-2.amazonaws.com/36ee310f-20c4-482d-b706-fa8374a7fe28.jpg',16),(5,'2022-10-05 07:46:10','2022-10-05 07:46:10','5fa35b96-6588-49f7-94b4-ce6338112696.png','https://a106mtld.s3.ap-northeast-2.amazonaws.com/5fa35b96-6588-49f7-94b4-ce6338112696.png',18),(6,'2022-10-05 15:35:54','2022-10-05 15:35:54','362b14cf-c413-4bfe-8111-b98d0edbf8ff.jpg','https://a106mtld.s3.ap-northeast-2.amazonaws.com/362b14cf-c413-4bfe-8111-b98d0edbf8ff.jpg',24),(7,'2022-10-05 15:35:54','2022-10-05 15:35:54','e7c7c0d1-f5f3-49fe-9113-39de7eb16873.jpg','https://a106mtld.s3.ap-northeast-2.amazonaws.com/e7c7c0d1-f5f3-49fe-9113-39de7eb16873.jpg',24),(9,'2022-10-06 07:52:10','2022-10-06 07:52:10','e91bfa04-8755-40ed-8444-d6e52c0b7dc7.jpg','https://a106mtld.s3.ap-northeast-2.amazonaws.com/e91bfa04-8755-40ed-8444-d6e52c0b7dc7.jpg',37),(10,'2022-10-06 09:38:29','2022-10-06 09:38:29','32491159-d2f0-4651-bbc1-286d31427e0d.jpg','https://a106mtld.s3.ap-northeast-2.amazonaws.com/32491159-d2f0-4651-bbc1-286d31427e0d.jpg',40);
/*!40000 ALTER TABLE `upload_file` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-07  0:09:05
