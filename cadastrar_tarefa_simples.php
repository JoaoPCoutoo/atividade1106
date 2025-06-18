<?php
require_once 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $titulo = $_POST['titulo'];
    $status = $_POST['status'];
    $descricao = $_POST['descricao'];
    $data_inicio = $_POST['data_inicio'];
    $data_finalizacao = $_POST['data_termino'];

    if (!empty($titulo)) {
        $sql = "INSERT INTO tarefas (titulo, status, descricao, data_inicio, data_termino) VALUES (?, ?, ?, ?, ?)";
        $stmt = $conexao->prepare($sql);
        $stmt->bind_param("sssss", $titulo, $status, $descricao, $data_inicio, $data_finalizacao);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Tarefa cadastrada!']);
        } else {
            echo json_encode(['success' => false, 'error' => 'Erro ao cadastrar.']);
        }

        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'error' => 'Título é obrigatório.']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Método inválido.']);
}

$conexao->close();
?>
