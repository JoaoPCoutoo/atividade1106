<?php
require_once 'conexao.php';

$sql = $sql = "SELECT id, titulo, status, descricao, data_inicio, data_termino FROM tarefas ORDER BY id DESC";
$resultado = $conexao->query($sql);

$tarefas = array();
if ($resultado->num_rows > 0) {
    while ($row = $resultado->fetch_assoc()) {
        $tarefas[] = $row;
    }
}

$conexao->close();

header('Content-Type: application/json');
echo json_encode($tarefas);
?>