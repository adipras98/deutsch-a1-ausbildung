// Semua konten di file ini dibuat sendiri (original), bukan salinan soal resmi Goethe-Institut.

export type Word = { de: string; id: string; contoh: string };
export type Topic = { id: string; judul: string; ikon: string; kata: Word[] };

export const topics: Topic[] = [
  {
    id: "perkenalan",
    judul: "Perkenalan Diri",
    ikon: "👋",
    kata: [
      { de: "Ich heiße …", id: "Nama saya …", contoh: "Ich heiße Adi." },
      { de: "Ich komme aus Indonesien.", id: "Saya berasal dari Indonesia.", contoh: "Ich komme aus Indonesien, aus Bandung." },
      { de: "Ich wohne in …", id: "Saya tinggal di …", contoh: "Ich wohne in Jakarta." },
      { de: "Ich bin … Jahre alt.", id: "Umur saya … tahun.", contoh: "Ich bin 22 Jahre alt." },
      { de: "Ich spreche …", id: "Saya berbicara (bahasa) …", contoh: "Ich spreche Indonesisch und ein bisschen Deutsch." },
      { de: "verheiratet / ledig", id: "menikah / lajang", contoh: "Ich bin ledig." },
      { de: "das Hobby", id: "hobi", contoh: "Mein Hobby ist Fußball." },
      { de: "Freut mich!", id: "Senang berkenalan!", contoh: "Ich bin Sari. – Freut mich!" },
    ],
  },
  {
    id: "arbeit",
    judul: "Dunia Kerja & Ausbildung",
    ikon: "🛠️",
    kata: [
      { de: "die Ausbildung", id: "pendidikan vokasi (Ausbildung)", contoh: "Ich möchte eine Ausbildung in Deutschland machen." },
      { de: "der Beruf", id: "profesi", contoh: "Was sind Sie von Beruf?" },
      { de: "die Pflegekraft", id: "perawat / tenaga perawatan", contoh: "Ich möchte Pflegekraft werden." },
      { de: "arbeiten", id: "bekerja", contoh: "Ich arbeite von Montag bis Freitag." },
      { de: "der Termin", id: "janji temu", contoh: "Ich habe morgen einen Termin." },
      { de: "pünktlich", id: "tepat waktu", contoh: "Bitte seien Sie pünktlich." },
      { de: "der Kollege / die Kollegin", id: "rekan kerja", contoh: "Mein Kollege heißt Jonas." },
      { de: "die Pause", id: "istirahat", contoh: "Die Pause ist um 12 Uhr." },
    ],
  },
  {
    id: "alltag",
    judul: "Kehidupan Sehari-hari",
    ikon: "🏠",
    kata: [
      { de: "die Wohnung", id: "apartemen / tempat tinggal", contoh: "Die Wohnung hat zwei Zimmer." },
      { de: "einkaufen", id: "berbelanja", contoh: "Ich kaufe im Supermarkt ein." },
      { de: "Wie viel kostet das?", id: "Berapa harganya?", contoh: "Wie viel kostet das Brot?" },
      { de: "der Bahnhof", id: "stasiun", contoh: "Wo ist der Bahnhof?" },
      { de: "geöffnet / geschlossen", id: "buka / tutup", contoh: "Am Sonntag ist geschlossen." },
      { de: "der Arzt / die Ärztin", id: "dokter", contoh: "Ich muss zum Arzt." },
      { de: "heute / morgen", id: "hari ini / besok", contoh: "Morgen arbeite ich nicht." },
      { de: "Entschuldigung!", id: "Permisi! / Maaf!", contoh: "Entschuldigung, wo ist die Toilette?" },
    ],
  },
];

export type Question = {
  teks: string; // teks bacaan (Jerman)
  tanya: string; // pertanyaan
  opsi: string[];
  benar: number;
  penjelasan: string; // penjelasan dalam bahasa Indonesia
};

export const lesen: Question[] = [
  {
    teks: "Liebe Frau Weber, ich bin krank und kann heute nicht zur Arbeit kommen. Morgen komme ich wieder. Viele Grüße, Dewi",
    tanya: "Warum kommt Dewi heute nicht?",
    opsi: ["Sie ist krank.", "Sie hat Urlaub.", "Sie hat einen Termin."],
    benar: 0,
    penjelasan: "\"Ich bin krank\" = saya sakit. Karena itu Dewi tidak masuk kerja hari ini.",
  },
  {
    teks: "Praxis Dr. Klein – Sprechzeiten: Mo–Fr 8:00–12:00 Uhr, Mi auch 15:00–18:00 Uhr.",
    tanya: "Wann kann man am Mittwochnachmittag zum Arzt gehen?",
    opsi: ["Gar nicht.", "Von 15 bis 18 Uhr.", "Von 8 bis 12 Uhr."],
    benar: 1,
    penjelasan: "\"Mi auch 15:00–18:00\" artinya hari Rabu (Mittwoch) juga buka pukul 15–18. Nachmittag = sore.",
  },
  {
    teks: "Zimmer frei! 1 Zimmer, 18 m², in Köln, 390 € warm. Ab 1. März. Tel. 0221 456 789",
    tanya: "Was ist richtig?",
    opsi: ["Das Zimmer ist in Berlin.", "Das Zimmer kostet 390 € mit Heizung.", "Das Zimmer ist ab Mai frei."],
    benar: 1,
    penjelasan: "\"warm\" pada iklan sewa berarti harga sudah termasuk pemanas (Heizung). Kotanya Köln, tersedia mulai Maret.",
  },
  {
    teks: "Achtung! Die Kantine ist diese Woche geschlossen. Bitte bringen Sie Ihr Essen mit.",
    tanya: "Was sollen die Mitarbeiter machen?",
    opsi: ["In der Kantine essen.", "Essen von zu Hause mitbringen.", "Nach Hause gehen."],
    benar: 1,
    penjelasan: "Kantin tutup (geschlossen) minggu ini, jadi karyawan diminta membawa makanan sendiri (mitbringen).",
  },
  {
    teks: "Hallo Rizky, wir treffen uns am Samstag um 10 Uhr vor dem Bahnhof. Bitte bring deinen Pass mit! Lena",
    tanya: "Wo treffen sich Rizky und Lena?",
    opsi: ["Im Bahnhof.", "Vor dem Bahnhof.", "Im Büro."],
    benar: 1,
    penjelasan: "\"vor dem Bahnhof\" = di depan stasiun, bukan di dalam (im).",
  },
  {
    teks: "Ausbildung zur Pflegefachkraft: Beginn 1. Oktober. Sie brauchen Deutsch B1 und einen Schulabschluss. Bewerbung per E-Mail.",
    tanya: "Was braucht man für die Ausbildung?",
    opsi: ["Deutsch B1 und einen Schulabschluss.", "Ein Auto.", "Deutsch A1."],
    benar: 0,
    penjelasan: "\"Sie brauchen Deutsch B1 und einen Schulabschluss\" = Anda membutuhkan bahasa Jerman B1 dan ijazah sekolah.",
  },
  {
    teks: "Supermarkt Frischmarkt: Heute alle Äpfel nur 1,49 € pro Kilo!",
    tanya: "Was kostet ein Kilo Äpfel heute?",
    opsi: ["14,90 €", "1,49 €", "4,19 €"],
    benar: 1,
    penjelasan: "\"pro Kilo\" = per kilogram. Harganya 1,49 €.",
  },
  {
    teks: "Liebe Kollegen, unser Teammeeting ist nicht am Dienstag, sondern am Donnerstag um 9 Uhr. Gruß, Markus",
    tanya: "Wann ist das Meeting?",
    opsi: ["Am Dienstag um 9 Uhr.", "Am Donnerstag um 9 Uhr.", "Am Donnerstag um 10 Uhr."],
    benar: 1,
    penjelasan: "\"nicht am Dienstag, sondern am Donnerstag\" = bukan hari Selasa, melainkan hari Kamis.",
  },
  {
    teks: "Bitte hier nicht rauchen!",
    tanya: "Was bedeutet das Schild?",
    opsi: ["Hier darf man rauchen.", "Hier darf man nicht rauchen.", "Hier kann man Zigaretten kaufen."],
    benar: 1,
    penjelasan: "\"nicht rauchen\" = dilarang merokok.",
  },
  {
    teks: "Der Zug nach München fährt heute nicht von Gleis 3, sondern von Gleis 7.",
    tanya: "Von welchem Gleis fährt der Zug?",
    opsi: ["Gleis 3", "Gleis 7", "Gleis 10"],
    benar: 1,
    penjelasan: "Gleis = jalur/peron. Hari ini kereta berangkat dari jalur 7, bukan 3.",
  },
];
