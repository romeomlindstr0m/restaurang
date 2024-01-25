-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 25, 2024 at 12:59 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `santa_fe`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `categories_ID` int(11) NOT NULL,
  `categories_name` varchar(255) COLLATE utf8mb4_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_swedish_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`categories_ID`, `categories_name`) VALUES
(0, 'Efterrätt'),
(1, 'Förrätt'),
(3, 'Hamburgare'),
(5, 'Pizza'),
(4, 'Till Barnen'),
(2, 'Varmrätt');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `items_ID` int(11) NOT NULL,
  `items_name` varchar(255) COLLATE utf8mb4_swedish_ci NOT NULL,
  `items_category` int(11) NOT NULL,
  `items_price` decimal(5,2) NOT NULL,
  `items_description` varchar(255) COLLATE utf8mb4_swedish_ci DEFAULT NULL,
  `items_potato_options` tinyint(1) NOT NULL DEFAULT 0,
  `items_doneness_options` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_swedish_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`items_ID`, `items_name`, `items_category`, `items_price`, `items_description`, `items_potato_options`, `items_doneness_options`) VALUES
(33, 'Chicken BBQ-Wings', 1, '7.00', 'Chicken wings 5st med Bbq sås eller Texas Pete sås, gurksticks, sweet-chili dipp', 0, 0),
(34, 'Vitlöksbröd', 1, '5.00', 'Batong med vitlökssmör och vitlöksdipp', 0, 0),
(35, 'Sniglar i vitlöksörtsmör', 1, '9.00', 'Serveras med bröd', 0, 0),
(36, 'Halloumisticks & sweetchilidipp', 1, '7.00', NULL, 0, 0),
(37, 'Husets bröd med skagenröra', 1, '8.00', NULL, 0, 0),
(38, 'Combokorg', 1, '7.00', 'Lökringar, mozzarellasticks, jalopeno poppers, sweetchili-dipp', 0, 0),
(39, 'Nachoplatter', 1, '8.00', 'Nachos, tomat, rödlök, jalopeno, cheddarost och creme fraiche', 0, 0),
(40, 'Santa Fe sallad', 1, '8.00', 'Sallad med tomat, gurka, parmesan, dillolja, picklad rödlök, cashewnötter, melon, grillad halloumi, scampispett, aioli, bröd', 0, 0),
(41, 'Gös', 2, '24.50', 'Stekt gös med skagenröra, sallad och friterad potatis', 1, 0),
(42, 'Vitlökskyckling', 2, '21.50', 'Kycklingfile med rostad vitlökssås, grillad majs, säsongens grönsaker, valfri potatis', 1, 0),
(43, 'Vegetarisk Quesadilla', 2, '16.50', 'Fylld quesadilla med riven ost, paprika, rödlök, vegan-chili, salsa, toppad med cheddarostsås, serveras med sallad och fransk potatis', 1, 0),
(44, 'Kyckling Quesadilla', 2, '16.50', 'Fylld quesadilla med riven ost, paprika, rödlök, kyckling, salsa toppad med cheddarostsås, serveras med sallad och fransk potatis', 1, 0),
(45, 'Husets pepparbiff', 2, '28.50', 'Oxinrefilé med husets pepparsås, säsongens grönsaker, valfri potatis', 1, 1),
(46, 'Lammyttrefile', 2, '24.90', 'Saftig helstekt lammyttrefile med rostad broccoli, blomkålspurè, timjampotatis samt rödvinssås', 1, 1),
(47, 'Husets smörgås', 2, '21.50', 'Bröd med oxyttrefilébiff, skinka, cheddarost, täckt med husets pepparsås, sallad', 1, 0),
(48, 'BBQ-PLATE', 2, '25.50', 'Bbq rökta Baby back ribs och rökt chuckroll nötkött, chilimajonnäs, sallad, lökringar, klyftpotatis', 1, 0),
(49, 'Grillbiff', 2, '21.50', 'Oxyttrefilébiff med säsongens grönsaker, grillsmör och valfri potatis', 1, 1),
(50, 'Open House Burger', 3, '16.50', '200 g hamburgerbiff med husets pepparsås, bacon, chili-majonnäs, cheddarost, tomat, saltgurka, picklad rödlök, sallad. Serveras med fransk potatis', 1, 1),
(51, 'Classic Burger', 3, '16.50', '200 g hamburgerbiff med bacon och cheddarost, sallad, saltgurka, tomat, karamelliserad jalopeno och chili-majonnäs. Serveras med fransk potatis', 1, 1),
(52, 'Halloumi Burger', 3, '16.50', 'Hamburgare med stekt halloumiost, sallad, rödlök, vitlöks-majonnäs. Serveras med fransk potatis', 1, 1),
(53, 'Chicken Burger', 3, '16.50', 'Hamburgare med en krispig panerad kycklingbiff, cheddarost, stekt ananas, aioli, sallad, och picklad rödlök, rucola. Serveras med fransk potatis och lökringar', 1, 0),
(54, 'Beef Burger', 3, '25.00', 'Hamburgare med nötyttrefile, cheddarost, tomat, sallad, aioli och chilimajonnäs. Serveras med fransk potatis och lökringar', 1, 1),
(55, 'Trollböle', 5, '15.50', 'Tomatsås, maletkött, ost, skinka, pepperoni, karamelliserad jalopeno, rödlök', 0, 0),
(56, 'Bbq-Kyckling', 5, '15.50', 'Bbq-sås, tomatsås, kyckling, pepperoni, mögelost, ananas, ost, rucola', 0, 0),
(57, 'Bianco', 5, '15.50', 'Räkor, kallrökt lax, parmesan, rukola, picklad rödlök med vit pizzasås', 0, 0),
(58, 'Margerita', 5, '14.00', 'Tomatsås, mozzarellaost, basilika', 0, 0),
(59, 'Italiano', 5, '15.50', 'Parmaskinka, parmesan mozzarella, soltorkade tomater, rucola', 0, 0),
(60, 'Fantasia 4 fyllningar', 5, '15.50', 'Alternativ: Skinka, tonfisk, rödlök, räkor, champinjoner, ananas, maletkött, vitlök, karamelliserad jalopeno, bacon, pepperoni, mögelost, kyckling, rucola, paprika, tomat, oliver', 0, 0),
(67, 'Knackorvar', 4, '7.00', 'Vald potatis tillagd', 0, 0),
(70, 'Barn lövbiff', 4, '9.00', 'Nötlövbiff med valfri potatis', 0, 0),
(71, 'Kycklingnuggets', 4, '7.00', 'Med valfri potatis', 0, 0),
(73, 'Hamburgare', 4, '8.00', 'Hamburgerbiff, hamburgerbröd, majonnäs, cheddarostskiva, fransk potatis', 0, 0),
(74, 'Barn pizza', 4, '9.00', 'Med 2 valfria fyllningar', 0, 0),
(77, 'Choklad-expressen glassportion', 0, '7.50', NULL, 0, 0),
(78, 'Kinuski-expressen glassportion', 0, '7.50', NULL, 0, 0),
(79, 'Brownie', 0, '8.50', 'Brownie med passionfruktscurd och crunch', 0, 0),
(80, 'Crème Brûlée', 0, '8.50', NULL, 0, 0),
(81, 'Passion Pannacotta', 0, '8.50', NULL, 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`categories_ID`),
  ADD UNIQUE KEY `UNIQUE` (`categories_name`),
  ADD UNIQUE KEY `categories_name` (`categories_name`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`items_ID`),
  ADD KEY `Categories` (`items_category`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `categories_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `items_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `Categories` FOREIGN KEY (`items_category`) REFERENCES `categories` (`categories_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
