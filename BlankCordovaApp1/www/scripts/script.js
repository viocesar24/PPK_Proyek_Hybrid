function validasiLogin() {
    var uname = document.getElementById("username").value;
    var pass = document.getElementById("password").value;
    if (uname == "player" && pass == "player") {
        location.href = "#page-four";
        //} else if (uname == "admin" && pass == "admin") {
        //    alert("Selamat datang ADMIN");
        //    location.href = "#admin-page";
    } else {
        document.getElementById("alert-login").innerHTML = "Username dan Password salah";
    }
}