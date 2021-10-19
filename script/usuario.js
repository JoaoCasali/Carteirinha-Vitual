$(document).ready(function() {
    $("#desabilitada").click(function(){
		// Adiciona a classe no menu_lateral caso não tenha, caso tenha, remove dele
		$("#desabilitada").addClass("invisivel");
		$("#habilitada").toggleClass("invisivel");
		$(".conteudo").toggleClass("invisivel");
        ValoresInput()
	});

    $("#habilitada").click(function(){
		// Adiciona a classe no menu_lateral caso não tenha, caso tenha, remove dele
		$("#habilitada").addClass("invisivel");
		$("#desabilitada").toggleClass("invisivel");
		$(".conteudo").toggleClass("invisivel");
	});

    $('.NomeUsuario').append(sessionStorage.NomeCompleto);
    $('.CPFUsuario').append(sessionStorage.Cpf);
    $('.DtNascimentoUsuario').append(sessionStorage.DtNascimento);
    if (sessionStorage.Genero == "F"){
        $('.GeneroUsuario').append("Feminino");
    } else {
        $('.GeneroUsuario').append("Masculino");
    }
    if (sessionStorage.temComorbidades == "true"){
        $('.TemComorbidade').append("Possui");
    } else {
        $('.TemComorbidade').append("Não Possui");
    }
    $('.EmailUsuario').append(sessionStorage.Email);
    $('.CEPUsuario').append(sessionStorage.Cep);


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
    $('#CPFUsuario').val(sessionStorage.Cpf);
    $('#DtNascimentoUsuario').val(sessionStorage.DtNascimento);
    $('#EmailUsuario').val(sessionStorage.Email);
    $('#CEPUsuario').val(sessionStorage.Cep);
    if (sessionStorage.Genero == "M"){
        $('#GeneroMasculino').prop("checked", true);
    } else {
        $('#GeneroFeminino').prop("checked", true);
    };
    if (sessionStorage.temComorbidades == "true"){
        $('#TemComorbidade').prop("checked", true);
    } else {
        $('#NaoTemComorbidade').append("Não Possui");
    };
}