$(document).ready(function() {
   $('#btnCidadao').click(function(){
      $('#btnCidadao').addClass('ativo');
      $('#btnFuncionario').removeClass('ativo');
      $('#btnUnidade').removeClass('ativo');
      $('#cadastroCidadao').removeClass('invisivel');
      $('#cadastroFuncionario').addClass('invisivel');
      $('#cadastroUnidade').addClass('invisivel');
   });
   $('#btnUnidade').click(function(){
      $('#btnUnidade').addClass('ativo');
      $('#btnCidadao').removeClass('ativo');
      $('#btnFuncionario').removeClass('ativo');
      $('#cadastroUnidade').removeClass('invisivel');
      $('#cadastroCidadao').addClass('invisivel');
      $('#cadastroFuncionario').addClass('invisivel');
   });
   // Faz com que caixa de input apareça ou desapareça dependendo do radio comorbidade
   $('#Tem').click(function(){
      $('#aparecerComorbidade').removeClass('invisivel');
   });
   $('#NaoTem').click(function(){
      $('#aparecerComorbidade').addClass('invisivel');
      $('#TipoComorbidades').val("");
   });
   // função que não permite letras no input do CPF
   $("#inputCpf").keypress(function( event ) {
      // Se for digitado numeros, chama a função de mascara
      if (event.which > 47 && event.which < 58){
         mascara_cpf();
      // Caso seja digitado qualquer outra coisa, a função acaba
      } else{
         event.preventDefault();
      }
   });
   // função que não permite letras no input do CEP
   $("#inputCep").keypress(function( event ) {
      // Se for digitado numeros, chama a função de mascara
      if (event.which > 47 && event.which < 58){
         mascara_cep();
      // Caso seja digitado qualquer outra coisa, a função acaba
      } else{
         event.preventDefault();
      }
   });
   $("#verificacao").click(function(){
      $("#cadastroCidadao").addClass("was-validated");
   });
   // Função de envio de cadastro para o banco de dados
   $("#cadastroCidadao").submit(function(e) {
      //Cancela a funcionalidade de envio padrão do submit
      e.preventDefault();
      // Variavel que define se tem algum erro ou não
      var semErros = true
      // Recuperando dados da página
      NomeCompleto = $("#inputNome").val();
      DtNascimento = $("#inputData").val();
      Genero = $('input[name="genero"]:checked').val();
      Cpf = $("#inputCpf").val();
      Cep = $("#inputCep").val();
      Complemento = $("#inputComplemento").val();
      // Fazendo com que um radio button retorne false ou true
      if ($('input[name="temComorbidades"]:checked').val() == "true"){
         temComorbidades = true
      } else{
         temComorbidades = false
      }
      TipoComorbidades = $('#TipoComorbidades').val();
      Email = $("#inputEmail").val();
      Senha = $("#inputSenha").val();
      // Validação do Email
      if (Email != $("#inputConfirEmail").val()){
         semErros = false
         // Mostrando mensagem de aviso
         $("#EmailErrado").removeClass("invisivel");
      }
      // Validação da Senha
      if (Senha != $("#inputConfirSenha").val()){
         semErros = false
         // Mostrando mensagem de aviso
         $("#SenhaErrada").removeClass("invisivel");
      }
      // Caso não tenha erros, procede com o commit
      if(semErros){
         // transforma os dados em um arquivo json
         var dados = JSON.stringify({
            NomeCompleto: NomeCompleto, DtNascimento: DtNascimento, Genero: Genero, Cpf: Cpf, Cep: Cep, Complemento: Complemento, 
            temComorbidades: temComorbidades, TipoComorbidades: TipoComorbidades, Email: Email, Senha: Senha
         });
         // Faz o envio por meio do método ajax
         $.ajax({
            url: 'http://localhost:5000/incluir_cidadao', // Endereço do banco de dados
            type: 'POST', // O tipo POST é o de envio, enquanto GET é o de recuperação de dados
            dataType: 'json', // Tipo de arquivo que será enviado
            contentType: 'application/json', // tipo dos dados enviados
            data: dados, // estes são os dados enviados
            success: pessoaIncluida, // Mostra uma mensagem indicando o sucesso na operação e limpa o formulário
            error: erroAoIncluir // Caso de erro, mostra uma mensagem indicando o tal
         });
         // Função de sucesso
         function pessoaIncluida (retorno) {
            // Se o back-end retornar ok, procede com tais funções
            if (retorno.resultado == "ok") { 
               // Alerta que teve sucesso
               alert("Pessoa incluída com sucesso!");
               // Redireciona para outra página
               location.href = "index.html";
            } else if (retorno.resultado == "CPF"){
               // informar mensagem de erro
               $("#CpfErrado").removeClass("invisivel");
            }            
         }
         // Função de erro
         function erroAoIncluir (retorno) {
            // informar mensagem de erro
            alert("ERRO: "+retorno.resultado + ": " + retorno.detalhes);
         }
      }
   });
});
// Mascara do CPF
function mascara_cpf(){
   // Pegando a informação do site
   var cpf = $('#inputCpf').val();
   // Contagem que determina onde terá ponto
   if(cpf.length == 3 || cpf.length == 7){
      // Adicionando ponto no site
      $('#inputCpf').val( cpf+'.' );
   };
   // Contagem que determina onde terá hífen
   if(cpf.length == 11){
      // Adicionando hífen no site
      $('#inputCpf').val( cpf+'-' );
   };
};
// Mascara do CEP
function mascara_cep(){
   // Pegando a informação do site
   var cpf = $('#inputCep').val();
   // Contagem que determina onde terá hífen
   if(cpf.length == 5){
      // Adicionando o hífen no site
      $('#inputCep').val( cpf+'-' );
   };
};