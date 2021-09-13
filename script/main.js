$(document).ready(function() {
	// função que abre e fecha o menu
	// Caso tenha um click no botao ele executará a função 
    $("#botao").click(function(){
		// Adiciona a classe no menu_lateral caso não tenha, caso tenha, remove dele
		$(".menu_lateral").toggleClass("active");
	});
	$("#logar").click(function(){
		// Fazendo com que as informações do individuo apareça quando clicar em login
		alert("OIi")
	});
	$("#log_out").click(function(){
		// Fazendo com que as informações do individuo desapareça quando clicar em logout
		$(".profile_content").addClass("invisivel");
		$(".login_content").removeClass("invisivel");
	});
});