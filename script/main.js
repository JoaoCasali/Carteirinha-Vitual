$(document).ready(function() {
	// função que abre e fecha o menu
	// Caso tenha um click no botao ele executará a função
	if (sessionStorage.Type == 'cidadao'){
		$("#FunCidadao").removeClass("invisivel");
		$(".profile_content").removeClass("invisivel");
		$(".login_content").addClass("invisivel");
	}
    $("#botao").click(function(){
		// Adiciona a classe no menu_lateral caso não tenha, caso tenha, remove dele
		$(".menu_lateral").toggleClass("active");
	});
	$("#logar").submit(function(e){
		e.preventDefault();
		Email = $("#loginEmail").val();
      	Senha = $("#loginSenha").val();
		var dados = JSON.stringify({
            Email: Email, Senha: Senha
        });
		$.ajax({
            url: 'http://localhost:5000/login', // Endereço do banco de dados
            type: 'POST', // O tipo POST é o de envio, enquanto GET é o de recuperação de dados
            dataType: 'json', // Tipo de arquivo que será enviado
            contentType: 'application/json', // tipo dos dados enviados
            data: dados, // estes são os dados enviados
            success: executarLogin, // Mostra uma mensagem indicando o sucesso na operação e limpa o formulário
            error: erroAoLogar // Caso de erro, mostra uma mensagem indicando o tal
        });
		function executarLogin (retorno) {
            // Se o back-end retornar ok, procede com tais funções
            alert("Resultado: " +retorno.resultado + " Detalhes: " + retorno.detalhes);
			sessionStorage.Type = retorno.usuario.Type;
			sessionStorage.usuario = retorno;
			alert(sessionStorage.usuario.usuario);
			location.reload();
			// if (retorno.resultado == "ok") { 
            //    // Alerta que teve sucesso
			   
            //    // Redireciona para outra página
            // } else {
            //    // informar mensagem de erro
            //    alert(retorno.resultado);
            //    }            
        }
		function erroAoLogar (retorno) {
            // informar mensagem de erro
			alert("Erro: " +retorno.resultado + " Detalhes: " + retorno.detalhes);

         }
	});
	$("#log_out").click(function(){
		// Fazendo com que as informações do individuo desapareça quando clicar em logout
		$(".profile_content").addClass("invisivel");
		$(".login_content").removeClass("invisivel");
		sessionStorage.clear();
	});
});