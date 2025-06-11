<?php
require_once 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $titulo = $_POST['titulo'];
    $status = $_POST['status'];

    if (!empty($titulo)) {
        $sql = "INSERT INTO tarefas (titulo, status) VALUES (?, ?)";
        $stmt = $conexao->prepare($sql);
        $stmt->bind_param("ss", $titulo, $status);

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