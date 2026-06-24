"use client";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, query, orderBy, limit, Timestamp } from "firebase/firestore";
import { auth, db, getSecondaryAuthInstance } from "@/lib/firebase";

const TARIFLER = ["START", "BASIC", "STANDART", "PREMIUM", "ULTRA", "MAX"];

function toInputDate(ts: any) {
  try { if (ts && ts.toDate) return ts.toDate().toISOString().slice(0, 10); } catch {}
  return "";
}
function waLink(phone: string) {
  const clean = (phone || "").replace(/[^0-9]/g, "");
  return clean ? "https://wa.me/" + clean : "";
}

export default function AdminClient() {
  const [logged, setLogged] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("customers");
  const [customers, setCustomers] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setErr(""); setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
      const adminDoc = await getDoc(doc(db, "admins", cred.user.uid));
      if (!adminDoc.exists()) {
        setErr("Bu hesabın admin icazəsi yoxdur.");
        await signOut(auth);
      } else {
        setLogged(true);
        loadAll();
      }
    } catch (e: any) {
      setErr("Xəta: " + (e.code || "") + " — " + (e.message || "Email və ya şifrə yanlışdır."));
    }
    setLoading(false);
  }

  async function logout() {
    await signOut(auth);
    setLogged(false); setEmail(""); setPassword("");
  }

  async function loadAll() {
    setLoadingData(true);
    try {
      const cSnap = await getDocs(collection(db, "customers"));
      setCustomers(cSnap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) { console.error(e); }
    try {
      const mSnap = await getDocs(query(collection(db, "mesajlar"), orderBy("tarix", "desc"), limit(100)));
      setMessages(mSnap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) { console.error(e); }
    setLoadingData(false);
  }

  if (!logged) {
    return (
      <div className="container" style={{paddingTop:60,paddingBottom:60}}>
        <div className="box">
          <h2>Admin Panel</h2>
          <p className="sub">FerdiNet idarəetmə paneli — yalnız səlahiyyətli istifadəçilər üçün</p>
          <form onSubmit={login}>
            <div className="form-group"><label>Email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="admin@ferdinet.az" /></div>
            <div className="form-group"><label>Şifrə</label>
              <div className="password-field">
                <input type={showPass ? "text" : "password"} value={password} onChange={e=>setPassword(e.target.value)} required placeholder="Şifrəniz" />
                <button type="button" className="password-toggle" onClick={()=>setShowPass(!showPass)}>{showPass ? "Gizlət" : "Göstər"}</button>
              </div>
            </div>
            {err && <div className="alert alert-err">{err}</div>}
            <button type="submit" className="btn btn-primary" style={{width:"100%",marginTop:6}} disabled={loading}>{loading ? "Yoxlanılır..." : "Daxil Ol"}</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{paddingTop:40,paddingBottom:60}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24,flexWrap:"wrap",gap:10}}>
        <h2 style={{margin:0}}>İdarəetmə Paneli</h2>
        <button className="btn btn-outline btn-sm" onClick={logout}>Çıxış Et</button>
      </div>
      <div className="admin-tabs">
        <div className={"admin-tab" + (tab==="customers"?" active":"")} onClick={()=>setTab("customers")}>Müştərilər</div>
        <div className={"admin-tab" + (tab==="messages"?" active":"")} onClick={()=>setTab("messages")}>Mesajlar {messages.filter(m=>!m.oxunub).length > 0 && "("+messages.filter(m=>!m.oxunub).length+")"}</div>
      </div>

      {tab === "customers" && <CustomersTab customers={customers} reload={loadAll} loading={loadingData} />}
      {tab === "messages" && <MessagesTab messages={messages} reload={loadAll} loading={loadingData} />}
    </div>
  );
}

function CustomersTab({ customers, reload, loading }: any) {
  const [nc, setNc] = useState({ abonentKod:"", password:"", ad:"", telefon:"", email:"", tarif:"PREMIUM", status:"aktiv", balans:"0", sonOdenis:"", baglanma:"" });
  const [addErr, setAddErr] = useState(""); const [addOk, setAddOk] = useState(false); const [adding, setAdding] = useState(false);

  function u(k:string,v:string){
    if (k === "telefon") {
      const digits = v.replace(/[^0-9]/g, "");
      setNc({ ...nc, telefon: v, abonentKod: digits });
    } else {
      setNc({...nc,[k]:v});
    }
  }

  async function addCustomer(e: React.FormEvent) {
    e.preventDefault(); setAddErr(""); setAddOk(false); setAdding(true);
    const fakeEmail = nc.abonentKod.toLowerCase().replace(/[^a-z0-9]/g,"") + "@ferdinet.local";
    try {
      const secAuth = getSecondaryAuthInstance();
      const cred = await createUserWithEmailAndPassword(secAuth, fakeEmail, nc.password);
      await setDoc(doc(db, "customers", cred.user.uid), {
        abonentKod: nc.abonentKod, ad: nc.ad, telefon: nc.telefon, email: nc.email,
        tarif: nc.tarif, status: nc.status, balans: parseFloat(nc.balans) || 0,
        sonOdenisTarixi: nc.sonOdenis ? Timestamp.fromDate(new Date(nc.sonOdenis)) : null,
        baglanmaTarixi: nc.baglanma ? Timestamp.fromDate(new Date(nc.baglanma)) : null,
      });
      await signOut(secAuth);
      setAddOk(true);
      setNc({ abonentKod:"", password:"", ad:"", telefon:"", email:"", tarif:"PREMIUM", status:"aktiv", balans:"0", sonOdenis:"", baglanma:"" });
      reload();
    } catch (e: any) {
      setAddErr("Xəta: " + (e.code||"") + " — " + (e.message||"Müştəri əlavə edilmədi."));
    }
    setAdding(false);
  }

  return (
    <>
      <div className="admin-card">
        <h3>Yeni Müştəri Əlavə Et</h3>
        <form onSubmit={addCustomer} className="add-grid">
          <div className="form-group" style={{margin:0}}><label>Telefon</label><input value={nc.telefon} onChange={e=>u("telefon",e.target.value)} required placeholder="+994 XX XXX XX XX" /></div>
          <div className="form-group" style={{margin:0}}>
            <label>Abonent Kodu <span style={{color:"var(--text-muted)",fontWeight:400,fontSize:".78rem"}}>(avtomatik, telefondan)</span></label>
            <input value={nc.abonentKod} readOnly required placeholder="Əvvəlcə telefonu yazın" style={{background:"#eef3ee",color:"var(--text-muted)"}} />
          </div>
          <div className="form-group" style={{margin:0}}><label>Şifrə</label><input value={nc.password} onChange={e=>u("password",e.target.value)} required placeholder="Müştəri şifrəsi" /></div>
          <div className="form-group" style={{margin:0}}><label>Ad Soyad</label><input value={nc.ad} onChange={e=>u("ad",e.target.value)} required placeholder="Ad Soyad" /></div>
          <div className="form-group" style={{margin:0}}><label>Email (bildiriş)</label><input type="email" value={nc.email} onChange={e=>u("email",e.target.value)} placeholder="musteri@mail.com" /></div>
          <div className="form-group" style={{margin:0}}><label>Tarif</label><select value={nc.tarif} onChange={e=>u("tarif",e.target.value)}>{TARIFLER.map(t=><option key={t}>{t}</option>)}</select></div>
          <div className="form-group" style={{margin:0}}><label>Status</label><select value={nc.status} onChange={e=>u("status",e.target.value)}><option value="aktiv">Aktiv</option><option value="borclu">Borclu</option><option value="bagli">Bağlı</option></select></div>
          <div className="form-group" style={{margin:0}}><label>Balans (₼)</label><input type="number" step="0.01" value={nc.balans} onChange={e=>u("balans",e.target.value)} /></div>
          <div className="form-group" style={{margin:0}}><label>Son Ödəniş</label><input type="date" value={nc.sonOdenis} onChange={e=>u("sonOdenis",e.target.value)} /></div>
          <div className="form-group" style={{margin:0}}><label>Bağlanma Tarixi</label><input type="date" value={nc.baglanma} onChange={e=>u("baglanma",e.target.value)} /></div>
          <div style={{gridColumn:"1/-1"}}>
            {addErr && <div className="alert alert-err">{addErr}</div>}
            {addOk && <div className="alert alert-ok">✓ Müştəri uğurla əlavə olundu.</div>}
            <button type="submit" className="btn btn-primary" disabled={adding}>{adding ? "Əlavə edilir..." : "Müştəri Əlavə Et"}</button>
          </div>
        </form>
      </div>

      <div className="admin-card">
        <h3>Bütün Müştərilər ({customers.length})</h3>
        {loading ? <p>Yüklənir...</p> : customers.length === 0 ? <p style={{color:"var(--text-muted)"}}>Hələ müştəri yoxdur.</p> : (
          <div className="table-wrap">
            <table className="data-table">
              <thead><tr><th>Abonent</th><th>Ad</th><th>Telefon</th><th>Email</th><th>Tarif</th><th>Status</th><th>Balans</th><th>Son Ödəniş</th><th>Bağlanma</th><th></th></tr></thead>
              <tbody>{customers.map((c:any) => <CustomerRow key={c.id} c={c} reload={reload} />)}</tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

function CustomerRow({ c, reload }: any) {
  const [row, setRow] = useState({
    ad: c.ad||"", telefon: c.telefon||"", email: c.email||"", tarif: c.tarif||"PREMIUM",
    status: c.status||"aktiv", balans: typeof c.balans==="number"?String(c.balans):"0",
    sonOdenis: toInputDate(c.sonOdenisTarixi), baglanma: toInputDate(c.baglanmaTarixi),
  });
  const [saving, setSaving] = useState(""); 
  function u(k:string,v:string){ setRow({...row,[k]:v}); }

  async function save() {
    setSaving("...");
    try {
      await updateDoc(doc(db,"customers",c.id), {
        ad: row.ad, telefon: row.telefon, email: row.email, tarif: row.tarif, status: row.status,
        balans: parseFloat(row.balans)||0,
        sonOdenisTarixi: row.sonOdenis ? Timestamp.fromDate(new Date(row.sonOdenis)) : null,
        baglanmaTarixi: row.baglanma ? Timestamp.fromDate(new Date(row.baglanma)) : null,
      });
      setSaving("✓"); setTimeout(()=>setSaving(""),1500);
    } catch(e:any){ setSaving("Xəta!"); alert(e.message); setTimeout(()=>setSaving(""),1500); }
  }

  const wa = waLink(row.telefon);
  return (
    <tr>
      <td>{c.abonentKod}</td>
      <td><input value={row.ad} onChange={e=>u("ad",e.target.value)} /></td>
      <td style={{display:"flex",gap:4,alignItems:"center"}}>
        <input value={row.telefon} onChange={e=>u("telefon",e.target.value)} />
        {wa && <a href={wa} target="_blank" rel="noopener" title="WhatsApp" style={{fontSize:"1.1rem"}}>💬</a>}
      </td>
      <td><input type="email" value={row.email} onChange={e=>u("email",e.target.value)} /></td>
      <td><select value={row.tarif} onChange={e=>u("tarif",e.target.value)}>{TARIFLER.map(t=><option key={t}>{t}</option>)}</select></td>
      <td><select value={row.status} onChange={e=>u("status",e.target.value)}><option value="aktiv">Aktiv</option><option value="borclu">Borclu</option><option value="bagli">Bağlı</option></select></td>
      <td><input type="number" step="0.01" value={row.balans} onChange={e=>u("balans",e.target.value)} style={{width:90}} /></td>
      <td><input type="date" value={row.sonOdenis} onChange={e=>u("sonOdenis",e.target.value)} /></td>
      <td><input type="date" value={row.baglanma} onChange={e=>u("baglanma",e.target.value)} /></td>
      <td><button className="btn btn-primary btn-sm" onClick={save}>{saving || "Saxla"}</button></td>
    </tr>
  );
}

function MessagesTab({ messages, reload, loading }: any) {
  async function toggleRead(m:any){ await updateDoc(doc(db,"mesajlar",m.id),{oxunub:!m.oxunub}); reload(); }
  async function del(m:any){ if(!confirm("Bu mesajı silmək istədiyinizə əminsiniz?"))return; await deleteDoc(doc(db,"mesajlar",m.id)); reload(); }

  return (
    <div className="admin-card">
      <h3>Müştəri Mesajları ({messages.length})</h3>
      {loading ? <p>Yüklənir...</p> : messages.length === 0 ? <p style={{color:"var(--text-muted)"}}>Hələ mesaj yoxdur.</p> : (
        messages.map((m:any) => {
          const date = m.tarix && m.tarix.toDate ? m.tarix.toDate().toLocaleString("az-AZ") : "";
          const wa = waLink(m.telefon);
          return (
            <div key={m.id} className={"msg-card" + (m.oxunub ? " read" : "")}>
              <div className="msg-head"><strong>{m.ad || "Naməlum"} — {m.movzu || ""}</strong><span style={{fontSize:".78rem",color:"var(--text-muted)"}}>{date}</span></div>
              <div style={{fontSize:".88rem",color:"var(--text-muted)",marginBottom:6}}>📞 {m.telefon || "—"} &nbsp;|&nbsp; ✉️ {m.email || "—"}</div>
              <div style={{fontSize:".92rem"}}>{m.mesaj}</div>
              <div className="msg-actions">
                {wa && <a href={wa} target="_blank" rel="noopener" className="btn btn-primary btn-sm">💬 WhatsApp Cavab</a>}
                <button className="btn btn-outline btn-sm" onClick={()=>toggleRead(m)}>{m.oxunub ? "Oxunmamış et" : "Oxundu kimi işarələ"}</button>
                <button className="btn btn-outline btn-sm" onClick={()=>del(m)} style={{borderColor:"#b42318",color:"#b42318"}}>Sil</button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
