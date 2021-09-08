$(document).ready(function() {
	// função que abre e fecha o menu
	// Caso tenha um click no botao ele executará a função 
    $("#botao").click(function(){
		// Adiciona a classe no menu_lateral caso não tenha, caso tenha, remove dele
		$(".menu_lateral").toggleClass("active");
	});
});