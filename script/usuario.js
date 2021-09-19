$(document).ready(function() {
    $('#numerodapessoa').val(sessionStorage.Id);
    $('#upload-file-btn').click(function() {
        var form_data = new FormData($('#upload-file')[0], sessionStorage.Id);
        $.ajax({
            type: 'POST',
            url: 'http://localhost:5000/upload_file',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            success: function(data) {
                console.log('Success!');
            },
        });
    });
});