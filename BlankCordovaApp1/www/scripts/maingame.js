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
            left: "40%",
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

const UpdateAchievement = function (added_score) {
    var totalScore = Number.parseInt(user.score) + Number.parseInt(added_score);
    $.post('http://darkflame-webservice.000webhostapp.com/services/funstudy/php/ubah_score.php', {
        username: user.username,
        score: totalScore
    }, function(data, status){
        if (data == 'success') {
            $('#alert-scoreupdate').css('color', 'green');
            $('#alert-scoreupdate').html('Total score: ' + totalScore);
            user.score = totalScore;
        }
        else {
            $('#alert-scoreupdate').css('color', 'red');
            $('#alert-scoreupdate').html('Score tidak dapat diupdate. Mohon cek koneksi anda.');
        }
    });
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
    $.post('http://darkflame-webservice.000webhostapp.com/services/funstudy/php/soalProvider.php', {
        kategori: ktg,
        index: idx
    },
        function (data, status) {
            if (data == 'finish') {
                timerEnabled = false;
                durasi -= totalSoal * 0.3;
                $('#halaman-main').animate({ opacity: '0' }, 500, 'linear', function () {
                    $('#panelMainBackground').css('padding', '0px');
                    $('#panelMainBackground center').css('top', '0%');
                    $('#panelMainBackground center').html(`
                    <div data-role="header" role="banner" class="ui-header ui-bar-inherit">
                        <h1 class="ui-title" role="heading" aria-level="1" style="font-size: 7vw;">SUMMARY</h1>
                    </div>
                    <div id="score-label" style="font-size: 10vw; margin-top: 5%;">FINAL SCORE</div>
                    <div id="score-holder" style="font-size: 40vw; top: 0px;">${score}</div>
                    <div style="bottom: 0%;height: 15%;width: 100vw;">
                        <h3 style="position: absolute;left: 5%;bottom: 20%;">Benar: ${correct}/${totalSoal}</h3>
                        <center style="margin-top: 100px;">
                            <div id="alert-scoreupdate" style="text-align: center;"></div>
                            <button class="ui-btn selesai-button">
                                Selanjutnya
                            </button>
                        </center>
                        <h3 style="position: absolute;right: 5%;bottom: 20%;">Durasi: ${durasi.toFixed(2)} detik</h3>
                    </div>
                    <div data-role="footer" role="contentinfo" class="ui-footer ui-bar-inherit">
                        <h4 class="ui-title" role="heading" aria-level="1">@copyright, Fun Study</h4>
                    </div>
                `);
                    var isGood = correct > Math.floor(totalSoal / 2.0);
                    $('#panelMainMask').css('display', 'none');
                    $('.selesai-button').on('click', function () {
                        $('.selesai-button').unbind('click');
                        $('#score-holder').animate({
                            opacity: '0'
                        }, 400, 'linear', function () {
                            UpdateAchievement(score);
                            $('#score-label').css('display', 'none');
                            $('#score-holder').html(
                                `<img src="http://darkflame-webservice.000webhostapp.com/services/funstudy/images/${isGood ? "good" : "bad"}.jpg" alt="komentar" style="max-width: 65vw; margin-top: 5%;">`
                            );
                            $('#score-holder').animate({
                                opacity: '1'
                            }, 400, 'linear', function () {
                                $('.selesai-button').html('Selesai');
                                $('.selesai-button').on('click', function () {
                                    $('.selesai-button').unbind('click');

                                    $('#halaman-main').html('');
                                    $.mobile.navigate("#halaman-kategori");

                                    $('#alert-scoreupdate').html('');
                                    score = 0;
                                    bonus = 0;
                                    correct = 0;
                                    totalSoal = 0;
                                    durasi = 0.0;
                                });
                            });
                        });
                    });
                    $('#panelMainBackground').animate({
                        left: '0%'
                    }, 300, 'swing');
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
                }, 450, 'swing', function () {
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