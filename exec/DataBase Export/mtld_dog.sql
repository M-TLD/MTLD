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
-- Table structure for table `dog`
--

DROP TABLE IF EXISTS `dog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dog` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `disease` varchar(255) DEFAULT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `fileurl` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `neuter` varchar(255) NOT NULL,
  `weight` double DEFAULT NULL,
  `breed_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK4tvvv2i46nj971wytegby63qx` (`breed_id`),
  KEY `FKo31cdwhh8udulmq760j9jy0aw` (`user_id`),
  CONSTRAINT `FK4tvvv2i46nj971wytegby63qx` FOREIGN KEY (`breed_id`) REFERENCES `breed` (`id`),
  CONSTRAINT `FKo31cdwhh8udulmq760j9jy0aw` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dog`
--

LOCK TABLES `dog` WRITE;
/*!40000 ALTER TABLE `dog` DISABLE KEYS */;
INSERT INTO `dog` VALUES (56,'2022-10-05 07:04:36','2022-10-06 01:17:21','2022-10-02','ㄴㄴ','4a555df0-0de5-4155-be4a-85bce0125edf.png','https://a106mtld.s3.ap-northeast-2.amazonaws.com/4a555df0-0de5-4155-be4a-85bce0125edf.png','MALE','오이ㅣㅣㅣ','Y',1,6,2),(57,'2022-10-05 07:17:51','2022-10-05 07:17:51','2022-10-02','ㄴㄴ','27c99f37-bc36-443e-9a9e-07d292549d4e.png','https://a106mtld.s3.ap-northeast-2.amazonaws.com/27c99f37-bc36-443e-9a9e-07d292549d4e.png','MALE','오이ㅣㅣㅣㅣ','N',2,1,2),(59,'2022-10-05 15:30:16','2022-10-05 15:30:16','2021-09-11','없음','16f91d7e-dd6b-4a17-adfd-0ec34c776623.jpg','https://a106mtld.s3.ap-northeast-2.amazonaws.com/16f91d7e-dd6b-4a17-adfd-0ec34c776623.jpg','FEMALE','바비','Y',29,1,4),(60,'2022-10-05 15:31:12','2022-10-05 15:31:12','2021-01-13','건강해욥','996c042b-9fd5-45aa-8858-1baf270c5de8.jpg','https://a106mtld.s3.ap-northeast-2.amazonaws.com/996c042b-9fd5-45aa-8858-1baf270c5de8.jpg','FEMALE','해리','Y',8,150,4),(61,'2022-10-06 01:19:47','2022-10-06 01:19:47','2018-06-13','각종 블랙아웃 및 제 2의 인격 깨어남','f2026a72-2e06-4801-b288-40618587cf83.png','https://a106mtld.s3.ap-northeast-2.amazonaws.com/f2026a72-2e06-4801-b288-40618587cf83.png','MALE','익진이','N',73.5,3,6),(63,'2022-10-06 02:20:03','2022-10-06 02:20:03','2018-09-12','없음','bc7f1ee6-d6d6-4be5-b493-9403b3c5fdaf.jpg','https://a106mtld.s3.ap-northeast-2.amazonaws.com/bc7f1ee6-d6d6-4be5-b493-9403b3c5fdaf.jpg','FEMALE','바비','Y',30,1,1),(64,'2022-10-06 07:07:52','2022-10-06 07:07:52','2022-10-05','없음','cd24bedf-43ea-46ee-987f-247060ed1614.jpeg','https://a106mtld.s3.ap-northeast-2.amazonaws.com/cd24bedf-43ea-46ee-987f-247060ed1614.jpeg','FEMALE','약먹자','Y',12,5,3),(65,'2022-10-06 07:08:23','2022-10-06 07:08:23','2022-10-03','없음','71829c50-9308-4bbd-a99e-3f55c7dee6a0.jpeg','https://a106mtld.s3.ap-northeast-2.amazonaws.com/71829c50-9308-4bbd-a99e-3f55c7dee6a0.jpeg','FEMALE','둘째','Y',12,5,3),(66,'2022-10-06 07:08:45','2022-10-06 07:08:45','2022-10-02','','2ff54684-265f-490d-a628-4b31bef01e0c.png','https://a106mtld.s3.ap-northeast-2.amazonaws.com/2ff54684-265f-490d-a628-4b31bef01e0c.png','MALE','세번째','N',12,2,3);
/*!40000 ALTER TABLE `dog` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-07  0:09:06
