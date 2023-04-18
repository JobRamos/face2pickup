CREATE DATABASE  IF NOT EXISTS `base-escuela` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `base-escuela`;
-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: base-escuela
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `addresses` (
  `AddressID` int NOT NULL AUTO_INCREMENT,
  `UserID` int DEFAULT NULL,
  `FullName` varchar(50) NOT NULL,
  `StreetAddress` varchar(255) NOT NULL,
  `PostCode` varchar(5) NOT NULL,
  `City` varchar(28) NOT NULL,
  `Country` varchar(28) NOT NULL,
  PRIMARY KEY (`AddressID`),
  KEY `FK_Users_UserID` (`UserID`),
  CONSTRAINT `FK_Users_UserID` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES (1,1,'Admin','Vanha Maantie 6','02650','Espoo','Finland'),(16,4,'llera','42427171','09','2029','837'),(17,4,'leo llera','4444','09','2028','111');
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `CategoryID` int NOT NULL AUTO_INCREMENT,
  `CategoryName` varchar(250) NOT NULL,
  PRIMARY KEY (`CategoryID`),
  KEY `CategoryName` (`CategoryName`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (13,'1A'),(18,'1B'),(21,'1C'),(22,'2A'),(23,'2B'),(12,'2C'),(24,'3A'),(25,'3B'),(26,'3C');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `MessageID` int NOT NULL AUTO_INCREMENT,
  `FullName` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Subject` varchar(128) DEFAULT NULL,
  `Content` varchar(158) DEFAULT NULL,
  PRIMARY KEY (`MessageID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,'hnj','jobdavid107@gmail.com','byuhnij','uhnjimk'),(2,'llera','vgjhbbkjnknlj@mail.com','uhnjimko,','hunjik'),(3,'llera','lleralj@mail.com','fvgbh','tfyguh');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order details`
--

DROP TABLE IF EXISTS `order details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order details` (
  `OrderID` int NOT NULL,
  `ProductID` int NOT NULL,
  `Quantity` smallint NOT NULL DEFAULT '1',
  `Total` decimal(10,2) NOT NULL,
  PRIMARY KEY (`OrderID`,`ProductID`),
  KEY `FK_Order_Details_Products` (`ProductID`),
  CONSTRAINT `FK_Order_Details_Orders` FOREIGN KEY (`OrderID`) REFERENCES `orders` (`OrderID`) ON DELETE CASCADE,
  CONSTRAINT `FK_Order_Details_Products` FOREIGN KEY (`ProductID`) REFERENCES `products` (`ProductID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order details`
--

LOCK TABLES `order details` WRITE;
/*!40000 ALTER TABLE `order details` DISABLE KEYS */;
/*!40000 ALTER TABLE `order details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `OrderID` int NOT NULL AUTO_INCREMENT,
  `UserID` int NOT NULL,
  `SubTotal` decimal(10,2) DEFAULT NULL,
  `Discount` decimal(10,2) DEFAULT NULL,
  `Total` decimal(10,2) DEFAULT NULL,
  `OrderDate` datetime DEFAULT NULL,
  `Status` varchar(150) NOT NULL,
  PRIMARY KEY (`OrderID`),
  KEY `FK_Orders_Users` (`UserID`),
  CONSTRAINT `FK_Orders_Users` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,4,522.99,0.00,522.99,'2023-04-05 07:18:19','Order Received'),(2,4,2901.45,0.00,2901.45,'2023-04-05 08:13:49','Order Received'),(3,1,16789.00,0.00,16789.00,'2023-04-06 16:21:12','Order Received'),(4,4,22467.00,0.00,22467.00,'2023-04-09 08:50:29','Order Received'),(5,4,500.22,0.00,500.22,'2023-04-09 09:02:54','Order Received'),(6,4,19434.00,0.00,19434.00,'2023-04-09 12:39:43','Processing'),(7,4,6278.00,0.00,6278.00,'2023-04-09 15:21:58','Order Received'),(8,4,800.00,0.00,800.00,'2023-04-09 15:23:09','Order Received'),(9,4,2000.88,0.00,2000.88,'2023-04-09 15:26:44','Order Received'),(10,4,500.22,0.00,500.22,'2023-04-09 15:34:53','Order Received'),(11,4,2400.00,0.00,2400.00,'2023-04-09 15:44:32','Order Received'),(12,4,700.00,0.00,700.00,'2023-04-09 15:46:04','Order Received'),(13,4,600.00,0.00,600.00,'2023-04-09 15:48:36','Order Received'),(14,4,1200.00,0.00,1200.00,'2023-04-09 15:50:00','Order Received'),(15,4,16789.00,0.00,16789.00,'2023-04-09 15:53:13','Order Received'),(16,4,5678.00,0.00,5678.00,'2023-04-09 15:54:42','Order Received'),(17,4,1000.00,0.00,1000.00,'2023-04-09 15:56:23','Order Received'),(18,4,500.22,0.00,500.22,'2023-04-09 15:58:51','Order Received'),(19,4,600.00,0.00,600.00,'2023-04-09 15:59:58','Order Received'),(20,4,5678.00,0.00,5678.00,'2023-04-09 16:00:58','Order Received'),(21,4,16789.00,0.00,16789.00,'2023-04-09 16:01:46','Order Received'),(22,4,1200.00,0.00,1200.00,'2023-04-09 16:07:00','Order Received'),(23,4,5678.00,0.00,5678.00,'2023-04-09 16:09:38','Processed'),(24,4,34378.00,0.00,34378.00,'2023-04-12 14:25:32','Order Received'),(25,4,500.22,0.00,500.22,'2023-04-12 17:27:08','Order Received'),(26,4,1200.00,0.00,1200.00,'2023-04-12 17:30:03','Order Received'),(27,4,600.00,0.00,600.00,'2023-04-12 17:31:42','Order Received'),(28,4,6478.00,0.00,6478.00,'2023-04-12 17:42:05','Order Received'),(29,4,700.00,0.00,700.00,'2023-04-12 17:48:04','Order Received'),(30,4,800.00,0.00,800.00,'2023-04-12 17:49:03','Delivered'),(33,4,5678.00,0.00,5678.00,'2023-04-12 19:14:56','Order Received'),(34,4,700.00,0.00,700.00,'2023-04-12 19:20:00','Order Received'),(35,4,5678.00,0.00,5678.00,'2023-04-12 22:08:14','Order Received'),(36,4,5678.00,0.00,5678.00,'2023-04-12 22:09:22','Order Received'),(37,4,16789.00,0.00,16789.00,'2023-04-12 22:23:34','Order Received'),(38,4,1400.00,0.00,1400.00,'2023-04-13 11:26:53','Order Received'),(39,4,580.00,0.00,580.00,'2023-04-13 11:27:47','Order Received'),(40,4,800.00,0.00,800.00,'2023-04-13 11:32:23','Order Received'),(41,4,500.22,0.00,500.22,'2023-04-13 11:36:14','Order Received'),(42,4,5678.00,0.00,5678.00,'2023-04-13 12:00:20','Order Received'),(43,4,500.22,0.00,500.22,'2023-04-13 12:01:35','Order Received'),(44,4,700.00,0.00,700.00,'2023-04-13 12:03:33','Order Received');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `padres`
--

DROP TABLE IF EXISTS `padres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `padres` (
  `PadreID` int NOT NULL AUTO_INCREMENT,
  `PadreNombre` varchar(250) NOT NULL,
  PRIMARY KEY (`PadreID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `padres`
--

LOCK TABLES `padres` WRITE;
/*!40000 ALTER TABLE `padres` DISABLE KEYS */;
INSERT INTO `padres` VALUES (1,'Juan Perez'),(2,'Brenda Flores'),(3,'Gerardo Ramos'),(6,'Ines Barrios'),(7,'Ainara Macias'),(8,'John Palomares'),(9,'Santiago Portillo'),(10,'Anais Macias'),(11,'Alejandro Burgos'),(12,'Maria Alegre');
/*!40000 ALTER TABLE `padres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `ProductID` int NOT NULL AUTO_INCREMENT,
  `ProductName` varchar(255) NOT NULL,
  `CategoryID` int DEFAULT NULL,
  `padre1` varchar(250) DEFAULT NULL,
  `padre2` varchar(250) DEFAULT NULL,
  `padre3` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`ProductID`),
  KEY `FK_Products_Categories` (`CategoryID`),
  KEY `ProductName` (`ProductName`),
  CONSTRAINT `FK_Products_Categories` FOREIGN KEY (`CategoryID`) REFERENCES `categories` (`CategoryID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (41,'herry hdz',12,'Gerardo Ramos','Brenda Flores','Juan Perez'),(42,'jessica portillo',12,'Brenda Flores','Juan Perez','Gerardo Ramos'),(43,'pedor montes',13,'Brenda Flores','Gerardo Ramos','Juan Perez'),(44,'jose lopez',18,'Brenda Flores','Gerardo Ramos','Juan Perez');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscribers`
--

DROP TABLE IF EXISTS `subscribers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscribers` (
  `Email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscribers`
--

LOCK TABLES `subscribers` WRITE;
/*!40000 ALTER TABLE `subscribers` DISABLE KEYS */;
INSERT INTO `subscribers` VALUES ('javier_xmd@hotmail.com'),('avgagh@mail.com');
/*!40000 ALTER TABLE `subscribers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `FullName` varchar(50) NOT NULL,
  `Phone` varchar(12) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Username` varchar(28) DEFAULT NULL,
  `Password` varchar(158) DEFAULT NULL,
  `Admin` tinyint(1) NOT NULL DEFAULT '0',
  `Grupo` varchar(45) NOT NULL,
  PRIMARY KEY (`UserID`),
  KEY `Username` (`Username`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin','0123456789','admin@astore.com','admin','$2a$10$mpJCYlSr762SwQVzdLwxR.KgRuWEHA2NzUanxxG/nxEStDRcRBbB6',1,'13'),(4,'llera leo','558888818','lleramail@mail.com','llera01','$2a$10$SWMOjlKVBlE35gj1u554PuJE0pmHA33RjAml8U7ZjFgMfOzvtD.0S',0,'13'),(15,'prof','6478937','proftest3@mail.com','prof','$2a$10$3ERfEykG5aA30VepVWTP8eFN.XfyYVpF.38Q.g84z37kmzSl9T0.q',0,'12'),(21,'prof6','5678','32test3@mail.com','prof6','$2a$10$nD6CRmCakUOsZ5QPmH4aYO2QVCmh78UUIam2cosxvEo6wj4z4PtHC',0,'12'),(22,'prof7','345678','7test3@mail.com','prof7','$2a$10$hDYNbaZC9zFIVXwTac0POu//ts5jR2JKb2jGOpG7VaqfgeSz.gnOq',0,'22');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-17 15:09:19
