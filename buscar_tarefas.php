<?php
require_once 'conexao.php';

// Recebe os parâmetros de busca
$busca = isset($_GET['busca']) ? trim($_GET['busca']) : '';
$filtroStatus = isset($_GET['status']) ? trim($_GET['status']) : '';
$filtroDataInicio = isset($_GET['data_inicio']) ? trim($_GET['data_inicio']) : '';
$filtroDataFim = isset($_GET['data_fim']) ? trim($_GET['data_fim']) : '';

// Constrói a query base
$sql = "SELECT id, titulo, status, descricao, data_inicio, data_termino FROM tarefas WHERE 1=1";
$params = array();
$types = "";

// Adiciona condições de busca
if (!empty($busca)) {
    $sql .= " AND (titulo LIKE ? OR descricao LIKE ? OR status LIKE ?)";
    $searchTerm = "%$busca%";
    $params[] = $searchTerm;
    $params[] = $searchTerm;
    $params[] = $searchTerm;
    $types .= "sss";
}

// Filtro por status
if (!empty($filtroStatus)) {
    $sql .= " AND status = ?";
    $params[] = $filtroStatus;
    $types .= "s";
}

// Filtro por data de início
if (!empty($filtroDataInicio)) {
    $sql .= " AND data_inicio >= ?";
    $params[] = $filtroDataInicio;
    $types .= "s";
}

// Filtro por data de término
if (!empty($filtroDataFim)) {
    $sql .= " AND data_termino <= ?";
    $params[] = $filtroDataFim;
    $types .= "s";
}

// Ordena por ID decrescente
$sql .= " ORDER BY id DESC";

// Prepara e executa a query
$stmt = $conexao->prepare($sql);

if (!empty($params)) {
    $stmt->bind_param($types, ...$params);
}

$stmt->execute();
$resultado = $stmt->get_result();

$tarefas = array();
if ($resultado->num_rows > 0) {
    while ($row = $resultado->fetch_assoc()) {
        $tarefas[] = $row;
    }
}

$stmt->close();
$conexao->close();

// Retorna os resultados em JSON
header('Content-Type: application/json; charset=utf-8');
echo json_encode($tarefas, JSON_UNESCAPED_UNICODE);
?>