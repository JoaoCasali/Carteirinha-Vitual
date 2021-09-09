$(document).ready(function() {
   $( "#inputCpf" ).keypress(function( event ) {
      if (event.which > 47 && event.which < 58){
         mascara_cpf();
      } else{
         event.preventDefault();
      }
   });
   $( "#inputCep" ).keypress(function( event ) {
      if (event.which > 47 && event.which < 58){
         mascara_cep();
      } else{
         event.preventDefault();
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