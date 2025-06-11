$(document).ready(function() {
    function atualizarLista() {
        $.ajax({
            url: 'listar_tarefas_simples.php',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                $('#tarefas-lista').empty();
                $.each(data, function(index, tarefa) {
                    $('#tarefas-lista').append(`<tr><td>${tarefa.id}</td><td>${tarefa.titulo}</td><td>${tarefa.status}</td></tr>`);
                });
            },
            error: function() {
                $('#tarefas-lista').html('<tr><td colspan="3">Erro ao carregar tarefas.</td></tr>');
            }
        });
    }

    atualizarLista();

    $('#nova-tarefa').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: 'cadastrar_tarefa_simples.php',
            type: 'POST',
            dataType: 'json',
            data: $(this).serialize(),
            success: function(response) {
                $('#msg').html('');
                if (response.success) {
                    $('#msg').html('<span style="color: green;">' + response.message + '</span>').fadeIn().delay(1500).fadeOut();
                    $('#nova-tarefa')[0].reset();
                    atualizarLista();
                } else {
                    $('#msg').html('<span style="color: red;">' + response.error + '</span>').fadeIn().delay(2000).fadeOut();
                }
            },
            error: function() {
                $('#msg').html('<span style="color: red;">Erro no servidor.</span>').fadeIn().delay(2000).fadeOut();
            }
        });
    });
});