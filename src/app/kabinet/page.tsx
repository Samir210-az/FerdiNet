"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

function genCaptcha() {
  const c = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 5 }, () => c[Math.floor(Math.random() * c.length)]).join("");
}

function fmtDate(ts: any) {
  if (!ts) return "—";
  try {
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return d.toLocaleDateString("az-AZ", { day: "2-digit", month: "2-digit", year: "numeric" });
  } catch { return "—"; }
}

export default function Kabinet() {
  const [abonent, setAbonent] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [captcha, setCaptcha] = useState(genCaptcha());
  const [captchaInput, setCaptchaInput] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    if (captchaInput.trim().toUpperCase() !== captcha) {
      setErr("Təhlükəsizlik kodu yanlışdır.");
      setCaptcha(genCaptcha()); setCaptchaInput("");
      return;
    }
    setLoading(true);
    const fakeEmail = abonent.toLowerCase().replace(/[^a-z0-9]/g, "") + "@ferdinet.local";
    try {
      const cred = await signInWithEmailAndPassword(auth, fakeEmail, password);
      const snap = await getDoc(doc(db, "customers", cred.user.uid));
      if (!snap.exists()) {
        setErr("Hesab məlumatları tapılmadı. Dəstək ilə əlaqə saxlayın.");
        await signOut(auth);
      } else {
        setData({ ...snap.data(), abonentKod: abonent });
      }
    } catch (e: any) {
      setErr("Abonent kodu və ya şifrə yanlışdır.");
      setCaptcha(genCaptcha()); setCaptchaInput("");
    }
    setLoading(false);
  }

  async function handleLogout() {
    await signOut(auth);
    setData(null); setAbonent(""); setPassword(""); setCaptchaInput(""); setCaptcha(genCaptcha());
  }

  const balans = data && typeof data.balans === "number" ? data.balans : 0;
  const status = data?.status || "aktiv";
  const isDebt = balans < 0 || status === "borclu";
  const isClosed = status === "bagli";

  return (
    <>
      <Header />
      <section className="section" style={{paddingTop:50}}>
        <div className="container">
          {!data ? (
            <div className="box">
              <h2>Şəxsi Kabinet</h2>
              <p className="sub">Hesabınıza daxil olmaq üçün məlumatlarınızı daxil edin</p>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label>Abonent kodu</label>
                  <input value={abonent} onChange={e => setAbonent(e.target.value)} required placeholder="Abonent kodunuzu daxil edin" />
                </div>
                <div className="form-group">
                  <label>Şifrə</label>
                  <div className="password-field">
                    <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required placeholder="Şifrənizi daxil edin" />
                    <button type="button" className="password-toggle" onClick={() => setShowPass(!showPass)}>{showPass ? "Gizlət" : "Göstər"}</button>
                  </div>
                </div>
                <div className="form-group">
                  <label>Təhlükəsizlik kodu</label>
                  <div className="captcha-row">
                    <div className="captcha-code">{captcha}</div>
                    <button type="button" className="captcha-refresh" onClick={() => { setCaptcha(genCaptcha()); setCaptchaInput(""); }}>↻</button>
                  </div>
                  <input value={captchaInput} onChange={e => setCaptchaInput(e.target.value)} required placeholder="Yuxarıdakı kodu daxil edin" />
                </div>
                {err && <div className="alert alert-err">{err}</div>}
                <button type="submit" className="btn btn-primary" style={{width:"100%",marginTop:6}} disabled={loading}>{loading ? "Daxil olunur..." : "Daxil Ol"}</button>
              </form>
              <div style={{textAlign:"center",marginTop:18,fontSize:".88rem",color:"var(--text-muted)"}}>Hesabınız yoxdur? <a href="/elaqe" style={{color:"var(--primary)",fontWeight:600}}>Qoşulun</a></div>
            </div>
          ) : (
            <div>
              <div style={{textAlign:"center",marginBottom:10}}>
                <h2>Xoş gəlmisiniz{data.ad ? ", " + data.ad : ""}!</h2>
                <p style={{color:"var(--text-muted)"}}>Hesabınızın ümumi məlumatları</p>
              </div>
              <div className="dash-grid">
                <div className="dash-card"><h4>Aktiv Tarif</h4><div className="val">{data.tarif || "—"}</div></div>
                <div className="dash-card"><h4>Hesab Statusu</h4><div className="val" style={{color: isClosed ? "#666" : isDebt ? "#b42318" : "var(--primary)"}}>{isClosed ? "Bağlı" : isDebt ? "Borclu" : "Aktiv"}</div></div>
                <div className="dash-card"><h4>Balans</h4><div className="val" style={{color: balans < 0 ? "#b42318" : "var(--primary)"}}>{balans.toFixed(2)} ₼</div></div>
              </div>
              <div className="dash-grid" style={{marginTop:18}}>
                <div className="dash-card"><h4>Son Ödəniş Tarixi</h4><div className="val" style={{fontSize:"1.2rem"}}>{fmtDate(data.sonOdenisTarixi)}</div></div>
                <div className="dash-card"><h4>Bağlanma Tarixi</h4><div className="val" style={{fontSize:"1.2rem"}}>{fmtDate(data.baglanmaTarixi)}</div></div>
                <div className="dash-card"><h4>Abonent Kodu</h4><div className="val" style={{fontSize:"1.2rem"}}>{data.abonentKod}</div></div>
              </div>
              {isClosed && <div className="alert alert-err" style={{marginTop:20,textAlign:"center",background:"#eee",color:"#555",border:"1px solid #ddd"}}>Xidmətiniz bağlanıb. Yenidən aktivləşdirmək üçün bizimlə əlaqə saxlayın.</div>}
              {!isClosed && isDebt && <div className="alert alert-err" style={{marginTop:20,textAlign:"center"}}>Hesabınızda {Math.abs(balans).toFixed(2)} ₼ borc var. Xidmətin kəsilməməsi üçün ödənişi vaxtında edin.</div>}
              <div style={{textAlign:"center",marginTop:30}}>
                <button className="btn btn-outline" onClick={handleLogout}>Çıxış Et</button>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
