import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = { title: "Xidmətlər - FerdiNet" };

const SERVICES = [
  { t: "Fiber İnternet", d: "GPON texnologiyası ilə ev və ofis üçün yüksək sürətli, limitsiz internet bağlantısı.", f: ["100 Mbit/s - 1000 Mbit/s sürət aralığı","Limitsiz trafik","Pulsuz Wi-Fi modem","Pulsuz quraşdırma"], color: "#3b82f6",
    icon: <><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1"/></> },
  { t: "IPTV / OTT", d: "200+ kanal, HD keyfiyyət və əlavə xidmətlərlə zəngin televiziya paketi.", f: ["200+ canlı kanal","HD/4K keyfiyyət","Geriyə baxış funksiyası","Bütün cihazlarda istifadə"], color: "#ec4899",
    icon: <><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></> },
  { t: "Rəqəmsal Telefon", d: "Aydın səs keyfiyyəti və sərfəli tariflərlə VoIP telefon xidməti.", f: ["Yüksək səs keyfiyyəti","Sərfəli daxili/xarici zəng tarifləri","Çağırışın yönləndirilməsi","Sabit nömrə saxlama imkanı"], color: "#10b981",
    icon: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/> },
];

const CORPORATE = [
  { t: "Korporativ İnternet", d: "Ofisiniz üçün xüsusi SLA ilə yüksək sürətli bağlantı", color: "#f59e0b",
    icon: <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></> },
  { t: "Statik IP", d: "Server və korporativ tətbiqlər üçün statik IP ünvanı", color: "#8b5cf6",
    icon: <><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6v6H9z"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/></> },
  { t: "Şəbəkə Təhlükəsizliyi", d: "Firewall və DDoS qoruma xidmətləri", color: "#14b8a6",
    icon: <path d="M12 2 4 6v6c0 5.5 3.8 8.7 8 10 4.2-1.3 8-4.5 8-10V6l-8-4z"/> },
];

export default function Xidmetler() {
  return (
    <>
      <Header />
      <section className="banner" style={{padding:"50px 0 40px"}}>
        <div className="container">
          <div className="breadcrumb"><Link href="/">Ana Səhifə</Link> › <span>Xidmətlər</span></div>
          <h1>Xidmətlərimiz</h1>
          <p>Sizə tam telekommunikasiya həlləri təqdim edirik</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-3">
            {SERVICES.map((s) => (
              <div className="card" key={s.t}>
                <div className="icon-box" style={{background:s.color+"1a"}}>
                  <svg viewBox="0 0 24 24" fill="none" stroke={s.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
                </div>
                <h3>{s.t}</h3>
                <p style={{color:"var(--text-muted)",fontSize:".92rem",marginBottom:10}}>{s.d}</p>
                <ul style={{display:"flex",flexDirection:"column",gap:8}}>
                  {s.f.map((x) => <li key={x} style={{fontSize:".88rem"}}>✓ {x}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <span className="eyebrow">Əlavə Xidmətlər</span>
          <h2 className="section-title">Korporativ həllər</h2>
          <p className="section-sub">Biznesiniz üçün xüsusi telekommunikasiya paketləri</p>
          <div className="grid-3">
            {CORPORATE.map((c) => (
              <div className="card" key={c.t}>
                <div className="icon-box" style={{background:c.color+"1a"}}>
                  <svg viewBox="0 0 24 24" fill="none" stroke={c.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{c.icon}</svg>
                </div>
                <h3>{c.t}</h3><p style={{color:"var(--text-muted)",fontSize:".92rem"}}>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="cta container">
          <h2>Hansı xidmət sizə uyğundur?</h2>
          <p>Mütəxəssislərimiz sizə ən düzgün seçimi etməkdə kömək edəcək</p>
          <div className="cta-buttons">
            <Link href="/elaqe" className="btn btn-light">Məsləhət Al</Link>
            <Link href="/tariflar" className="btn btn-outline-white">Tarifləri Gör</Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
