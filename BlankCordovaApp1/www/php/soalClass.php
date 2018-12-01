<?php

class Soal
{
    var $Soal;
    var $Jawaban;
    var $Durasi;

    public function __construct($soal, $jawaban, $durasi) 
    { 
        $this->Soal = $soal; 
        $this->Jawaban = $jawaban;
        $this->Durasi = $durasi;
    } 
}

?>