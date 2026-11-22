import { useEffect, useState } from "react";
import { lesen, topics, type Question, type Topic } from "./data";

type View = { name: "home" } | { name: "kartu"; topic: Topic } | { name: "lesen"; ujian: boolean };

function speak(text: string) {
  if (!("speechSynthesis" in window)) return;
  const u = new SpeechSynthesisUtterance(text.replace("…", ""));
  u.lang = "de-DE";
  u.rate = 0.85;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}

export default function App() {
  const [view, setView] = useState<View>({ name: "home" });
  const home = () => setView({ name: "home" });
  return (
    <div className="wrap">
      <header>
        <button className="logo" onClick={home}>🇩🇪 Siap Jerman A1</button>
      </header>
      {view.name === "home" && <Home go={setView} />}
      {view.name === "kartu" && <Kartu topic={view.topic} back={home} />}
      {view.name === "lesen" && <Lesen ujian={view.ujian} back={home} />}
      <footer>Persiapan ujian bahasa Jerman level A1 (Goethe-Zertifikat A1). Aplikasi independen, tidak berafiliasi dengan Goethe-Institut.</footer>
    </div>
  );
}

function Home({ go }: { go: (v: View) => void }) {
  return (
    <main>
      <section className="hero">
        <h1>Siap Ausbildung <span>ke Jerman</span> 🇩🇪</h1>
        <p>Belajar bahasa Jerman A1 dengan penjelasan bahasa Indonesia. Latihan kosakata, membaca, dan simulasi ujian.</p>
      </section>
      <h2>📚 Kosakata (Kartu Hafalan)</h2>
      <div className="grid">
        {topics.map((t) => (
          <button key={t.id} className="card" onClick={() => go({ name: "kartu", topic: t })}>
            <span className="ikon">{t.ikon}</span>
            <b>{t.judul}</b>
            <small>{t.kata.length} kata & frasa</small>
          </button>
        ))}
      </div>
      <h2>📖 Latihan Ujian</h2>
      <div className="grid">
        <button className="card" onClick={() => go({ name: "lesen", ujian: false })}>
          <span className="ikon">📝</span>
          <b>Latihan Lesen</b>
          <small>Langsung lihat jawaban & penjelasan</small>
        </button>
        <button className="card accent" onClick={() => go({ name: "lesen", ujian: true })}>
          <span className="ikon">⏱️</span>
          <b>Simulasi Ujian Lesen</b>
          <small>10 soal · 10 menit · skor di akhir</small>
        </button>
        <div className="card locked">
          <span className="ikon">🔒</span>
          <b>Hören, Schreiben, Sprechen</b>
          <small>Segera hadir (Premium)</small>
        </div>
      </div>
    </main>
  );
}

function Kartu({ topic, back }: { topic: Topic; back: () => void }) {
  const [i, setI] = useState(0);
  const [buka, setBuka] = useState(false);
  const w = topic.kata[i];
  const next = (d: number) => {
    setBuka(false);
    setI((i + d + topic.kata.length) % topic.kata.length);
  };
  return (
    <main>
      <button className="back" onClick={back}>← Kembali</button>
      <h2>{topic.ikon} {topic.judul}</h2>
      <p className="muted">Kartu {i + 1} dari {topic.kata.length} · ketuk kartu untuk melihat arti</p>
      <div className="flash" onClick={() => setBuka(!buka)}>
        <div className="de">{w.de}</div>
        {buka ? (
          <>
            <div className="id">{w.id}</div>
            <div className="contoh">Contoh: <i>{w.contoh}</i></div>
          </>
        ) : (
          <div className="muted">Apa artinya?</div>
        )}
      </div>
      <div className="row">
        <button onClick={() => next(-1)}>◀ Sebelumnya</button>
        <button onClick={() => speak(buka ? w.contoh : w.de)}>🔊 Dengar</button>
        <button onClick={() => next(1)}>Berikutnya ▶</button>
      </div>
    </main>
  );
}

function Lesen({ ujian, back }: { ujian: boolean; back: () => void }) {
  const soal: Question[] = lesen;
  const [i, setI] = useState(0);
  const [jawab, setJawab] = useState<(number | null)[]>(soal.map(() => null));
  const [selesai, setSelesai] = useState(false);
  const [sisa, setSisa] = useState(600);

  useEffect(() => {
    if (!ujian || selesai) return;
    const t = setInterval(() => setSisa((s) => (s <= 1 ? (setSelesai(true), 0) : s - 1)), 1000);
    return () => clearInterval(t);
  }, [ujian, selesai]);

  const skor = jawab.filter((j, k) => j === soal[k].benar).length;

  if (selesai) {
    const persen = Math.round((skor / soal.length) * 100);
    return (
      <main>
        <button className="back" onClick={back}>← Kembali</button>
        <div className="hasil">
          <h2>Hasil: {skor}/{soal.length} ({persen}%)</h2>
          <p>{persen >= 60 ? "🎉 Lulus! (batas lulus ujian A1 adalah 60%)" : "💪 Belum lulus. Batas lulus 60%, ayo latihan lagi!"}</p>
        </div>
        {soal.map((q, k) => (
          <div key={k} className={"review " + (jawab[k] === q.benar ? "ok" : "salah")}>
            <b>{k + 1}. {q.tanya}</b>
            <div>Jawabanmu: {jawab[k] === null ? "—" : q.opsi[jawab[k]!]} {jawab[k] === q.benar ? "✅" : "❌"}</div>
            {jawab[k] !== q.benar && <div>Benar: {q.opsi[q.benar]}</div>}
            <div className="muted">💡 {q.penjelasan}</div>
          </div>
        ))}
      </main>
    );
  }

  const q = soal[i];
  const dipilih = jawab[i];
  const tampilJawaban = !ujian && dipilih !== null;
  const pilih = (o: number) => {
    if (tampilJawaban) return;
    const n = [...jawab];
    n[i] = o;
    setJawab(n);
  };

  return (
    <main>
      <button className="back" onClick={back}>← Kembali</button>
      <div className="row between">
        <span className="muted">Soal {i + 1} / {soal.length}</span>
        {ujian && <span className="timer">⏱️ {Math.floor(sisa / 60)}:{String(sisa % 60).padStart(2, "0")}</span>}
      </div>
      <div className="teks">{q.teks}</div>
      <p><b>{q.tanya}</b></p>
      {q.opsi.map((o, k) => {
        let cls = "opsi";
        if (dipilih === k) cls += " pilih";
        if (tampilJawaban && k === q.benar) cls += " benar";
        if (tampilJawaban && dipilih === k && k !== q.benar) cls += " keliru";
        return (
          <button key={k} className={cls} onClick={() => pilih(k)}>
            {"abc"[k]}) {o}
          </button>
        );
      })}
      {tampilJawaban && <div className="jelas">💡 {q.penjelasan}</div>}
      <div className="row">
        <button disabled={i === 0} onClick={() => setI(i - 1)}>◀</button>
        {i < soal.length - 1 ? (
          <button onClick={() => setI(i + 1)}>Berikutnya ▶</button>
        ) : (
          <button className="primary" onClick={() => setSelesai(true)}>Selesai & Lihat Skor</button>
        )}
      </div>
    </main>
  );
}
