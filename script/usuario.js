$(document).ready(function() {
    $('#MostrarComorbidade').hide(); // Omite a linha do tipo comorbidade
    // Função caso clique no radio de comorbidade
    $("input[name ='comorbidade']").click(function(){
        // Esconde ou mostra a linha de tipo de comorbidade caso o radio comorbidade seja true or false
        if ($("input[name ='comorbidade']:checked").val() == "true"){
            $("#EsconderComorbidade").removeClass('invisivel');
        } else if ($("input[name ='comorbidade']:checked").val() == "false"){
            $("#EsconderComorbidade").addClass('invisivel');
            $("#TipoComorbidade").val('');
        }
     });
     // Função caso cliquem no botão de adição
    $(".iconeEdicao").click(function(){
        // Adiciona ou remove a classe invisivel para esconder ou mostrar o sistema de edição de dados
		$("#desabilitada").toggleClass("invisivel");
		$("#habilitada").toggleClass("invisivel");
		$(".conteudo").toggleClass("invisivel"); 
        $(".NomeUsuario").toggleClass("invisivel"); 
        ValoresInput(); // Chama a função para colocar os dados nas caixas de input
	});
    // Adicionando as informações do usuário na tabela
    $('.NomeUsuario').append(sessionStorage.NomeCompleto);
    $('.CPFUsuario').append(sessionStorage.Cpf);
    $('.DtNascimentoUsuario').append(sessionStorage.DtNascimento);
    // Adaptando as informações guardadas na sessão para a tabela
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
    // Adicionando as informações do usuário na tabela
    $('.TipoComorbidades').append(sessionStorage.TipoComorbidade);
    $('.EmailUsuario').append(sessionStorage.Email);
    $('.CEPUsuario').append(sessionStorage.Cep);
    $('.Complemento').append(sessionStorage.Complemento);

    // Função que é acionada ao clicar no botão de salvar mudanças 
    $("#SalvarMudancas").click(function(){
        // Busca as informações que serão alteradas no banco
        NomeCompleto = $("#NomeUsuario").val();
        Cpf = $("#CPFUsuario").val();
        DtNascimento = $("#DtNascimentoUsuario").val();
        // Adaptando a informação para enviar para o banco
        if ($('input[name="comorbidade"]:checked').val() == "true"){
            temComorbidades = true
        } else{
            temComorbidades = false
        }
        // Busca as informações que serão alteradas no banco
        Genero = $('input[name="genero"]:checked').val();
        TipoComorbidades = $("#TipoComorbidade").val();
        Email = $("#EmailUsuario").val();
        Cep = $("#CEPUsuario").val();
        Complemento = $("#Complemento").val();
        // Criando a variável que será mandada para o back end em formato Json
        var dados = JSON.stringify({
            NomeCompleto: NomeCompleto, DtNascimento: DtNascimento, Genero: Genero, Cpf: Cpf, Cep: Cep, Complemento: Complemento, 
            temComorbidades: temComorbidades, TipoComorbidades: TipoComorbidades, Email: Email
        });
        // Fazendo o envio pelo método Ajax
        $.ajax({
            url: 'http://localhost:5000/atualizar_cadastro', // Endereço do banco de dados
            type: 'POST', // O tipo POST é o de envio, enquanto GET é o de recuperação de dados
            dataType: 'json', // Tipo de arquivo que será enviado
            contentType: 'application/json', // tipo dos dados enviados
            data: dados, // estes são os dados enviados
            success: ExecutarMudancas, // Mostra uma mensagem indicando o sucesso na operação adiciona as novas informações no sessionStorage
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
				location.reload(); // Recarrega a página
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

// Função que coloca as informações nas caixas de input
function ValoresInput(){
    $('#NomeUsuario').val(sessionStorage.NomeCompleto);
    $('#CPFUsuario').val(sessionStorage.Cpf);
    $('#DtNascimentoUsuario').val(sessionStorage.DtNascimento);
    $('#EmailUsuario').val(sessionStorage.Email);
    $('#CEPUsuario').val(sessionStorage.Cep);
    $('#Complemento').val(sessionStorage.Complemento);
    // Verifica a informação guardada na sessão para adaptar para os radios
    if (sessionStorage.Genero == "M"){
        $('#GeneroMasculino').prop("checked", true);
    } else {
        $('#GeneroFeminino').prop("checked", true);
    };
    // Verifica a informação guardada na sessão para adaptar para o radio se possui comorbidade
    if (sessionStorage.temComorbidades == "true"){
        $('#TemComorbidade').prop("checked", true);
        $("#EsconderComorbidade").removeClass('invisivel'); // Revela a caixa de input de tipo de comorbidade caso a pessoa possua uma
        $('#TipoComorbidade').val(sessionStorage.TipoComorbidade); // Adiciona as informações na caixa de tipo de comorbidade
    } else {
        $('#NaoTemComorbidade').prop("checked", true);;
        $("#EsconderComorbidade").addClass('invisivel'); // Omite a caixa de input do tipo de comorbidade
    };
}