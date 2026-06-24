"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import BannerDecor from "@/components/BannerDecor";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ElaqeClient() {
  const [form, setForm] = useState({ ad: "", telefon: "", email: "", movzu: "Tarif haqqında sual", mesaj: "" });
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  function upd(k: string, v: string) { setForm({ ...form, [k]: v }); }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(""); setOk(false); setLoading(true);
    try {
      await addDoc(collection(db, "mesajlar"), { ...form, tarix: serverTimestamp(), oxunub: false });
      setOk(true);
      setForm({ ad: "", telefon: "", email: "", movzu: "Tarif haqqında sual", mesaj: "" });
    } catch (e: any) {
      setErr("Mesaj göndərilmədi. Bir az sonra yenidən cəhd edin.");
    }
    setLoading(false);
  }

  return (
    <>
      <Header />
      <section className="banner" style={{padding:"50px 0 40px"}}>
        <BannerDecor compact />
        <div className="container">
          <div className="breadcrumb"><Link href="/">Ana Səhifə</Link> › <span>Əlaqə</span></div>
          <h1>Bizimlə Əlaqə</h1>
          <p>Suallarınız var? Komandamız sizə kömək etməyə hazırdır</p>
        </div>
      </section>
      <section className="section">
        <div className="container contact-wrap" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:40}}>
          <div className="admin-card">
            <h3 style={{marginBottom:18}}>Əlaqə Məlumatları</h3>
            <p style={{marginBottom:12}}><strong>Telefon:</strong> </p>
            <p style={{marginBottom:12}}><strong>Email:</strong> </p>
            <p style={{marginBottom:12}}><strong>Ünvan:</strong> </p>
            <p style={{marginBottom:18}}><strong>İş saatları:</strong> 7/24 Dəstək Xətti</p>
            <div className="social-links" style={{marginTop:10}}>
              <a href="https://instagram.com/s_akhundoff" target="_blank" rel="noopener" style={{background:"var(--primary-light)"}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#2e9e4d" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>
              </a>
            </div>
          </div>
          <form className="admin-card" onSubmit={submit}>
            <h3 style={{marginBottom:4}}>Mesaj Göndərin</h3>
            <p style={{color:"var(--text-muted)",fontSize:".9rem",marginBottom:14}}>Formu doldurun, ən qısa zamanda sizinlə əlaqə saxlayacağıq</p>
            <div className="form-group"><label>Ad Soyad</label><input value={form.ad} onChange={e=>upd("ad",e.target.value)} required placeholder="Adınız" /></div>
            <div className="form-group"><label>Telefon</label><input value={form.telefon} onChange={e=>upd("telefon",e.target.value)} required placeholder="+994 XX XXX XX XX" /></div>
            <div className="form-group"><label>Email</label><input type="email" value={form.email} onChange={e=>upd("email",e.target.value)} required placeholder="email@example.com" /></div>
            <div className="form-group"><label>Mövzu</label>
              <select value={form.movzu} onChange={e=>upd("movzu",e.target.value)}>
                <option>Tarif haqqında sual</option><option>Texniki dəstək</option><option>Korporativ təklif</option><option>Digər</option>
              </select>
            </div>
            <div className="form-group"><label>Mesajınız</label><textarea rows={4} value={form.mesaj} onChange={e=>upd("mesaj",e.target.value)} required placeholder="Mesajınızı yazın..." /></div>
            {ok && <div className="alert alert-ok">✓ Mesajınız uğurla göndərildi! Tezliklə sizinlə əlaqə saxlayacağıq.</div>}
            {err && <div className="alert alert-err">{err}</div>}
            <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? "Göndərilir..." : "Mesajı Göndər"}</button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}
