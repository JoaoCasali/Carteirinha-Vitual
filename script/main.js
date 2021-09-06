$(document).ready(function() {	  
	$("#botao").click(function(){
		$(".menu_lateral").toggleClass("active");
	});
	var counter = 1;
	setInterval(function(){
		$('#radio' + counter)[0].checked = true;
		counter++;
		if(counter > 4){
			counter = 1;
		}
	}, 5000);

	$.ajax({
		url: 'http://localhost:5000/listar_agendamentos',
		method: 'GET',
		dataType: 'json', // os dados são recebidos no formato json
		success: listar_agendamentos, // chama a função listar_agendamentos para processar o resultado
		error: function() {
			alert("erro ao ler dados, verifique o backend");
		}
	});
	function listar_agendamentos(resultado){
		alert(resultado)
	}
});