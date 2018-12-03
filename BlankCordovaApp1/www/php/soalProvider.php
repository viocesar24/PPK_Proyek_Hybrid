<?php

include 'soalClass.php';

$soalMatematika = array(
    new Soal("1 = 3 - 2", true, 3),
    new Soal("10 = 5 x 2", true, 3),
    new Soal("6 + 3 x 2 = 18", false, 5),
    new Soal("100 / 5 = 25", false, 8),
    new Soal("5 x 6 x 7 = 155", false, 10),
);

$soalBiologi = array(
    new Soal("1 = 3 - 2", true, 3),
    new Soal("10 = 5 x 2", true, 3),
    new Soal("6 + 3 x 2 = 18", false, 5),
    new Soal("100 / 5 = 25", false, 8),
    new Soal("5 x 6 x 7 = 155", false, 10),
);

$soalSejarah = array(
    new Soal("1 = 3 - 2", true, 3),
    new Soal("10 = 5 x 2", true, 3),
    new Soal("6 + 3 x 2 = 18", false, 5),
    new Soal("100 / 5 = 25", false, 8),
    new Soal("5 x 6 x 7 = 155", false, 10),
);

$soalIndonesia = array(
    new Soal("1 = 3 - 2", true, 3),
    new Soal("10 = 5 x 2", true, 3),
    new Soal("6 + 3 x 2 = 18", false, 5),
    new Soal("100 / 5 = 25", false, 8),
    new Soal("5 x 6 x 7 = 155", false, 10),
);

$index = $_POST['index'];

switch ($_POST['kategori']) {
    case 'matematika':
        $soal = $soalMatematika;
        break;
    case 'biologi':
        $soal = $soalBiologi;
        break;
    case 'sejarah':
        $soal = $soalSejarah;
        break;
    case 'indonesia':
        $soal = $soalIndonesia;
        break;
    default:
        # code...
        break;
}

if ($index >= count($soal)) {
    echo 'finish';
}
else {
    $selSoal = $soal[$index];

    if ($selSoal->Jawaban == true) {
        $kelasBenar = ' opsi-benar';
        $kelasSalah = ' opsi-salah';
    } else {
        $kelasBenar = ' opsi-salah';
        $kelasSalah = ' opsi-benar';
    }
    
    
    echo '<div data-role="header" class="main-header">
            <center>
                <h1>'.strtoupper($_POST['kategori']).'</h1>
            </center>
          </div>
    <!-- Isi -->
    <div role="main" class="ui-content" id="panelMainBackground">
        <div id="panelMainFlash"></div>
        <div id="panelMainMask"></div>
        <center>
            <span id="spanDurasi" style="display: none;">' . $selSoal->Durasi . '</span>
            <h2>Pernyataan ' . ($index + 1) . '/' . count($soal) . '</h2>
            <h1>' . $selSoal->Soal . '</h1>
            <a href="#" class="benarButton' . $kelasBenar . '" style="color: white">BENAR</a>
            <a href="#" class="salahButton' . $kelasSalah . '" style="color: white">SALAH</a>
        </center>
    </div>
    <!-- Footer -->
    <div data-role="footer" class="main-footer">
        <center>
            <h4>@copyright, Fun Study</h4>
        </center>
    </div>';
}


