$(document).ready(function() {	  
    // Retorno de dados dos agendamentos
    // Chamada do metodo ajax para consultar o back-end
    $.ajax({
        // Chamando o back-end
        url: 'http://localhost:5000/listar_pessoas',
        // Metodo Get para buscar dados
        method: 'GET',
        // Tipo de dados que receberá
        dataType: 'json',
        // Caso não tenha erros, executará a função listar_agendamentos
        success: listar_pessoas,
        // Em caso de erro, imprimirá a mensagem
        error: function() {
            alert("erro ao ler dados, verifique o backend");
        }
    });
    // Função que será chamada caso o back-end seja chamado com sucesso
    // Função que coloca os dados em uma tabela
    function listar_pessoas(pessoas) {
        // Variável que armagenará os dados que serão impressos
        linhas = ''
        // For que lerá item por item da tabela agendamentos
        for (var i in pessoas){
            // Criando a variavel auxiliar
            // Na variavel lin se controi o que seria um código html junto das variáveis vindas da tabela
            lin = "<tr>" +
            "<td>" + pessoas[i].Id + "</td>" +
            "<td>" + pessoas[i].NomeCompleto + "</td>" +
            "<td>" + pessoas[i].DtNascimento + "</td>" +
            "<td>" + pessoas[i].Genero + "</td>" +
            "<td>" + pessoas[i].Type + "</td>" +
            "<tr>";
            // Adicionando a variavel lin a variavel que será impressa na tabela
            linhas = linhas + lin;
        };
        // Adicionando as informações na tabela
        $('#corpoTabelaPessoas').append(linhas);
    }
});