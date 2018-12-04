var user;

function Login() {
    var uname = document.getElementById("username").value;
    var pass = document.getElementById("password").value;
    var data2 = $('#form_login').serialize();
    $('#alert-login').css('color', 'white');
    $("#alert-login").html("Mohon tunggu...");
    $.ajax({
        url: "http://darkflame-webservice.000webhostapp.com/services/funstudy/php/login.php",
        type: "POST",
        data: data2,
        error: function (xhr, status, error) {
            $('#alert-login').css('color', 'lightcoral');
            $("#alert-login").html("Request timeout. Silahkan coba lagi.");
        },
        success: function (data, status, xhr) {
            $('#alert-login').css('color', 'white');
            $("#alert-login").html("");
            if (data == 'invalid') {
                $('#alert-login').css('color', 'lightcoral');
                $("#alert-login").html("Username dan Password salah");
            } else {
                user = JSON.parse(data);
                $('#usertext').html(user.username);
                $.mobile.navigate("#halaman-utama");
            }
        },
        timeout: 60000
    });
}

function Register() {

}

$('#usertext').on('mouseup', function () {
    $.mobile.navigate('#halaman-profil');
});

$('.profil-btn').on('mousedown', function () {
    $('#profil-nama').html(user.nama);
    $('#profil-score').html('Total Score: ' + user.score);
    $('#profil-input-nama').val(user.nama);
    $('#profil-input-username').val(user.username);
    $('#profil-input-password1').val('');
    $('#profil-input-password2').val('');
    $('#profil-alert').html('');
});

$('#profil-input-edit').on('click', function () {
    if ($('#profil-input-password1').val() == '') {
        $('#profil-alert').css('color', 'red');
        $('#profil-alert').html('Kata Sandi dibutuhkan untuk mengubah profil.');
        return;
    }
    else {
        $('#profil-alert').html('');
    }
    if ($('#profil-input-password1').val() != user.password) {
        $('#profil-alert').css('color', 'red');
        $('#profil-alert').html('Kata Sandi lama salah.');
        return;
    }

    var modifyPass = !($('#profil-input-password2').val() == '' || $('#profil-input-password1').val() == $('#profil-input-password2').val());

    $.post('http://darkflame-webservice.000webhostapp.com/services/funstudy/php/ubah_profil.php', {
        currentUsername: user.username,
        newUsername: $('#profil-input-username').val(),
        nama: $('#profil-input-nama').val(),
        password: modifyPass ? $('#profil-input-password2').val() : $('#profil-input-password1').val()
    }, function (data, status) {
        if (data == 'success') {
            $('#username').val('');
            $('#password').val('');
            $('#alert-login').css('color', 'lightgreen');
            $('#alert-login').html('Profil berhasil disimpan. Mohon login ulang untuk melanjutkan.');
            $.mobile.navigate('#halaman-login');
        }
        else {
            $('#profil-alert').css('color', 'red');
            $('#profil-alert').html('Gagal menyimpan profil. Mohon cek koneksi anda.');
        }
    });
});

$('.logout-btn').on('mousedown', function () {
    $('#alert-login').html('');
    $('#username').val('');
    $('#password').val('');
});