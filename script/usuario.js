$(document).ready(function() {
    $('#NomeUsuario').append(sessionStorage.NomeCompleto);
    $('#CPFUsuario').append(sessionStorage.Cpf);
    $('#DtNascimentoUsuario').append(sessionStorage.DtNascimento);
    if (sessionStorage.Genero == "F"){
        $('#GeneroUsuario').append("Feminino");
    } else {
        $('#GeneroUsuario').append("Masculino");
    }
    if (sessionStorage.temComorbidades == "true"){
        $('#TemComorbidade').append("Possui");
    } else {
        $('#TemComorbidade').append("Não Possui");
    }
    $('#EmailUsuario').append(sessionStorage.Email);
    $('#CEPUsuario').append(sessionStorage.Cep);


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