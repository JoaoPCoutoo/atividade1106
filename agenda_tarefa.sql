-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 13/06/2025 às 15:40
-- Versão do servidor: 10.4.28-MariaDB
-- Versão do PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `agenda_tarefas`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `tarefas`
--

CREATE TABLE `tarefas` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descricao` text DEFAULT NULL,
  `data_inicio` date DEFAULT NULL,
  `data_termino` date DEFAULT NULL,
  `status` enum('aguardando','em execução','concluído') NOT NULL DEFAULT 'aguardando'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tarefas`
--

INSERT INTO `tarefas` (`id`, `titulo`, `descricao`, `data_inicio`, `data_termino`, `status`) VALUES
(1, 'Preparar relatório', 'Coletar dados e formatar relatório mensal.', '2025-05-15', '2025-05-17', 'em execução'),
(2, 'Reunião com equipe', 'Discutir próximos passos do projeto X.', '2025-05-16', '2025-05-16', 'aguardando'),
(3, 'Implementar funcionalidade Y', 'Desenvolver e testar a nova funcionalidade no sistema.', '2025-05-20', '2025-05-25', 'aguardando'),
(4, 'Enviar proposta comercial', 'Elaborar e enviar proposta para cliente Z.', '2025-05-14', '2025-05-14', 'concluído'),
(5, 'Refatorar código', 'Melhorar a estrutura e legibilidade do módulo W.', '2025-05-22', '2025-05-24', 'aguardando'),
(6, '       joao', 'aaaaaaaaaaaaaa', '2025-06-02', '2025-06-27', 'em execução'),
(7, '       joao', 'aaaaaaaaaaaaaa', '2025-06-05', '2025-06-20', 'aguardando');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `tarefas`
--
ALTER TABLE `tarefas`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `tarefas`
--
ALTER TABLE `tarefas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
