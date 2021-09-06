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

	$("#listar_pessoas").click(function(){
        
        $.ajax({
            url: 'http://127.0.0.1:5000/listar_pessoas',
            method: 'GET',
            dataType: 'json', // os dados são recebidos no formato json
            success: listar_pessoas, // chama a função listar_plantas para processar o resultado
            error: function() {
                alert("erro ao ler dados, verifique o backend");
            }
        });
        function listar_pessoas(pessoas) {
            alert(pessoas)
        }

    });
});