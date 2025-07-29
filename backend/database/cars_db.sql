-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 29 juil. 2025 à 18:00
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `cars_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `cars`
--

CREATE TABLE `cars` (
  `id` int(11) NOT NULL,
  `brand` varchar(100) DEFAULT 'Marque inconnue',
  `model` varchar(100) DEFAULT 'Modèle inconnu',
  `registration` varchar(50) DEFAULT 'XXXXX-XXX',
  `price_per_day` decimal(10,2) DEFAULT 100.00,
  `status` enum('available','rented','maintenance') DEFAULT 'available',
  `image_url` varchar(255) DEFAULT 'default_car.jpg',
  `description` text DEFAULT 'Aucune description fournie.',
  `created_at` datetime DEFAULT current_timestamp(),
  `available` tinyint(1) DEFAULT 1,
  `year` int(11) DEFAULT NULL,
  `mileage` int(11) DEFAULT NULL,
  `fuel_type` varchar(50) DEFAULT NULL,
  `transmission` varchar(50) DEFAULT NULL,
  `seats` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `cars`
--

INSERT INTO `cars` (`id`, `brand`, `model`, `registration`, `price_per_day`, `status`, `image_url`, `description`, `created_at`, `available`, `year`, `mileage`, `fuel_type`, `transmission`, `seats`) VALUES
(1, 'Toyota', 'Corolla', 'AB-123-CD', 200.00, 'available', 'tomobil1.jpg', 'Voiture économique et confortable, idéale pour la ville.', '2025-07-14 17:07:46', 1, 2020, 50000, 'Essence', 'Automatique', 5),
(2, 'Renault', 'Clio', 'XY-987-ZT', 120.00, 'available', 'image-1753194014392-246189780.jpg', 'Modèle récent avec faible consommation de carburant.', '2025-07-14 17:07:46', 1, 2019, 75000, 'Diesel', 'Manuelle', 5),
(3, 'Ford', 'Focus', 'GH-456-JK', 130.00, 'maintenance', 'tomobil3.jpg', 'Voiture familiale spacieuse et fiable.', '2025-07-14 17:07:46', 1, 2021, 60000, 'Essence', 'Automatique', 5),
(4, 'Peugeot', '208', 'LM-321-NB', 110.00, 'available', 'tomobil4.jpg', 'Petite voiture pratique et économique.', '2025-07-14 17:07:46', 1, 2018, 82000, 'Diesel', 'Manuelle', 5),
(5, 'Volkswagen', 'Golf', 'PQ-654-WE', 160.00, 'available', 'tomobil5.jpg', 'Voiture sportive élégante avec de bonnes performances.', '2025-07-14 17:07:46', 1, 2022, 40000, 'Essence', 'Automatique', 5),
(6, 'Hyundai Elantra', 'Elantra', 'HY-999-ZZ', 145.00, 'available', 'tomobil6.jpg', 'Voiture moderne avec un bon rapport qualité/pri', '2025-07-14 18:02:37', 1, 2020, 45000, 'Diesel', 'Manuelle', 5);

-- --------------------------------------------------------

--
-- Structure de la table `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `lu` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `message`
--

INSERT INTO `message` (`id`, `name`, `email`, `message`, `created_at`, `lu`) VALUES
(4, 'jhgf', 'benammiahmed999@gmail.com', 'pmolikjhgfd', '2025-07-23 08:49:56', 1),
(5, 'Ahmed BEN AMMI', 'benammiahmed998@gmail.com', 'uyhgdfs', '2025-07-23 08:52:31', 1),
(6, 'iopm^ù$*', 'benammiahmed998@gmail.com', 'fghjklmù', '2025-07-23 08:53:16', 1),
(7, 'ahmed benammi', 'benammiahmed998@gmail.com', 'ilkyujthg', '2025-07-23 08:55:52', 1);

-- --------------------------------------------------------

--
-- Structure de la table `rentals`
--

CREATE TABLE `rentals` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `car_id` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `status` enum('confirmed','cancled','pending') DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `rentals`
--

INSERT INTO `rentals` (`id`, `user_id`, `car_id`, `start_date`, `end_date`, `total_price`, `status`, `created_at`) VALUES
(1, 1, 1, '2025-07-23', '2025-07-24', 500.00, '', '2025-07-23 14:32:13'),
(2, 2, 2, '2025-07-23', '2025-07-24', 500.00, '', '2025-07-24 15:14:58'),
(3, 2, 1, '2025-07-24', '2025-07-25', 200.00, 'confirmed', '2025-07-24 15:59:46'),
(4, 2, 1, '2025-07-26', '2025-07-27', 200.00, '', '2025-07-25 08:26:53'),
(5, 2, 1, '2025-07-25', '2025-07-27', 400.00, '', '2025-07-25 08:42:53'),
(6, 2, 1, '2025-07-27', '2025-07-30', 600.00, '', '2025-07-25 09:04:13'),
(7, 2, 1, '2025-07-26', '2025-07-27', 200.00, '', '2025-07-25 09:28:52'),
(8, 2, 5, '2025-07-27', '2025-07-30', 480.00, '', '2025-07-25 09:35:56'),
(9, 2, 5, '2025-07-27', '2025-07-30', 480.00, '', '2025-07-25 09:39:49'),
(10, 2, 5, '2025-07-26', '2025-07-27', 160.00, '', '2025-07-25 10:09:44'),
(11, 2, 1, '2025-07-27', '2025-07-31', 800.00, '', '2025-07-27 07:37:33'),
(12, 2, 1, '2025-08-03', '2025-08-30', 5400.00, '', '2025-07-27 07:41:37'),
(13, 2, 4, '2025-07-27', '2025-07-31', 440.00, '', '2025-07-27 08:06:18'),
(14, 2, 4, '2025-07-27', '2025-07-31', 440.00, '', '2025-07-27 08:10:37'),
(15, 2, 4, '2025-07-27', '2025-07-28', 110.00, '', '2025-07-27 08:21:23'),
(16, 2, 1, '2025-07-27', '2025-07-31', 800.00, '', '2025-07-27 08:28:28'),
(17, 2, 1, '2025-07-27', '2025-07-31', 800.00, '', '2025-07-27 08:52:01'),
(18, 2, 1, '2025-07-27', '2025-08-03', 1400.00, '', '2025-07-27 09:00:26'),
(19, 2, 1, '2025-07-27', '2025-07-31', 800.00, '', '2025-07-27 09:05:18'),
(20, 2, 1, '2025-08-03', '2025-09-07', 7000.00, '', '2025-07-27 09:22:30'),
(21, 2, 1, '2025-07-31', '2025-08-01', 200.00, '', '2025-07-27 09:29:38'),
(22, 2, 4, '2025-07-27', '2025-08-10', 1540.00, '', '2025-07-27 09:37:12'),
(23, 2, 4, '2025-07-27', '2025-07-28', 110.00, '', '2025-07-27 09:51:25'),
(24, 2, 1, '2025-07-27', '2025-07-28', 200.00, '', '2025-07-27 09:54:42'),
(25, 2, 4, '2025-07-27', '2025-07-28', 110.00, '', '2025-07-27 10:16:29'),
(26, 2, 4, '2025-07-27', '2025-07-28', 110.00, '', '2025-07-27 10:22:35'),
(27, 2, 4, '2025-07-28', '2025-07-29', 110.00, '', '2025-07-27 10:25:58'),
(28, 2, 4, '2025-07-27', '2025-07-29', 220.00, '', '2025-07-27 10:36:16'),
(29, 2, 4, '2025-07-27', '2025-07-28', 110.00, '', '2025-07-27 12:42:18'),
(30, 2, 1, '2025-07-27', '2025-07-30', 600.00, '', '2025-07-27 12:45:31'),
(31, 2, 1, '2025-07-27', '2025-07-28', 200.00, 'confirmed', '2025-07-27 12:50:56'),
(32, 2, 1, '2025-07-20', '2025-07-31', 2200.00, 'confirmed', '2025-07-27 13:00:09'),
(33, 2, 1, '2025-07-27', '2025-07-28', 200.00, 'confirmed', '2025-07-27 13:09:38'),
(34, 2, 1, '2025-07-27', '2025-07-28', 200.00, 'confirmed', '2025-07-27 13:18:25'),
(35, 2, 1, '2025-07-27', '2025-07-28', 200.00, 'confirmed', '2025-07-27 13:19:13'),
(36, 2, 1, '2025-07-27', '2025-07-28', 200.00, 'confirmed', '2025-07-27 13:43:04'),
(37, 2, 1, '2025-08-03', '2025-08-31', 5600.00, 'confirmed', '2025-07-27 13:45:24'),
(38, 2, 1, '2025-07-27', '2025-07-31', 800.00, 'confirmed', '2025-07-27 13:47:48'),
(39, 2, 1, '2025-08-03', '2025-08-08', 1000.00, 'confirmed', '2025-07-27 13:56:43'),
(40, 2, 1, '2025-08-03', '2025-09-07', 7000.00, 'confirmed', '2025-07-27 13:58:01'),
(41, 2, 1, '2025-07-27', '2025-07-28', 200.00, 'confirmed', '2025-07-27 13:59:13'),
(42, 2, 1, '2025-07-27', '2025-08-03', 1400.00, 'confirmed', '2025-07-27 14:11:59'),
(43, 17, 1, '2025-08-03', '2025-09-07', 7000.00, '', '2025-07-27 14:17:44'),
(44, 17, 1, '2025-07-27', '2025-07-28', 200.00, '', '2025-07-27 14:31:10'),
(45, 17, 1, '2025-07-27', '2025-08-01', 1000.00, '', '2025-07-27 14:32:06'),
(46, 17, 1, '2025-07-27', '2025-07-29', 400.00, '', '2025-07-27 14:47:20'),
(47, 5, 1, '2025-08-04', '2025-08-06', 400.00, '', '2025-07-28 08:30:32'),
(48, 2, 1, '2025-07-28', '2025-07-30', 400.00, 'confirmed', '2025-07-28 15:22:05'),
(49, 2, 1, '2025-07-29', '2025-07-31', 400.00, '', '2025-07-29 13:49:37'),
(50, 2, 6, '2025-07-29', '2025-07-31', 290.00, '', '2025-07-29 15:24:23');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('client','admin') DEFAULT 'client',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `message` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`, `message`) VALUES
(1, 'Ahmed', 'ahmed@example.com', '$2b$10$dfRLBQS17kkFqDd5zBSO8.aAattNK5Y5M10gmofGRxhHQCC83WSEy', 'client', '2025-07-16 08:38:22', NULL),
(2, 'Ahmed BEN AMMI', 'benammiahmed998@gmail.com', '$2b$10$8AoE5Gxup4.wTskANgXcH.UWxxSGdl10mlpwh4v0oDQKah1pnfQom', 'client', '2025-07-17 15:52:05', NULL),
(4, 'Abderrahman Taki', 'taki@gmail.com', '$2b$10$8rXkk3gyxzAvSTErb0i4TehYypzG6DRzRXL8uOj9FV6AO.TCdScKe', 'admin', '2025-07-18 15:56:18', NULL),
(5, 'taki', 'benammiahmed999@gmail.com', '$2b$10$Riy7oXTLJTPeYmNp3kj1de6dEi9LqckCgZ2NDNu5Co5P43FnKbGbi', 'admin', '2025-07-20 09:23:50', NULL),
(10, 'Ahmed', 'bqshrenammiahmed998@gmail.com', NULL, 'client', '2025-07-22 15:06:03', 'rtyuisqsqolm'),
(12, 'azdin', 'azdin@gmail.com', '$2b$10$8Hbc4jlQJmNGbC80JWgzW.F1.5UQFOmRfDmTJjFChd/ZRcH3puECi', 'client', '2025-07-25 09:35:08', NULL),
(13, 'azdin', 'azdine@gmail.com', '$2b$10$QjrOHSC1roWVUt4fojCp8uFolnShh4oIFSl3FvsGMb31H0gMHmVxe', 'client', '2025-07-27 08:04:17', NULL),
(15, 'amin', 'amin@gmail.com', '$2b$10$OeroQSrdYDa/5CAL/tofkO5EwkH79vsyoc8MSL1/jvMhCPEQEGb6.', 'client', '2025-07-27 08:20:27', NULL),
(17, 'Khadija', 'khadija@gmail.com', '$2b$10$U7Zb7oXdIZsBRFFXgT4jgOw4rj7CON4cmeck5bzn5ZjOXTQOS8kNi', 'client', '2025-07-27 10:15:33', NULL),
(18, 'yasin', 'yasin@gmail.com', '$2b$10$dMUJhmRtYSplcbJ1RVq9n.JNTQ7b3gvGqhy.DSpdTBK.JxwQ6UGmm', 'client', '2025-07-28 08:48:49', NULL),
(19, 'aziz', 'aziz@gmail.com', '$2b$10$MJi5RTeGZoYzuP4Jj/36YeXRqRto2S0sVlIAYYoKwTLgoO9xbk9OK', 'client', '2025-07-28 09:03:11', NULL),
(20, 'moad', 'moad@gmail.com', '$2b$10$aeNlgHqKd26iyuBIlQVJ3.xaTQrEMJop7ijh/nqgzh6sw34CQtOIG', 'client', '2025-07-28 09:04:22', NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `rentals`
--
ALTER TABLE `rentals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `car_id` (`car_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `cars`
--
ALTER TABLE `cars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT pour la table `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `rentals`
--
ALTER TABLE `rentals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `rentals`
--
ALTER TABLE `rentals`
  ADD CONSTRAINT `rentals_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `rentals_ibfk_2` FOREIGN KEY (`car_id`) REFERENCES `cars` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
