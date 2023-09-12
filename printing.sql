-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               11.1.2-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for printing
CREATE DATABASE IF NOT EXISTS `printing` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;
USE `printing`;

-- Dumping structure for table printing.admin_tbl
CREATE TABLE IF NOT EXISTS `admin_tbl` (
  `id` int(11) NOT NULL,
  `full_name` varchar(80) NOT NULL,
  `user_name` varchar(80) NOT NULL,
  `user_password` text NOT NULL,
  `user_type` varchar(10) NOT NULL,
  `user_status` tinyint(1) NOT NULL,
  `ip_address` varchar(20) NOT NULL,
  `browser` varchar(20) NOT NULL,
  `create_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table printing.admin_tbl: ~0 rows (approximately)
DELETE FROM `admin_tbl`;
INSERT INTO `admin_tbl` (`id`, `full_name`, `user_name`, `user_password`, `user_type`, `user_status`, `ip_address`, `browser`, `create_date`) VALUES
	(1, 'test', 'test@gmail.com', '3627909a29c31381a071ec27f7c9ca97726182aed29a7ddd2e54353322cfb30abb9e3a6df2ac2c20fe23436311d678564d0c8d305930575f60e2d3d048184d79', 'admin', 1, '', '', '2023-09-09 08:10:25');

-- Dumping structure for table printing.customer_tbl
CREATE TABLE IF NOT EXISTS `customer_tbl` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer` varchar(50) NOT NULL DEFAULT '0',
  `phone` varchar(50) NOT NULL DEFAULT '0',
  `email` varchar(50) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `ip_address` varchar(50) DEFAULT NULL,
  `browser` varchar(50) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `submit_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table printing.customer_tbl: ~2 rows (approximately)
DELETE FROM `customer_tbl`;
INSERT INTO `customer_tbl` (`id`, `customer`, `phone`, `email`, `address`, `ip_address`, `browser`, `create_date`, `submit_date`) VALUES
	(1, 'shivam gupta', '9669729320', 'shivam.gupta.43620@gmail.com', 'raipur', '::1', 'Chrome', '2023-09-08 14:26:59', '2023-09-08 15:58:25'),
	(3, 'test test', '1234567899', '', 'raipur', '127.0.0.1', 'Firefox', '2023-09-09 16:19:17', NULL);

-- Dumping structure for table printing.design_tbl
CREATE TABLE IF NOT EXISTS `design_tbl` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(50) NOT NULL DEFAULT '0',
  `url` varchar(50) NOT NULL DEFAULT '0',
  `ip_address` varchar(50) DEFAULT NULL,
  `browser` varchar(50) DEFAULT NULL,
  `create_date` datetime NOT NULL,
  `submit_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table printing.design_tbl: ~4 rows (approximately)
DELETE FROM `design_tbl`;
INSERT INTO `design_tbl` (`id`, `type`, `url`, `ip_address`, `browser`, `create_date`, `submit_date`) VALUES
	(2, 'Invoice', 'invoice', '127.0.0.1', 'Firefox', '0000-00-00 00:00:00', '2023-09-08 13:21:49'),
	(3, 'Poster', 'poster', '127.0.0.1', 'Firefox', '0000-00-00 00:00:00', '2023-09-08 13:22:05'),
	(4, 'Id Card', 'id-card', '::1', 'Chrome', '2023-09-08 11:11:00', '2023-09-08 11:11:18'),
	(5, 'letter head', 'letter-head', '127.0.0.1', 'Firefox', '2023-09-09 16:22:18', NULL);

-- Dumping structure for table printing.enquiry_tbl
CREATE TABLE IF NOT EXISTS `enquiry_tbl` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `contact` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `message` varchar(50) NOT NULL,
  `ip_address` varchar(50) NOT NULL,
  `browser` varchar(50) NOT NULL,
  `create_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table printing.enquiry_tbl: ~1 rows (approximately)
DELETE FROM `enquiry_tbl`;
INSERT INTO `enquiry_tbl` (`id`, `name`, `email`, `contact`, `address`, `message`, `ip_address`, `browser`, `create_date`) VALUES
	(1, 'shivam gupta', '', '9669729320', 'raipur', 'test', '::1', 'Chrome 116.0.0.0', '2023-09-12 13:36:14'),
	(2, 'test', 'test@gmail.com', '6546544444', 'raiput', 'testing here', '::1', 'Chrome 116.0.0.0', '2023-09-12 13:59:46');

-- Dumping structure for table printing.image_tbl
CREATE TABLE IF NOT EXISTS `image_tbl` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(100) DEFAULT NULL,
  `Dtype` varchar(100) DEFAULT NULL,
  `ip_address` varchar(50) NOT NULL,
  `browser` varchar(50) NOT NULL,
  `create_date` datetime NOT NULL,
  `submit_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table printing.image_tbl: ~6 rows (approximately)
DELETE FROM `image_tbl`;
INSERT INTO `image_tbl` (`id`, `image`, `Dtype`, `ip_address`, `browser`, `create_date`, `submit_date`) VALUES
	(2, 'f9a307af11d8fb37e36a1d5bca6a92c2.jpg', 'Poster', '', '', '0000-00-00 00:00:00', NULL),
	(3, '99c7d92cfd589299e1a908542a9ee635.png', 'Invoice', '', '', '0000-00-00 00:00:00', NULL),
	(4, '66f08a8e0ca7c8f7234cac0b82c800bd.png', 'Invoice', '', '', '0000-00-00 00:00:00', NULL),
	(9, '81b13e85c3ba213b034da96bd39a989f.png', 'Invoice', '', '', '0000-00-00 00:00:00', NULL),
	(10, 'f558a757041bf9fbb9986ddd68df9a6d.png', 'Id Card', '::1', 'Chrome', '2023-09-08 11:21:05', NULL),
	(11, 'dae6565fb3f7471134f47bfb866494f4.png', 'letter head', '127.0.0.1', 'Firefox', '2023-09-09 16:22:35', NULL);

-- Dumping structure for table printing.stock_tbl
CREATE TABLE IF NOT EXISTS `stock_tbl` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product` varchar(100) DEFAULT NULL,
  `quantity` varchar(100) DEFAULT NULL,
  `available` varchar(100) DEFAULT '0',
  `ip_address` varchar(50) NOT NULL,
  `browser` varchar(50) NOT NULL,
  `create_date` datetime NOT NULL,
  `submit_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table printing.stock_tbl: ~6 rows (approximately)
DELETE FROM `stock_tbl`;
INSERT INTO `stock_tbl` (`id`, `product`, `quantity`, `available`, `ip_address`, `browser`, `create_date`, `submit_date`) VALUES
	(4, 'test', '100', '10', '', '', '0000-00-00 00:00:00', NULL),
	(5, 'test  2', '102', '119', '', '', '0000-00-00 00:00:00', NULL),
	(6, 'test  3', '30', '15', '::1', 'Chrome', '0000-00-00 00:00:00', '2023-09-12 11:59:27'),
	(7, 'paper', '15', '0', '', '', '0000-00-00 00:00:00', NULL),
	(8, 'Printer Ink', '58', '0', '::1', 'Chrome', '2023-09-08 11:06:08', NULL),
	(9, 'test product', '100', '0', '127.0.0.1', 'Firefox', '2023-09-09 16:21:18', NULL);

-- Dumping structure for table printing.work_tbl
CREATE TABLE IF NOT EXISTS `work_tbl` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` varchar(50) DEFAULT NULL,
  `work` varchar(50) DEFAULT NULL,
  `details` varchar(500) DEFAULT NULL,
  `customer_id` varchar(50) DEFAULT NULL,
  `cost` varchar(50) DEFAULT NULL,
  `advance` varchar(50) DEFAULT NULL,
  `remain` varchar(50) NOT NULL DEFAULT '0',
  `status` tinyint(1) DEFAULT 0,
  `is_delivered` tinyint(1) NOT NULL DEFAULT 0,
  `delivered_date` tinyint(1) DEFAULT NULL,
  `ip_address` varchar(50) DEFAULT NULL,
  `browser` varchar(50) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `submit_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table printing.work_tbl: ~6 rows (approximately)
DELETE FROM `work_tbl`;
INSERT INTO `work_tbl` (`id`, `date`, `work`, `details`, `customer_id`, `cost`, `advance`, `remain`, `status`, `is_delivered`, `delivered_date`, `ip_address`, `browser`, `create_date`, `submit_date`) VALUES
	(1, '2023-09-08', 'test', 'teset', '1', NULL, NULL, '0', 0, 0, NULL, NULL, NULL, NULL, NULL),
	(2, '2023-09-08', 'todays work', 'test', '1', NULL, NULL, '0', 0, 0, NULL, '::1', 'Chrome', '2023-09-08 11:42:19', NULL),
	(3, '2023-09-09', 'upcoming working test', 'testing', '1', NULL, NULL, '0', 1, 1, NULL, '::1', 'Chrome', '2023-09-08 11:43:55', NULL),
	(4, '2023-09-21', 'cencel work testing', 'test', '1', NULL, NULL, '0', 1, 0, NULL, '::1', 'Chrome', '2023-09-08 11:45:42', NULL),
	(5, '2023-09-09', 'test', 'test', '1', '12', '10', '2', 2, 0, NULL, '127.0.0.1', 'Firefox', '2023-09-09 10:45:35', NULL),
	(6, '2023-08-11', 'paper printing', '100 paper advertisement printing', '1', '500', '200', '300', 1, 1, NULL, '::1', 'Chrome', '2023-09-09 10:45:59', NULL),
	(7, '2023-09-12', 'printing', 'test', '3', '500', '300', '0', 1, 1, 23, '127.0.0.1', 'Firefox', '2023-09-09 16:19:59', NULL);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
