$(document).ready(function (){
    // Função de envio de cadastro para o banco de dados
    $("#cadastroUnidade").submit(function (e) {
        //Cancela a funcionalidade de envio padrão do submit
        e.preventDefault();
        // Variavel que define se tem algum erro ou não
        var semErros = true
        // Recuperando dados da página
        NomeUnidade = $("#inputNomeUnidade").val();
        CepUnidade = $("#inputCepUnidade").val();
        ComplementoUnidade = $("#inputComplementoUnidade").val();
        EmailUnidade = $("#inputEmailUnidade").val();
        SenhaUnidade = $("#inputSenhaUnidade").val();
        // Validação do Email
        if (EmailUnidade != $("#inputConfirEmailUnidade").val()) {
            semErros = false
            // Mostrando mensagem de aviso
            $("#EmailErradoUnidade").removeClass("invisivel");
        }
        // Validação da Senha
        if (SenhaUnidade != $("#inputConfirSenhaUnidade").val()) {
            semErros = false
            // Mostrando mensagem de aviso
            $("#SenhaErradaUnidade").removeClass("invisivel");
        }
        // Caso não tenha erros, procede com o commit
        if (semErros) {
            // transforma os dados em um arquivo json
            var dados = JSON.stringify({
                Nome: NomeUnidade, Cep: CepUnidade, Complemento: ComplementoUnidade, Email: EmailUnidade, Senha: SenhaUnidade
            });
            // Faz o envio por meio do método ajax
            $.ajax({
                url: 'http://localhost:5000/incluir_unidade', // Endereço do banco de dados
                type: 'POST', // O tipo POST é o de envio, enquanto GET é o de recuperação de dados
                dataType: 'json', // Tipo de arquivo que será enviado
                contentType: 'application/json', // tipo dos dados enviados
                data: dados, // estes são os dados enviados
                success: unidadeIncluida, // Mostra uma mensagem indicando o sucesso na operação e limpa o formulário
                error: erroAoIncluir // Caso de erro, mostra uma mensagem indicando o tal
            });
            // Função de sucesso
            function unidadeIncluida(retorno) {
                // Se o back-end retornar ok, procede com tais funções
                if (retorno.resultado == "ok") {
                    // Alerta que teve sucesso
                    alert("Unidade incluída com sucesso!");
                    // Redireciona para outra página
                    location.href = "index.html";
                } else if (retorno.resultado == "CEP") {
                    // informar mensagem de erro
                    $("#CepErrado").removeClass("invisivel");
                }
            }
            // Função de erro
            function erroAoIncluir(retorno) {
                // informar mensagem de erro
                alert("ERRO: " + retorno.resultado + ": " + retorno.detalhes);
            }
        }
    });
});