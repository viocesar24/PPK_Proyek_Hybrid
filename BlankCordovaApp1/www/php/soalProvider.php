<?php

include 'soalClass.php';

$soalMatematika = array(
    new Soal("1 = 3 - 2", true, 3), //Soal tingkat SD
    new Soal("10 = 5 x 2", true, 3), //Soal tingkat SD
    new Soal("10 x 3 = 6 x 5", true, 3), //Soal tingkat SD
    new Soal("129 x 0 / 1 = 86 / 12 x 3", false, 3), //Soal tingkat SD
    new Soal("Sudut pada segitiga : 30 derajat, 90 derajat, 90 derajat", false, 7), //Soal tingkat SMP
    new Soal("Phytagoras dari Segitia siku-siku adalah 3 : 4 : 6", false, 7), //Soal tingkat SMP
    new Soal("Persegi Panjang : Panjang = 4cm, Lebar = 3cm, Keliling = 84cm, Luas = 432cm^2", true, 7), //Soal tingkat SMP
    new Soal("∛64 × √25 ÷ ∛8 = 10", true, 7), //Soal tingkat SMP
    new Soal("cos2(X) + 7sin(X) - 4 = 0, X = 30 derajat dan 100 derajat untuk -180 <= X <= 180", false, 11), //Soal tingkat SMA
    new Soal("Determinan dari x^1 = 3x - 5y dan y^1 = -x + 2y adalah 2", false, 11), //Soal tingkat SMA
);

$soalBiologi = array(
    new Soal("Lidah digunakan untuk meraba", false, 3), //Soal tingkat SD
    new Soal("Mata manusia berjumlah dua", true, 3), //Soal tingkat SD
    new Soal("Jari kaki manusia berjumlah sepuluh", true, 3), //Soal tingkat SD
    new Soal("Nenek tidak bisa membaca tulisan kecil, nenek mengalami rabun dekat", true, 3), //Soal tingkat SD
    new Soal("Larutan biru metilen dapat memperjelas warna tumbuhan", false, 7), //Soal tingkat SMP
    new Soal("Metamorphosis tidak sempurna : telur – larva - kepompong – imago", false, 7), //Soal tingkat SMP
    new Soal("Gastritis merupakan gangguan pada pangkal usus besar yang disebabkan oleh kelebihan asam dalam lambung", false, 7), //Soal tingkat SMP
    new Soal("Ketika menarik napas, otot-otot pernapasan di rongga dada mengembang", false, 7), //Soal tingkat SMP
    new Soal("Jaringan parenkim yang terdapat pada daun adalah palisade dan spons", true, 11), //Soal tingkat SMA
    new Soal("Proses pembentukan urin terjadi di nefron ginjal", true, 11), //Soal tingkat SMA
);

$soalSejarah = array(
    new Soal("Presiden pertama adalah Soeharto", false, 3), //Soal tingkat SD
    new Soal("Bandara Soekarno-Hatta termasuk peninggalan sejarah di Indonesia", false, 3), //Soal tingkat SD
    new Soal("Candi Borobudur berlokasi di Kota Malang ", false, 3), //Soal tingkat SD
    new Soal("Tempat peninggalan sejarah sangat bermanfaat dalam bidang perhutanan", false, 3), //Soal tingkat SD
    new Soal("Zaman prasejarah adalah zaman manusia telah mengenal tulisan", false, 7), //Soal tingkat SMP
    new Soal("Polithteisme adalah percaya pada banyak dewa", true, 7), //Soal tingkat SMP
    new Soal("Budha Hinnayana adalah kendaraan kecil dan hanya bisa mengantarkan 1 orang ke nirwana", true, 7), //Soal tingkat SMP
    new Soal("Kaum tani, tukang dan pedagang termasuk dalam kasta arya", true, 7), //Soal tingkat SMP
    new Soal("Peninggalan sejarah inkripsi antara lain tulisan pada batu", true, 11), //Soal tingkat SMA
    new Soal("Brawijaya V adalah raja terakhir Kerajaan Majapahit", true, 11), //Soal tingkat SMA
);

$soalIndonesia = array(
    new Soal("Membuang sampah harus di jalan", false, 3), //Soal tingkat SD
    new Soal("Andi belum makan, Andi merasa senang", false, 3), //Soal tingkat SD
    new Soal("Budi sedang membaca buku, Budi membaca dengan lemah gemulai", false, 3), //Soal tingkat SD
    new Soal("S.P.O.K : Subjek Predikat Objek Keterangan", true, 3), //Soal tingkat SD
    new Soal("Arti istilah dikonversi adalah ditukar", true, 7), //Soal tingkat SMP
    new Soal("Arti istilah pesat adalah cepat", true, 7), //Soal tingkat SMP
    new Soal("Prestise berarti penyelesaian", false, 7), //Soal tingkat SMP
    new Soal("Matahari mulai tenggelam bermakna akan turun hujan", false, 7), //Soal tingkat SMP
    new Soal("Yang termasuk konjungsi subordinatif syarat antara lain jika, bila", true, 11), //Soal tingkat SMA
    new Soal("Datang tampak muka, pulang tampak punggung artinya Hendaklah berpamitan ketika datang ataupun pulang", true, 11), //Soal tingkat SMA
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
    
    
    echo '
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
    </div>';
}