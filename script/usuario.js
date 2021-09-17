$(document).ready(function() {
    $('#formImagem').submit(function(e){
        e.preventDefault();
        imagem = $('#imagem').val();
        $.ajax({
            url: 'http://localhost:5000/upload_file', // Endereço do banco de dados
            type: 'POST', // O tipo POST é o de envio, enquanto GET é o de recuperação de dados
            dataType: 'image', // Tipo de arquivo que será enviado
            contentType: 'application/json', // tipo dos dados enviados
            data: imagem, // estes são os dados enviados
            success: alert("Deu certo!"), // Mostra uma mensagem indicando o sucesso na operação e limpa o formulário
            error: alert("Deu errado") // Caso de erro, mostra uma mensagem indicando o tal
        });
    });
});