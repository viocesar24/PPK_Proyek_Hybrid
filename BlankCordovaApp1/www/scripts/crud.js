var user;

function Login() {
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

function validasiRegister() {
    var psw = document.getElementById("psw").value;
    var ulangi_psw = document.getElementById("ulangi_psw").value;
    if (ulangi_psw != psw) {
        document.getElementById("alert-register").innerHTML = "Input Ulangi Password dan Password tidak sama";
    } else {
        Register();
        $.mobile.navigate("#halaman-daftar");
    }
}

function Register() {
    //mengambil value dari form input
    var data2 = $('#form_register').serialize();
    $('#alert-register').css('color', 'white');
    $("#alert-register").html("Mohon tunggu...");
    $.ajax({
        type: "POST",
        data: data2,
        //ganti url dengan lokasi dimana file signup berada
        url: "http://darkflame-webservice.000webhostapp.com/services/funstudy/php/register.php",
        success: function (data) {
            console.log(data);
            if (data == "success") {
                $('#alert-login').css('color', 'lightgreen');
                $("#alert-login").html("Selamat! Akun anda sudah aktif");
                $.mobile.navigate("#halaman-login");
            }
            else if (data = "exist") {
                $('#alert-register').css('color', 'lightcoral');
                $("#alert-register").html("Username sudah terdaftar");
            }
            else if (data = "failed") {
                $('#alert-register').css('color', 'lightcoral');
                $("#alert-register").html("Gagal mendaftar");
            }
        },
        timeout: 60000,
        error: function () {
            $('#alert-register').css('color', 'lightcoral');
            $("#alert-register").html("Request Timeout");
        }
    });
}

function HapusAkun() {
    $.ajax({
        url: "http://darkflame-webservice.000webhostapp.com/services/funstudy/php/hapus_akun.php",
        error: function (xhr, status, error) {
            $('#profil-alert').css('color', 'red');
            $("#profil-alert").html("Gagal menghapus akun. Silahkan coba lagi.");
        },
        success: function (data, status, xhr) {
            $('#alert-login').css('color', 'white');
            $("#alert-login").html("");
            $.mobile.navigate("#halaman-login");
            if (data == 'success') {
                $('#alert-login').css('color', 'lightcoral');
                $("#alert-login").html(`Akun '${user.username}' telah dihapus`);
            } else {
                $('#alert-login').css('color', 'lightcoral');
                $("#alert-login").html(`Akun dengan username '${user.username}' tidak ditemukan`);
            }
        },
        timeout: 60000
    });
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