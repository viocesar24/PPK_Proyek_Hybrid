function validasiLogin() {
    var uname = document.getElementById("username").value;
    var pass = document.getElementById("password").value;
    if (uname == "player" && pass == "player") {
        $.mobile.navigate("#halaman-utama");
        //} else if (uname == "admin" && pass == "admin") {
        //    alert("Selamat datang ADMIN");
        //    location.href = "#admin-page";
    } else {
        document.getElementById("alert-login").innerHTML = "Username dan Password salah";
    }
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

var indexSoal = 0;
const startGame = async (kategori) => {
    $.mobile.navigate("#halaman-main");
    await sleep(1000);
    for (var i = 5; i > 0; i--) {
        $('#halaman-main').html(`<div class="countdown-text">${i}</div>`);
        animateCountdown(true);
        await sleep(1000);
    }
    indexSoal = 0;

    loadSoal(kategori, indexSoal++);
    startTimer();
}

const animateCountdown = async (enter) => {
    if (enter == true) {
        $('.countdown-text').animate({
            left: "45%",
            fontSize: "10em"
        }, 400, 'linear', function () {
            animateCountdown(false);
        });
    }
    else {
        await sleep(200);
        $('.countdown-text').animate({
            left: "110%",
            fontSize: "5em"
        }, 400, 'linear', function () {
            $(this).removeAttr('style');
        });
    }
}

$('.kategori').on('click', function () {
    startGame($(this).attr('alt'));
});

var timerEnabled = false;
var durasi = 0.0;
const startTimer = async () => {
    timerEnabled = true;
    while (timerEnabled) {
        await sleep(100);
        durasi += 0.1;
    }
}

var score = 0;
var bonus = 0;
var correct = 0;
var totalSoal = 0;
var answer = -1;
const loadSoal = async (ktg, idx) => {
    answer = -1;
    $.post('php/soalProvider.php', {
        kategori: ktg,
        index: idx
    },
        function (data, status) {
            if (data == 'finish') {
                timerEnabled = false;
                durasi -= totalSoal * 0.3;
                $('.main-header center').html(`
                    <h1>SUMMARY</h1>
                `);
                $('#panelMainBackground').css('padding', '0px');
                $('#panelMainBackground center').css('top', '20%');
                $('#panelMainBackground center').html(`
                    <div style="font-size: 1.5em;">FINAL SCORE</div>
                    <div style="font-size: 12em;/* position: absolute; */top: 0px;">${score}</div>
                    <div style="/* position: absolute; */bottom: 0%;height: 15%;width: 100vw;">
                        <h3 style="position: absolute;left: 5%;bottom: 20%;">Benar: ${correct}/${totalSoal}</h3>
                        <center style="margin-top: 100px;">
                            <button class="ui-btn selesai-button" onclick="window.location.href='#halaman-kategori'">
                                Selesai
                            </button>
                        </center>
                        <h3 style="position: absolute;right: 5%;bottom: 20%;">Durasi: ${durasi.toFixed(2)} detik</h3>
                    </div>
                `);
                $('#panelMainMask').css('display', 'none');
                $('.selesai-button').on('click', function(){
                    $('#halaman-main').html('');
                });
                $('#panelMainBackground').animate({
                    left: '0%'
                }, 300, 'swing');
                score = 0;
                bonus = 0;
                correct = 0;
                totalSoal = 0;
                durasi = 0.0;
            }
            else {
                $('#halaman-main').html(data);

                $('.opsi-benar').on('click', function () {
                    answer = 1;
                });

                $('.opsi-salah').on('click', function () {
                    answer = 0;
                });

                $('#panelMainBackground').animate({
                    left: '0%'
                }, 300, 'swing', function () {
                    $('#panelMainMask').animate({
                        left: '100%'
                    }, {
                            duration: parseInt($('#spanDurasi').html()) * 1000,
                            easing: 'linear',
                            step: function () {
                                if (answer != -1) {
                                    $('#panelMainMask').stop();
                                    if (answer == 1) {
                                        score += 100 + bonus;
                                        bonus += 10;
                                        correct++;
                                    }
                                    else {
                                        bonus = 0;
                                    }
                                    answer = -1;
                                    $('#panelMainBackground').animate({
                                        left: '100%'
                                    }, 300, 'swing', function () {
                                        loadSoal(ktg, ++idx);
                                    });
                                    totalSoal++;
                                    return;
                                }
                            },
                            complete: function () {
                                bonus = 0;
                                answer = -1;
                                $('#panelMainBackground').animate({
                                    left: '100%'
                                }, 300, 'swing', function () {
                                    loadSoal(ktg, ++idx);
                                });
                                totalSoal++;
                            }
                        });
                });
            }
        });
}