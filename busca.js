$(document).ready(function() {
    let timeoutId;
    let todasTarefas = [];
    
    // Carrega todas as tarefas inicialmente
    carregarTarefas();
    
    // Busca em tempo real
    $('#campo-busca').on('input', function() {
        clearTimeout(timeoutId);
        const termo = $(this).val().trim();
        
        // Mostra loading
        mostrarLoading(true);
        
        // Debounce para evitar muitas requisições
        timeoutId = setTimeout(function() {
            realizarBusca(termo);
        }, 300);
    });
    
    // Filtros
    $('#filtro-status, #filtro-data-inicio, #filtro-data-fim').on('change', function() {
        const termo = $('#campo-busca').val().trim();
        realizarBusca(termo);
    });
    
    // Limpar filtros
    $('#limpar-filtros').on('click', function() {
        $('#filtro-status').val('');
        $('#filtro-data-inicio').val('');
        $('#filtro-data-fim').val('');
        const termo = $('#campo-busca').val().trim();
        realizarBusca(termo);
    });
    
    // Modal
    $(document).on('click', '.btn-view', function() {
        const id = $(this).data('id');
        const tarefa = todasTarefas.find(t => t.id == id);
        if (tarefa) {
            mostrarModal(tarefa);
        }
    });
    
    $('.close').on('click', function() {
        $('#modal-detalhes').hide();
    });
    
    $(window).on('click', function(event) {
        if (event.target.id === 'modal-detalhes') {
            $('#modal-detalhes').hide();
        }
    });
    
    function carregarTarefas() {
        mostrarLoading(true);
        
        $.ajax({
            url: 'buscar_tarefas.php',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                todasTarefas = data;
                exibirResultados(data);
                mostrarLoading(false);
            },
            error: function() {
                mostrarErro('Erro ao carregar tarefas');
                mostrarLoading(false);
            }
        });
    }
    
    function realizarBusca(termo) {
        const filtroStatus = $('#filtro-status').val();
        const filtroDataInicio = $('#filtro-data-inicio').val();
        const filtroDataFim = $('#filtro-data-fim').val();
        
        $.ajax({
            url: 'buscar_tarefas.php',
            type: 'GET',
            dataType: 'json',
            data: {
                busca: termo,
                status: filtroStatus,
                data_inicio: filtroDataInicio,
                data_fim: filtroDataFim
            },
            success: function(data) {
                todasTarefas = data;
                exibirResultados(data);
                mostrarLoading(false);
            },
            error: function() {
                mostrarErro('Erro ao realizar busca');
                mostrarLoading(false);
            }
        });
    }
    
    function exibirResultados(tarefas) {
        const tbody = $('#resultados-lista');
        tbody.empty();
        
        // Atualiza contador
        $('#resultado-count').text(`${tarefas.length} tarefa${tarefas.length !== 1 ? 's' : ''} encontrada${tarefas.length !== 1 ? 's' : ''}`);
        
        if (tarefas.length === 0) {
            $('#tabela-resultados').hide();
            $('#sem-resultados').show();
            return;
        }
        
        $('#sem-resultados').hide();
        $('#tabela-resultados').show();
        
        $.each(tarefas, function(index, tarefa) {
            const statusClass = getStatusClass(tarefa.status);
            const dataInicio = formatarData(tarefa.data_inicio);
            const dataTermino = formatarData(tarefa.data_termino);
            
            const row = `
                <tr>
                    <td>${tarefa.id}</td>
                    <td><strong>${highlightText(tarefa.titulo, $('#campo-busca').val())}</strong></td>
                    <td><span class="status-badge ${statusClass}">${tarefa.status}</span></td>
                    <td>${highlightText(truncateText(tarefa.descricao, 50), $('#campo-busca').val())}</td>
                    <td>${dataInicio}</td>
                    <td>${dataTermino}</td>
                    <td>
                        <button class="btn-action btn-view" data-id="${tarefa.id}">Ver</button>
                    </td>
                </tr>
            `;
            tbody.append(row);
        });
    }
    
    function mostrarModal(tarefa) {
        $('#modal-id').text(tarefa.id);
        $('#modal-titulo').text(tarefa.titulo);
        $('#modal-status').text(tarefa.status).removeClass().addClass('status-badge ' + getStatusClass(tarefa.status));
        $('#modal-descricao').text(tarefa.descricao || 'Sem descrição');
        $('#modal-data-inicio').text(formatarData(tarefa.data_inicio));
        $('#modal-data-termino').text(formatarData(tarefa.data_termino));
        
        $('#modal-detalhes').show();
    }
    
    function mostrarLoading(show) {
        if (show) {
            $('#loading').show();
            $('#tabela-resultados').hide();
            $('#sem-resultados').hide();
        } else {
            $('#loading').hide();
        }
    }
    
    function mostrarErro(mensagem) {
        $('#resultados-lista').html(`
            <tr>
                <td colspan="7" style="text-align: center; color: #dc3545; padding: 20px;">
                    <strong>${mensagem}</strong>
                </td>
            </tr>
        `);
        $('#tabela-resultados').show();
        $('#sem-resultados').hide();
    }
    
    function getStatusClass(status) {
        switch(status) {
            case 'aguardando':
                return 'status-aguardando';
            case 'em execução':
                return 'status-em-execucao';
            case 'concluído':
                return 'status-concluido';
            default:
                return '';
        }
    }
    
    function formatarData(data) {
        if (!data) return '-';
        const date = new Date(data + 'T00:00:00');
        return date.toLocaleDateString('pt-BR');
    }
    
    function truncateText(text, maxLength) {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }
    
    function highlightText(text, searchTerm) {
        if (!searchTerm || !text) return text;
        
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return text.replace(regex, '<mark style="background-color: #fff3cd; padding: 1px 2px; border-radius: 2px;">$1</mark>');
    }
});