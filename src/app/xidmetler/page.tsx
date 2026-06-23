import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = { title: "Xidmətlər - FerdiNet" };

const SERVICES = [
  ["Fiber İnternet", "GPON texnologiyası ilə ev və ofis üçün yüksək sürətli, limitsiz internet bağlantısı.", ["100 Mbit/s - 1000 Mbit/s sürət aralığı","Limitsiz trafik","Pulsuz Wi-Fi modem","Pulsuz quraşdırma"]],
  ["IPTV / OTT", "200+ kanal, HD keyfiyyət və əlavə xidmətlərlə zəngin televiziya paketi.", ["200+ canlı kanal","HD/4K keyfiyyət","Geriyə baxış funksiyası","Bütün cihazlarda istifadə"]],
  ["Rəqəmsal Telefon", "Aydın səs keyfiyyəti və sərfəli tariflərlə VoIP telefon xidməti.", ["Yüksək səs keyfiyyəti","Sərfəli daxili/xarici zəng tarifləri","Çağırışın yönləndirilməsi","Sabit nömrə saxlama imkanı"]],
];

const CORPORATE = [
  ["Korporativ İnternet", "Ofisiniz üçün xüsusi SLA ilə yüksək sürətli bağlantı"],
  ["Statik IP", "Server və korporativ tətbiqlər üçün statik IP ünvanı"],
  ["Şəbəkə Təhlükəsizliyi", "Firewall və DDoS qoruma xidmətləri"],
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
            {SERVICES.map(([title, desc, features]) => (
              <div className="card" key={title as string}>
                <div className="icon-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><circle cx="12" cy="20" r="1"/></svg></div>
                <h3>{title}</h3>
                <p style={{color:"var(--text-muted)",fontSize:".92rem",marginBottom:10}}>{desc}</p>
                <ul style={{display:"flex",flexDirection:"column",gap:8}}>
                  {(features as string[]).map((f) => <li key={f} style={{fontSize:".88rem"}}>✓ {f}</li>)}
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
            {CORPORATE.map(([t,d]) => (
              <div className="card" key={t}>
                <div className="icon-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg></div>
                <h3>{t}</h3><p style={{color:"var(--text-muted)",fontSize:".92rem"}}>{d}</p>
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
