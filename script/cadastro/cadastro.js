$(document).ready(function() {
   $('#btnCidadao').click(function(){
      $('#btnCidadao').addClass('ativo');
      $('#btnUnidade').removeClass('ativo');
      $('#cadastroCidadao').removeClass('invisivel');
      $('#cadastroUnidade').addClass('invisivel');
   });
   $('#btnUnidade').click(function(){
      $('#btnUnidade').addClass('ativo');
      $('#btnCidadao').removeClass('ativo');
      $('#cadastroUnidade').removeClass('invisivel');
      $('#cadastroCidadao').addClass('invisivel');
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
         mascara_cpf("#inputCpf");
      // Caso seja digitado qualquer outra coisa, a função acaba
      } else{
         event.preventDefault();
      }
   });
   // função que não permite letras no input do CEP
   $("#inputCep").keypress(function( event ) {
      // Se for digitado numeros, chama a função de mascara
      if (event.which > 47 && event.which < 58){
         mascara_cep("#inputCep");
      // Caso seja digitado qualquer outra coisa, a função acaba
      } else{
         event.preventDefault();
      }
   });
   $("#inputCepUnidade").keypress(function( event ) {
      // Se for digitado numeros, chama a função de mascara
      if (event.which > 47 && event.which < 58){
         mascara_cep("#inputCepUnidade");
      // Caso seja digitado qualquer outra coisa, a função acaba
      } else{
         event.preventDefault();
      }
   });
   $("#verificacao").click(function(){
      $("#cadastroCidadao").addClass("was-validated");
   });
   $("#verificacao2").click(function(){
      $("#cadastroUnidade").addClass("was-validated");
   });
});
// Mascara do CPF
function mascara_cpf(valor){
   // Pegando a informação do site
   var cpf = $(valor).val();
   // Contagem que determina onde terá ponto
   if(cpf.length == 3 || cpf.length == 7){
      // Adicionando ponto no site
      $(valor).val( cpf+'.' );
   };
   // Contagem que determina onde terá hífen
   if(cpf.length == 11){
      // Adicionando hífen no site
      $(valor).val( cpf+'-' );
   };
};
// Mascara do CEP
function mascara_cep(valor){
   // Pegando a informação do site
   var cpf = $(valor).val();
   // Contagem que determina onde terá hífen
   if(cpf.length == 5){
      // Adicionando o hífen no site
      $(valor).val( cpf+'-' );
   };
};