$(document).ready(function () {

    $("#inputCpf").keypress(function (event) {
        // Se for digitado numeros, chama a função de mascara
        if (event.which > 47 && event.which < 58) {
            mascara_cpf("#inputCpf");
            // Caso seja digitado qualquer outra coisa, a função acaba
        } else {
            event.preventDefault();
        }
    });
});
function mascara_cpf(valor) {
    // Pegando a informação do site
    var cpf = $(valor).val();
    // Contagem que determina onde terá ponto
    if (cpf.length == 3 || cpf.length == 7) {
        // Adicionando ponto no site
        $(valor).val(cpf + '.');
    };
    // Contagem que determina onde terá hífen
    if (cpf.length == 11) {
        // Adicionando hífen no site
        $(valor).val(cpf + '-');
    };
};