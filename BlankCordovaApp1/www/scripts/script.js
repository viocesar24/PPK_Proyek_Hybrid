﻿function validasiLogin() {
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

const flash = async (correct) => {
    if (correct == true) {
        $('#panelMainFlash').css('background', '#90ee90'); // lightgreen
    }
    else {
        $('#panelMainFlash').css('background', '#f08080'); // lightcoral
    }

    $('#panelMainFlash').show();
    await sleep(600);
    $('#panelMainFlash').hide();
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
                $('#halaman-main').animate({ opacity: '0' }, 500, 'linear', function () {
                    $('.main-header center').html(`
                    <h1>SUMMARY</h1>
                `);
                    $('#panelMainBackground').css('padding', '0px');
                    $('#panelMainBackground center').css('top', '20%');
                    $('#panelMainBackground center').html(`
                    <div id="score-label" style="font-size: 1.5em;">FINAL SCORE</div>
                    <div id="score-holder" style="font-size: 12em; top: 0px;">${score}</div>
                    <div style="bottom: 0%;height: 15%;width: 100vw;">
                        <h3 style="position: absolute;left: 5%;bottom: 20%;">Benar: ${correct}/${totalSoal}</h3>
                        <center style="margin-top: 100px;">
                            <button class="ui-btn selesai-button">
                                Selanjutnya
                            </button>
                        </center>
                        <h3 style="position: absolute;right: 5%;bottom: 20%;">Durasi: ${durasi.toFixed(2)} detik</h3>
                    </div>
                `);
                    var isGood = correct > Math.floor(totalSoal / 2.0);
                    $('#panelMainMask').css('display', 'none');
                    $('.selesai-button').on('click', function () {
                        $('#score-holder').animate({
                            opacity: '0'
                        }, 400, 'linear', function () {
                            $('#score-label').css('display', 'none');
                            $('#score-holder').html(
                                `<img src="images/${isGood ? "good" : "bad"}.jpg" alt="komentar" style="max-width: 65vw;">`
                            );
                            $('#score-holder').animate({
                                opacity: '1'
                            }, 400, 'linear', function () {
                                $('.selesai-button').html('Selesai');
                                $('.selesai-button').on('click', function () {
                                    $('#halaman-main').html('');
                                    $.mobile.navigate("#halaman-kategori");
                                });
                            });
                        });
                    });
                    $('#panelMainBackground').animate({
                        left: '0%'
                    }, 300, 'swing');
                    score = 0;
                    bonus = 0;
                    correct = 0;
                    totalSoal = 0;
                    durasi = 0.0;

                    $('#halaman-main').animate({ opacity: '1' }, 500, 'linear');
                });
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
                            step: async (now, tween) => {
                                if (answer != -1) {
                                    $('#panelMainMask').stop();
                                    $('#panelMainMask').animate({
                                        left: '100%'
                                    }, 1, 'linear');
                                    if (answer == 1) {
                                        score += 100 + bonus;
                                        bonus += 10;
                                        correct++;
                                        await flash(true);
                                    }
                                    else {
                                        bonus = 0;
                                        await flash(false);
                                    }
                                    answer = -1;
                                    totalSoal++;

                                    loadSoal(ktg, ++idx);

                                    return;
                                }

                                if (now == 100) {
                                    bonus = 0; // Timeout dihitung salah, reset bonus

                                    answer = -1;
                                    totalSoal++;

                                    await flash(false);
                                    loadSoal(ktg, ++idx);

                                    return;
                                }
                            }
                        });
                });
            }
        });
}