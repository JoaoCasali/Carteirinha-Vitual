$(document).ready(function () {
    // Retorno de dados dos agendamentos
    // Chamada do metodo ajax para consultar o back-end
    var dados = JSON.stringify({
        Id: sessionStorage.Id
    });
    $.ajax({
        url: 'http://localhost:5000/listar_funcionarios', // Endereço do banco de dados
        type: 'POST', // O tipo POST é o de envio, enquanto GET é o de recuperação de dados
        dataType: 'json', // Tipo de arquivo que será enviado
        contentType: 'application/json', // tipo dos dados enviados
        data: dados, // estes são os dados enviados
        success: listar_funcionarios, // Mostra uma mensagem indicando o sucesso na operação e limpa o formulário
        error: function() {
            alert("erro ao ler dados, verifique o backend");
        } 
    });
    // Função que será chamada caso o back-end seja chamado com sucesso
    // Função que coloca os dados em uma tabela
    function listar_funcionarios(funcionarios) {
        // Variável que armagenará os dados que serão impressos
        linhas = ''
        // For que lerá item por item da tabela agendamentos
        for (var i in funcionarios) {
            // Criando a variavel auxiliar
            // Na variavel lin se controi o que seria um código html junto das variáveis vindas da tabela
            lin = "<tr>" +
                "<td>" + funcionarios[i].Id + "</td>" +
                "<td>" + funcionarios[i].NomeCompleto + "</td>" +
                "<td>" + funcionarios[i].Email + "</td>" +
                "<td>" + funcionarios[i].UnidadeSaude.Nome + "</td>" +
                "</tr>";
            // Adicionando a variavel lin a variavel que será impressa na tabela
            linhas = linhas + lin;
        };
        // Adicionando as informações na tabela
        $('#corpoTabelaFuncionario').append(linhas);
    }
});