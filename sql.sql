CREATE DATABASE  IF NOT EXISTS `property_management` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `property_management`;
-- MySQL dump 10.13  Distrib 5.7.9, for Win64 (x86_64)
--
-- Host: localhost    Database: property_management
-- ------------------------------------------------------
-- Server version	5.6.31-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tel` varchar(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `sex` enum('0','1') DEFAULT '1',
  `email` varchar(45) DEFAULT NULL,
  `permission` enum('normal','super') DEFAULT 'normal',
  `password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tel_UNIQUE` (`tel`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='物业管理员信息';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'134','sofia','0','111@qq.com','normal','$2a$12$/Qs3nXDWh403VRJ8FukJ4ewTbY1Z12EBwEmPzYXPrtG0sVEmFcZFe');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `announcement`
--

DROP TABLE IF EXISTS `announcement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `announcement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `content` text,
  `date` datetime DEFAULT NULL,
  `admin_tel` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='公告';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `announcement`
--

LOCK TABLES `announcement` WRITE;
/*!40000 ALTER TABLE `announcement` DISABLE KEYS */;
INSERT INTO `announcement` VALUES (1,'公告标题1','公告内容公告内容','2022-04-04 15:00:00',134),(2,'公告标题2','公告内容公告内容','2022-04-09 14:35:00',134),(3,'公告标题3','公告内容公告内容','2022-04-10 09:53:00',134),(4,'公告标题4','公告内容公告内容','2022-04-10 14:37:00',134),(5,'公告标题5','公告内容公告内容','2022-04-10 14:37:00',134),(6,'公告标题6','公告内容公告内容','2022-04-10 14:51:00',134),(7,'公告标题6','公告内容公告内容','2022-04-10 14:51:00',134),(8,'请自觉做核酸','请各位居民自觉到核酸点测核酸','2022-04-11 11:04:00',134),(9,'请自觉做核酸','请各位居民自觉到核酸点测核酸','2022-04-11 11:20:00',134);
/*!40000 ALTER TABLE `announcement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `building`
--

DROP TABLE IF EXISTS `building`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `building` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COMMENT='楼';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `building`
--

LOCK TABLES `building` WRITE;
/*!40000 ALTER TABLE `building` DISABLE KEYS */;
INSERT INTO `building` VALUES (1,'A1'),(15,'A4'),(16,'B2'),(17,'B3');
/*!40000 ALTER TABLE `building` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `community`
--

DROP TABLE IF EXISTS `community`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `community` (
  `name` varchar(50) NOT NULL,
  `created` date DEFAULT NULL,
  `describe` text,
  `phone` varchar(45) DEFAULT NULL,
  `address` text,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `community`
--

LOCK TABLES `community` WRITE;
/*!40000 ALTER TABLE `community` DISABLE KEYS */;
INSERT INTO `community` VALUES ('小区名2','2015-04-04','小区简介小区简介小区简介小区简介小区简介小区简介','010-1111111','地址地址地址地址地址地址地址');
/*!40000 ALTER TABLE `community` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `complaint`
--

DROP TABLE IF EXISTS `complaint`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `complaint` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contacts` varchar(45) NOT NULL,
  `tel` varchar(45) NOT NULL,
  `describe` text NOT NULL,
  `date` datetime NOT NULL,
  `status` varchar(45) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='投诉信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `complaint`
--

LOCK TABLES `complaint` WRITE;
/*!40000 ALTER TABLE `complaint` DISABLE KEYS */;
INSERT INTO `complaint` VALUES (1,'bill','133','昨晚A1201大晚上的咚咚咚，有点影响到人休息了。','2022-04-09 12:12:00','1'),(2,'马','144','保安态度太差了','2022-04-09 12:12:00','0');
/*!40000 ALTER TABLE `complaint` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `family`
--

DROP TABLE IF EXISTS `family`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `family` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `resident_id` int(11) NOT NULL,
  `idcard` varchar(18) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `sex` enum('0','1') DEFAULT '1',
  `birthday` date DEFAULT NULL,
  `relation` varchar(45) DEFAULT NULL COMMENT '关系',
  `tel` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `family`
--

LOCK TABLES `family` WRITE;
/*!40000 ALTER TABLE `family` DISABLE KEYS */;
INSERT INTO `family` VALUES (1,1,'441621200011110000','biu','1','2000-11-11','兄弟','13311112222');
/*!40000 ALTER TABLE `family` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `healthy`
--

DROP TABLE IF EXISTS `healthy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `healthy` (
  `id` int(11) NOT NULL,
  `release_time` date DEFAULT NULL COMMENT '发起日期',
  `room` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `symptom` varchar(45) DEFAULT NULL COMMENT '症状',
  `temperature` varchar(45) DEFAULT NULL COMMENT '体温',
  `supplement` text COMMENT '补充',
  `report_time` datetime DEFAULT NULL COMMENT '上报时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='健康信息';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `healthy`
--

LOCK TABLES `healthy` WRITE;
/*!40000 ALTER TABLE `healthy` DISABLE KEYS */;
/*!40000 ALTER TABLE `healthy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parking`
--

DROP TABLE IF EXISTS `parking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `parking` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `resident_tel` varchar(11) DEFAULT NULL,
  `license` varchar(45) DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `number_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='车位';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parking`
--

LOCK TABLES `parking` WRITE;
/*!40000 ALTER TABLE `parking` DISABLE KEYS */;
INSERT INTO `parking` VALUES (1,'P1001','133','粤P 53F25','2022-04-04'),(2,'P1002',NULL,NULL,NULL),(3,'P1003',NULL,NULL,NULL),(4,'P2001',NULL,NULL,NULL),(5,'P2002',NULL,NULL,NULL),(6,'P2003',NULL,NULL,NULL),(7,'P2004',NULL,NULL,NULL),(8,'P2005',NULL,NULL,NULL),(9,'P2006',NULL,NULL,NULL),(10,'P2007',NULL,NULL,NULL);
/*!40000 ALTER TABLE `parking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(45) DEFAULT NULL,
  `room` varchar(20) DEFAULT NULL COMMENT '描述',
  `current` double DEFAULT NULL COMMENT '水/电当月数值',
  `curryear` int(11) DEFAULT NULL COMMENT '当月日期',
  `currmonth` int(11) DEFAULT NULL,
  `amount` double DEFAULT NULL COMMENT '金额',
  `handler` varchar(45) DEFAULT '0' COMMENT '处理人',
  `paydate` datetime DEFAULT NULL COMMENT '支付日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='缴费信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (1,'水','A1102',6,2022,2,30,'bill','2022-04-10 13:07:00'),(2,'水','A1102',5,2022,3,25,'bill','2022-04-10 17:04:00'),(3,'电','A1102',100,2022,2,67,'bill','2022-04-10 17:04:00'),(4,'电','A1102',90,2022,3,60.3,'bill','2022-04-10 18:04:00'),(5,'电','A1102',90,2022,4,60.3,'bill','2022-04-11 22:31:00'),(6,'水','A1102',7,2022,4,35,'0',NULL),(7,'水','A1102',9,2022,1,45,'0',NULL),(8,'水','A1102',6,2021,12,30,'0',NULL),(9,'电','A1102',100,2022,1,67,'0',NULL),(10,'电','A1102',110,2021,12,70,'0',NULL);
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pet`
--

DROP TABLE IF EXISTS `pet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `resident` int(11) NOT NULL,
  `variety` varchar(45) DEFAULT NULL COMMENT '品种',
  `name` varchar(45) DEFAULT NULL,
  `documents` enum('0','1') DEFAULT '0' COMMENT '证件',
  `path` varchar(100) DEFAULT NULL COMMENT '图片路径',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='宠物';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pet`
--

LOCK TABLES `pet` WRITE;
/*!40000 ALTER TABLE `pet` DISABLE KEYS */;
/*!40000 ALTER TABLE `pet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `repair`
--

DROP TABLE IF EXISTS `repair`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `repair` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contacts` varchar(45) NOT NULL,
  `tel` varchar(45) NOT NULL,
  `room` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL COMMENT '报修类型',
  `describe` text NOT NULL,
  `date` datetime NOT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='报修信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `repair`
--

LOCK TABLES `repair` WRITE;
/*!40000 ALTER TABLE `repair` DISABLE KEYS */;
INSERT INTO `repair` VALUES (1,'廖弼镕','13376774751','A1101','水电维修','水龙头不紧密，一直滴水','2022-04-10 20:04:00',0),(2,'廖弼镕','13376774751','A1101','家具门窗','房间门锁坏了，打不开了','2022-04-10 20:04:00',0);
/*!40000 ALTER TABLE `repair` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resident`
--

DROP TABLE IF EXISTS `resident`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `resident` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tel` varchar(11) NOT NULL COMMENT '手机号',
  `idcard` varchar(18) NOT NULL,
  `name` varchar(20) NOT NULL COMMENT '名字',
  `sex` enum('0','1') DEFAULT '1',
  `email` varchar(45) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `living` enum('0','1') DEFAULT '1' COMMENT '1为居住中',
  `date` date DEFAULT NULL COMMENT '入住时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `tel_UNIQUE` (`tel`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='住户信息';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resident`
--

LOCK TABLES `resident` WRITE;
/*!40000 ALTER TABLE `resident` DISABLE KEYS */;
INSERT INTO `resident` VALUES (1,'133','441621199901012323','bill','0','lbr@163.com','1999-01-01','$2a$12$/Qs3nXDWh403VRJ8FukJ4ewTbY1Z12EBwEmPzYXPrtG0sVEmFcZFe','1','2020-04-04'),(2,'144','441621199901012345','马3','1','lbr@qq.com','1999-01-01','$2a$12$BWyRDE69V/Tf23zHBP4aluJZ6LWxBavMUuCvHtjyPscDat5GEIr7.','1','2020-04-04');
/*!40000 ALTER TABLE `resident` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `room` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `building_id` int(11) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `living` enum('0','1') DEFAULT '0',
  `resident_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_room_building_idx` (`building_id`),
  CONSTRAINT `FK_room_building` FOREIGN KEY (`building_id`) REFERENCES `building` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (1,1,'A1101','0',NULL),(2,1,'A1102','1',1),(11,15,'A4101','1',2),(12,15,'A4102','0',NULL),(13,15,'A4103','0',NULL),(14,15,'A4201','0',NULL),(15,15,'A4202','0',NULL),(16,15,'A4203','0',NULL),(17,16,'B2101','0',NULL),(18,16,'B2102','0',NULL),(19,16,'B2103','0',NULL),(20,16,'B2201','0',NULL),(21,16,'B2202','0',NULL),(22,16,'B2203','0',NULL),(23,16,'B2301','0',NULL),(24,16,'B2302','0',NULL);
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visitor`
--

DROP TABLE IF EXISTS `visitor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `visitor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `room` varchar(45) DEFAULT NULL,
  `resident` varchar(45) DEFAULT NULL,
  `purpose` varchar(45) DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visitor`
--

LOCK TABLES `visitor` WRITE;
/*!40000 ALTER TABLE `visitor` DISABLE KEYS */;
/*!40000 ALTER TABLE `visitor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'property_management'
--

--
-- Dumping routines for database 'property_management'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-23 23:40:52
