$(document).ready(function() {
    $('#MostrarComorbidade').hide();
    $("input[name ='comorbidade']").click(function(){
        if ($("input[name ='comorbidade']:checked").val() == "true"){
            $("#EsconderComorbidade").removeClass('invisivel');
        } else if ($("input[name ='comorbidade']:checked").val() == "false"){
            $("#EsconderComorbidade").addClass('invisivel');
            $("#TipoComorbidade").val('');
        }
     });
    $("#desabilitada").click(function(){
		// Adiciona a classe no menu_lateral caso não tenha, caso tenha, remove dele
		$("#desabilitada").addClass("invisivel");
		$("#habilitada").toggleClass("invisivel");
		$(".conteudo").toggleClass("invisivel"); 
        $(".NomeUsuario").toggleClass("invisivel"); 
        ValoresInput();
	});
    $("#habilitada").click(function(){
		// Adiciona a classe no menu_lateral caso não tenha, caso tenha, remove dele
		$("#habilitada").addClass("invisivel");
		$("#desabilitada").toggleClass("invisivel");
		$(".conteudo").toggleClass("invisivel");
        $(".NomeUsuario").toggleClass("invisivel");
	});
    $('.NomeUsuario').append(sessionStorage.NomeCompleto);
    $('.CPFUsuario').append(sessionStorage.Cpf);
    $('.DtNascimentoUsuario').append(sessionStorage.DtNascimento);
    if (sessionStorage.Genero == "F"){
        $('.GeneroUsuario').append("Feminino");
    } else {
        $('.GeneroUsuario').append("Masculino");
    };
    if (sessionStorage.temComorbidades == "true"){
        $('.TemComorbidade').append("Possui");
        $('#MostrarComorbidade').show();
    } else {
        $('.TemComorbidade').append("Não Possui");
    };
    $('.TipoComorbidades').append(sessionStorage.TipoComorbidade);
    $('.EmailUsuario').append(sessionStorage.Email);
    $('.CEPUsuario').append(sessionStorage.Cep);
    $('.Complemento').append(sessionStorage.Complemento);

    $("#SalvarMudancas").click(function(){
        NomeCompleto = $("#NomeUsuario").val();
        Cpf = $("#CPFUsuario").val();
        DtNascimento = $("#DtNascimentoUsuario").val();
        if ($('input[name="comorbidade"]:checked').val() == "true"){
            temComorbidades = true
        } else{
            temComorbidades = false
        }
        Genero = $('input[name="genero"]:checked').val();
        TipoComorbidades = $("#TipoComorbidade").val();
        Email = $("#EmailUsuario").val();
        Cep = $("#CEPUsuario").val();
        Complemento = $("#Complemento").val();
        var dados = JSON.stringify({
            NomeCompleto: NomeCompleto, DtNascimento: DtNascimento, Genero: Genero, Cpf: Cpf, Cep: Cep, Complemento: Complemento, 
            temComorbidades: temComorbidades, TipoComorbidades: TipoComorbidades, Email: Email
        });
        $.ajax({
            url: 'http://localhost:5000/atualizar_cadastro', // Endereço do banco de dados
            type: 'POST', // O tipo POST é o de envio, enquanto GET é o de recuperação de dados
            dataType: 'json', // Tipo de arquivo que será enviado
            contentType: 'application/json', // tipo dos dados enviados
            data: dados, // estes são os dados enviados
            success: ExecutarMudancas, // Mostra uma mensagem indicando o sucesso na operação e limpa o formulário
            error: ErroAoMudar // Caso de erro, mostra uma mensagem indicando o tal
        });
		function ExecutarMudancas (retorno) {
            // Se o back-end retornar ok, procede com tais funções
			if (retorno.resultado == "ok") { 
               // Alerta que teve sucesso
			   	alert("Resultado: " +retorno.resultado + " Detalhes: " + retorno.detalhes);
				// salva os dados em uma sessão
				sessionStorage.Id = retorno.usuario.Id;
				sessionStorage.NomeCompleto = retorno.usuario.NomeCompleto;
				sessionStorage.DtNascimento = retorno.usuario.DtNascimento;
				sessionStorage.Genero = retorno.usuario.Genero;
				sessionStorage.Cpf = retorno.usuario.Cpf;
				sessionStorage.Email = retorno.usuario.Email;
				sessionStorage.Cep = retorno.usuario.Cep;
				sessionStorage.Complemento = retorno.usuario.Complemento;
				sessionStorage.temComorbidades = retorno.usuario.temComorbidades;
				sessionStorage.TipoComorbidade = retorno.usuario.TipoComorbidade;
				sessionStorage.Type = retorno.usuario.Type;
				location.reload();
               // Recarrega a página
            };           
        }
		function ErroAoMudar (retorno) {
            // informar mensagem de erro
			alert("Erro: " +retorno.resultado + " Detalhes: " + retorno.detalhes);
        };
    });

    // $('#numerodapessoa').val(sessionStorage.Id);
    // $('#upload-file-btn').click(function() {
    //     var form_data = new FormData($('#upload-file')[0], sessionStorage.Id);
    //     $.ajax({
    //         type: 'POST',
    //         url: 'http://localhost:5000/upload_file',
    //         data: form_data,
    //         contentType: false,
    //         cache: false,
    //         processData: false,
    //         success: function(data) {
    //             console.log('Success!');
    //         },
    //     });
    // });
});

function ValoresInput(){
    $('#NomeUsuario').val(sessionStorage.NomeCompleto);
    $('#CPFUsuario').val(sessionStorage.Cpf);
    $('#DtNascimentoUsuario').val(sessionStorage.DtNascimento);
    $('#EmailUsuario').val(sessionStorage.Email);
    $('#CEPUsuario').val(sessionStorage.Cep);
    $('#Complemento').val(sessionStorage.Complemento);
    if (sessionStorage.Genero == "M"){
        $('#GeneroMasculino').prop("checked", true);
    } else {
        $('#GeneroFeminino').prop("checked", true);
    };
    if (sessionStorage.temComorbidades == "true"){
        $('#TemComorbidade').prop("checked", true);
        $("#EsconderComorbidade").removeClass('invisivel');
        $('#TipoComorbidade').val(sessionStorage.TipoComorbidade);
    } else {
        $('#NaoTemComorbidade').append("Não Possui");
        $("#EsconderComorbidade").addClass('invisivel');
    };
}