//=====DEFINISI UMUM=====//

//=====CONST=====//

const tmpt_skor = document.getElementById('skor');
const isi_soal = document.getElementById('soal');
const generate = document.getElementById('gnrt');
const tmpt_jwban = document.getElementById('jwb');
const kirim = document.getElementById('kirim');
const hints = document.getElementById('hint');
const hsil = document.getElementById('skor_pemain');

//=====LET=====//
  
let kumpulan_string = ['Meja','Batu','Dinding','Kursi','Motor','Mobil','Administrasi','Cat','Cermin','Individu','Jaket','Handphone','Novel','Jam','Organisasi','Filsafat','Ekspresi','Danau','Geologi','Matahari','Jangkrik','Aktris','Boneka','Bingkai','Kunci','Cangkir','Balon','Fasilitas','Imajinasi','Vegetarian','Sekolah','Rumah','Sungai','Matematika','Zebra','Truk','KupuKupu','Lempar','Kamera','Komersial','Museum','Bunglon','Jendela','Perpustakaan','Pengalaman','Metamorfosis','Tubuh','Kerangka','Televisi','Heterozigot'];
let string_keArray = [];
let string_arrRandom = [];
let string_random = '';
let string_besar = '';
let penghubung_string = '';
let level = 0;
let level_semua = 0;
let benar = 0;
let salah = 0;
let kesempatan = 0;
let h = 0;

//===================//
//=====MEKANISME=====//
//===================//

//=====Kumpulan Function=====//

function nilai(){
  
  //=====Menampilkan Tempat Level=====//
  
  tmpt_skor.innerHTML = '<span>Kata ke - </span>';
  
  const score1 = document.createElement('span');
  const score2 = document.createElement('span');
  const score3 = document.createElement('span');
  
  score1.setAttribute('id', 'lvl');
  score2.innerHTML = ' / ';
  score3.setAttribute('id', 'lvl_smua');
  
  tmpt_skor.appendChild(score1);
  tmpt_skor.appendChild(score2);
  tmpt_skor.appendChild(score3);
  
  //=====Menampilkan Level Awal=====//
  
  const lvl = document.getElementById('lvl');
  const lvlslrh = document.getElementById('lvl_smua');
  
  lvl.innerHTML = level;
  lvlslrh.innerHTML = kumpulan_string.length;
  
};

function sistem() {
  
  //=====Restart Data=====//
  
  string_keArray = [];
  string_arrRandom = [];
  string_random = '';
  string_besar = '';
  
  //=====Sistem Random=====//
  
  let x = Math.floor(Math.random() * kumpulan_string.length);
  
  setTimeout(function(){
  
  //=====Memunculkan Kata Random=====//
  
    for (let a = 0; a < (kumpulan_string[x].length); a++) {
    
      //=====Memasukkan String ke Array=====//
    
      string_random += kumpulan_string[x].charAt(a);
      string_besar = string_random.toUpperCase();
      string_keArray.push(string_besar.charAt(a));
    
  };
  
  //=====Menghapus String dari Array=====//
  
  kumpulan_string.splice(x, 1);
  console.log('Menghapus 1 String');
  
  //=====Membuat Array Random=====//
  
  for (let b = 0; b < string_keArray.length; b++) {
    
    string_arrRandom.push(string_keArray[b]);
    
  };
  
  string_arrRandom.sort();
  isi_soal.innerHTML = string_arrRandom.join(' - ');
  
  console.log(string_random);
  console.log(string_besar);
  
  //=====Tambah Level=====//
  
  level += 1;
  lvl.innerHTML = level;
  
  },100);
  
  let y = 3 - kesempatan;
  kesempatan += y;
  
  //=====Tombol Kirim dan Hint=====//
  
  kirim.removeAttribute('disabled');
  
  const kunci2 = document.createAttribute('disabled');
  hints.setAttributeNode(kunci2);
  hints.innerHTML = 'Hint (Terkunci)';
  
};

//===============//
//=====MULAI=====//
//===============//

window.addEventListener('load', function() {
  
  alert('Peraturan:\n\n1. Jika kamu berhasil menjawab sebelum kesempatan habis, maka skormu akan bertambah.\n2. Jika kamu salah menjawab hingga kesempatanmu habis, maka nanti hint otomatis terbuka, dan tombol kirim akan otomatis terkunci.\n3. Jika ada kata pengulangan, Jangan gunakan spasi!\n\nBagi yang kebingungan letak kesempatannya, yaitu di sebelah tulisan kirim pada tombol kirim');
  
})

//==========//

generate.addEventListener('click', function(){
  
  tmpt_jwban.removeAttribute('disabled');
  kirim.removeAttribute('disabled');
  
  nilai();
  sistem();
  
  //=====Menghilangkan Tombol=====//
  
  generate.parentNode.removeChild(generate);
  
  
  
});

//====================//
//=====KESEMPATAN=====//
//====================//

setInterval(function() {
  
  kirim.innerHTML = 'Kirim (' + kesempatan + ')'
  
},100);

//===================//
//=====ELIMINASI=====//
//===================//

kirim.addEventListener('click', function() {
  
  const jwban_string = tmpt_jwban.value;
  const jwban_besar = jwban_string.toUpperCase();
  
  if (jwban_besar != string_besar && jwban_besar != '') {
    
    if (kesempatan == 1) {
      
      const kunci = document.createAttribute('disabled');
      
      kirim.setAttributeNode(kunci);
      hints.removeAttribute('disabled');
      hints.innerHTML = 'Hint (Terbuka)';
      
    };
    
    if (kesempatan > 0) {
      kesempatan--;
    };
    
    alert('Anda Salah!\n\nSepertinya ada yang salah dengan jawabanmu. Dan pastikan tidak menggunakan spasi!');
    
    tmpt_jwban.value = ''
    
  };
  
  if (jwban_besar == string_besar && jwban_besar != '' && kesempatan > 0) {
    
    tmpt_jwban.value = '';
    
    h += 1;
    hsil.innerHTML = h;
    
    sistem();
    
  };
  
});

//==============//
//=====HINT=====//
//==============//

hints.addEventListener('click', function() {
  
  alert('\nJawabannya adalah ' + string_besar + '\n');
  sistem();
  
});

//================//
//=====MENANG=====//
//================//

if (kumpulan_string == []) {
  
  //=====Memberi Ucapan=====//
  
  alert('Selamat!!\n\nKamu telah menyelesaikan permainan ini\n\nKamu memperoleh nilai :' + Math.round(h * (100 / kumpulan_string.length)));
  
};

