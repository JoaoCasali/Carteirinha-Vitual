// Mascara do CPF
function mascara_cpf(){
   // Pegando a informação do site
   var cpf = $('#cpf').val();
   // Contagem que determina onde terá ponto
   if(cpf.length == 3 || cpf.length == 7){
      // Adicionando ponto no site
      $('#cpf').val( cpf+'.' );
   };
   // Contagem que determina onde terá hífen
   if(cpf.length == 11){
      // Adicionando hífen no site
      $('#cpf').val( cpf+'-' );
   };
};
