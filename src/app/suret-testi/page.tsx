"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function SuretTesti() {
  const [speed, setSpeed] = useState(0);
  const [phase, setPhase] = useState("Hazır");
  const [ping, setPing] = useState("—");
  const [down, setDown] = useState("—");
  const [up, setUp] = useState("—");
  const [running, setRunning] = useState(false);

  async function measurePing() {
    const s: number[] = [];
    for (let i = 0; i < 5; i++) {
      const t0 = performance.now();
      try { await fetch("https://speed.cloudflare.com/__down?bytes=0&cb=" + Math.random(), { cache: "no-store" }); s.push(performance.now() - t0); } catch {}
    }
    return s.length ? Math.min(...s) : null;
  }
  async function measureDown() {
    let last = 0;
    for (const size of [1e6, 5e6, 1e7, 1.5e7]) {
      const t0 = performance.now();
      try {
        const r = await fetch("https://speed.cloudflare.com/__down?bytes=" + size + "&cb=" + Math.random(), { cache: "no-store" });
        const b = await r.arrayBuffer();
        last = (b.byteLength * 8 / ((performance.now() - t0) / 1000)) / 1e6;
        setSpeed(Math.round(last));
      } catch { break; }
    }
    return last;
  }
  async function measureUp() {
    let last = 0;
    for (const size of [1e6, 3e6, 5e6]) {
      const data = new Uint8Array(size);
      const t0 = performance.now();
      try {
        await fetch("https://speed.cloudflare.com/__up", { method: "POST", body: data, cache: "no-store" });
        last = (size * 8 / ((performance.now() - t0) / 1000)) / 1e6;
        setSpeed(Math.round(last));
      } catch { break; }
    }
    return last;
  }

  async function start() {
    setRunning(true); setPing("—"); setDown("—"); setUp("—"); setSpeed(0);
    setPhase("Ping ölçülür...");
    const p = await measurePing(); setPing(p ? Math.round(p) + " ms" : "Xəta");
    setPhase("Endirmə sürəti...");
    const d = await measureDown(); setDown(d ? d.toFixed(1) + " Mbit/s" : "Xəta"); if (d) setSpeed(Math.round(d));
    setPhase("Yükləmə sürəti...");
    const u = await measureUp(); setUp(u ? u.toFixed(1) + " Mbit/s" : "Xəta"); if (u) setSpeed(Math.round(u));
    setPhase("Test tamamlandı"); setRunning(false);
  }

  return (
    <>
      <Header />
      <section className="section" style={{paddingTop:50}}>
        <div className="container">
          <div className="box" style={{maxWidth:560,textAlign:"center"}}>
            <h2 style={{marginBottom:6}}>Sürət Testi</h2>
            <p style={{color:"var(--text-muted)",marginBottom:30}}>Real internet sürətinizi ölçmək üçün düyməyə basın</p>
            <div style={{width:200,height:200,borderRadius:"50%",background:"var(--primary-light)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",margin:"0 auto 26px",boxShadow:"inset 0 0 0 10px #fff"}}>
              <div style={{fontSize:"2.4rem",fontWeight:800,color:"var(--primary)"}}>{speed}</div>
              <div style={{fontSize:".9rem",color:"var(--text-muted)"}}>Mbit/s</div>
              <div style={{fontSize:".78rem",color:"var(--text-muted)",marginTop:6}}>{phase}</div>
            </div>
            <button className="btn btn-primary" onClick={start} disabled={running}>{running ? "Test edilir..." : "Testi Başlat"}</button>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginTop:24}}>
              <div style={{background:"var(--bg-page)",borderRadius:12,padding:14}}><div style={{fontSize:".78rem",color:"var(--text-muted)"}}>Ping</div><div style={{fontWeight:700}}>{ping}</div></div>
              <div style={{background:"var(--bg-page)",borderRadius:12,padding:14}}><div style={{fontSize:".78rem",color:"var(--text-muted)"}}>Endirmə</div><div style={{fontWeight:700,fontSize:".95rem"}}>{down}</div></div>
              <div style={{background:"var(--bg-page)",borderRadius:12,padding:14}}><div style={{fontSize:".78rem",color:"var(--text-muted)"}}>Yükləmə</div><div style={{fontWeight:700,fontSize:".95rem"}}>{up}</div></div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
