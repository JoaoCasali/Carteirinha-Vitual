$(document).ready(function() {
   $("#inputCpf").keypress(function( event ) {
      if (event.which > 47 && event.which < 58){
         mascara_cpf();
      } else{
         event.preventDefault();
      }
   });
   $("#inputCep").keypress(function( event ) {
      if (event.which > 47 && event.which < 58){
         mascara_cep();
      } else{
         event.preventDefault();
      }
   });
   $("#cadastrarPessoa").click(function(){
      NomeCompleto = $("#inputNome").val();
      DtNascimento = $("#inputData").val();
      Genero = $('input[name="genero"]:checked').val();
      Cpf = $("#inputCpf").val();
      Cep = $("#inputCep").val();
      Complemento = $("#inputComplemento").val();
      if ($('input[name="temComorbidades"]:checked').val() == "true"){
         temComorbidades = true
      } else{
         temComorbidades = false
      }
      TipoComorbidades = $('#TipoComorbidades').val();
      Email = $("#inputEmail").val();
      Senha = $("#inputSenha").val();
      var dados = JSON.stringify({ //dados em Json
         NomeCompleto: NomeCompleto, DtNascimento: DtNascimento, Genero: Genero, Cpf: Cpf, Cep: Cep, Complemento: Complemento, 
         temComorbidades: temComorbidades, TipoComorbidades: TipoComorbidades, Email: Email, Senha: Senha
      });
      $.ajax({
         url: 'http://localhost:5000/incluir_cidadao',
         type: 'POST',
         dataType: 'json', // os dados são recebidos no formato json
         contentType: 'application/json', // tipo dos dados enviados
         data: dados, // estes são os dados enviados
         success: pessoaIncluida, // chama a função listar para processar o resultado
         error: erroAoIncluir
     });
      function pessoaIncluida (retorno) {
         if (retorno.resultado == "ok") { // a operação deu certo?
            // informar resultado de sucesso
            alert("Pessoa incluída com sucesso!");
            // limpar os campos
            NomeCompleto = $("#inputNome").val("");
            DtNascimento = $("#inputData").val("");
            Genero = $('input[name="genero"]:checked').val("");
            Cpf = $("#inputCpf").val("");
            Cep = $("#inputCep").val("");
            Complemento = $("#inputComplemento").val("");
            temComorbidades = $('input[name="temComorbidades"]:checked').val("");
            TipoComorbidades = $('#TipoComorbidades').val("");
            Email = $("#inputEmail").val("");
            Senha = $("#inputSenha").val("");
         } else {
            // informar mensagem de erro
            alert(retorno.resultado + ":" + retorno.detalhes);
            }            
      }
      function erroAoIncluir (retorno) {
         // informar mensagem de erro
         alert("ERRO: "+retorno.resultado + ":" + retorno.detalhes);
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