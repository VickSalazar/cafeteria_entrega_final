-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 29-11-2023 a las 19:51:40
-- Versión del servidor: 8.0.31
-- Versión de PHP: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd_cafeteria_surch`
--
CREATE DATABASE IF NOT EXISTS `bd_cafeteria_surch` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `bd_cafeteria_surch`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `novedades`
--

DROP TABLE IF EXISTS `novedades`;
CREATE TABLE IF NOT EXISTS `novedades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(250) NOT NULL,
  `subtitulo` text NOT NULL,
  `cuerpo` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `novedades`
--

INSERT INTO `novedades` (`id`, `titulo`, `subtitulo`, `cuerpo`) VALUES
(1, 'FECA, Festival del Café - Edición 2023', 'Fecha: 15 y 16 de Julio de 2023\r\nLugar: Plaza Intendente Seeber, Av. del Libertador y Av. Sarmiento.', 'BA Capital Gastronómica organiza FECA, un finde a puro aroma a café. Con entrada libre y gratuita, vas a poder disfrutar la más amplia variedad de cafés desde $250, acompañados de propuestas dulces o saladas. \r\n\r\nTambién habrá charlas, degustaciones, talleres, shows musicales, y actividades lúdicas y artísticas.\r\n\r\nSurch contará con un stand para prepararte cafecitos con nuestra máquina espresso Rocket y otros métodos, también habrá pastelería de masa madre, cuartos de café para llevar y la mejor onda!\r\n\r\nVenite a pasar un finde increíble al aire libre y a disfrutar del mejor café!'),
(19, 'café blend de la casa', 'nuevo', 'orígen 70% brasil y 30 % colombia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

DROP TABLE IF EXISTS `productos`;
CREATE TABLE IF NOT EXISTS `productos` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `titulo` varchar(35) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `tipo_ribbon` int DEFAULT NULL,
  `texto_ribbon` varchar(11) DEFAULT NULL,
  `imagen_id` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `titulo`, `precio`, `tipo_ribbon`, `texto_ribbon`, `imagen_id`) VALUES
(1, 'Blend de la Casa', '7000.00', 3, NULL, 'nt9smcfalreepwj5qwe5'),
(8, 'Colombia Huila', '5500.00', 1, '10', 'upycuvvumk3ttksrbeqk'),
(9, 'México', '6100.00', NULL, NULL, 'jloby7wbqhzq8tuogdzn'),
(10, 'Brasil', '5700.00', 2, NULL, 'y6jhr3ditbeqhat65xq2'),
(11, 'Etiopía', '11000.00', 1, '15', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos_ribbon`
--

DROP TABLE IF EXISTS `tipos_ribbon`;
CREATE TABLE IF NOT EXISTS `tipos_ribbon` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(30) NOT NULL,
  `texto_ribbon` varchar(11) DEFAULT NULL,
  `color_ingles` varchar(10) NOT NULL,
  `completar_texto` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `tipos_ribbon`
--

INSERT INTO `tipos_ribbon` (`id`, `descripcion`, `texto_ribbon`, `color_ingles`, `completar_texto`) VALUES
(1, 'Descuento', NULL, 'green', 1),
(2, 'Sin Stock', 'Sin Stock', 'red', 0),
(3, 'Más Vendido', 'Más Vendido', 'blue', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `password`) VALUES
(1, 'Victoria', '81dc9bdb52d04dc20036dbd8313ed055'),
(2, 'Nito', '81dc9bdb52d04dc20036dbd8313ed055'),
(3, 'Flavia', '81dc9bdb52d04dc20036dbd8313ed055');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
