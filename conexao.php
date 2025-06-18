<?php
// Define o nome do servidor MySQL (geralmente 'localhost' para desenvolvimento local)
$servidor = "localhost";
// Define o nome de usuário para acessar o banco de dados MySQL
$usuario = "root";
// Define a senha para o usuário do banco de dados MySQL
$senha = "";
// Define o nome do banco de dados MySQL a ser utilizado
$banco = "agenda_tarefas";

// Cria uma nova conexão com o banco de dados MySQL usando a extensão mysqli
$conexao = new mysqli($servidor, $usuario, $senha, $banco);

// Verifica se houve algum erro na conexão com o banco de dados
if ($conexao->connect_error) {
    // Se houver erro, exibe uma mensagem de erro e interrompe a execução do script
    die("Erro na conexão com o banco de dados: " . $conexao->connect_error);
}
// Se a conexão for bem-sucedida, o script continua sem exibir nada aqui
?>