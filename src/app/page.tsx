import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { PLANS } from "@/lib/plans";
import ParallaxBlob from "@/components/Parallax";

export default function Home() {
  return (
    <>
      <Header />
      <section className="banner">
        <ParallaxBlob speed={0.25} style={{width:480,height:480,borderRadius:"50%",background:"rgba(255,255,255,.08)",top:-180,right:-120}} />
        <ParallaxBlob speed={-0.15} style={{width:260,height:260,borderRadius:"50%",background:"rgba(255,255,255,.07)",bottom:-120,left:-80}} />
        <div className="container">
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(255,255,255,.15)",padding:"6px 16px",borderRadius:50,fontSize:".85rem",marginBottom:18,position:"relative",zIndex:2}}>⚡ GPON Fiber Optik Texnologiya</div>
          <h1>Evinizə ən sürətli fiber internet indi gəlir</h1>
          <p>FerdiNet ilə kəsilməz, sabit və ultra sürətli internet həzzini yaşayın. Limitsiz tariflər, 24/7 dəstək və pulsuz quraşdırma.</p>
          <div className="banner-buttons">
            <Link href="/tariflar" className="btn btn-light">Tarifləri Gör</Link>
            <Link href="/elaqe" className="btn btn-outline-white">Bizimlə Əlaqə</Link>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="stats">
          <div className="stat"><div className="stat-num">1000+</div><div className="stat-label">Məmnun Müştəri</div></div>
          <div className="stat"><div className="stat-num">99.9%</div><div className="stat-label">Əlaqə Stabilliyi</div></div>
          <div className="stat"><div className="stat-num">24/7</div><div className="stat-label">Texniki Dəstək</div></div>
          <div className="stat"><div className="stat-num">1000</div><div className="stat-label">Mbit/s Maks. sürət</div></div>
          <div className="stat"><div className="stat-num">Limitsiz</div><div className="stat-label">Təhlükəsiz</div></div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <span className="eyebrow">Niyə Biz?</span>
          <h2 className="section-title">FerdiNet-in üstünlükləri</h2>
          <p className="section-sub">Müştərilərimizin etibarını qazanmağımızın səbəbləri</p>
          <div className="grid-3">
            {[
              {
                t: "Yüksək Sürət", d: "GPON fiber optik ilə 1 Gbit/s-ə qədər sürət", color: "#f59e0b",
                icon: <path d="M13 2 3 14h7l-1 8 10-12h-7z" />,
              },
              {
                t: "Limitsiz Trafik", d: "Bütün tariflərdə limitsiz internet", color: "#3b82f6",
                icon: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>,
              },
              {
                t: "Pulsuz Quraşdırma", d: "Mütəxəssis komandamız tərəfindən", color: "#10b981",
                icon: <><path d="m9 11 3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></>,
              },
              {
                t: "24/7 Dəstək", d: "İstənilən vaxt yardıma hazır komanda", color: "#8b5cf6",
                icon: <><path d="M3 11a9 9 0 0 1 18 0v6a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" /><path d="M3 11v3a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3" /></>,
              },
              {
                t: "Sərfəli Qiymət", d: "Ən yaxşı qiymət-keyfiyyət nisbəti", color: "#ec4899",
                icon: <><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></>,
              },
              {
                t: "Stabil Bağlantı", d: "99.9% şəbəkə stabilliyi", color: "#14b8a6",
                icon: <><path d="M2 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><circle cx="12" cy="20" r="1" /></>,
              },
            ].map((f) => (
              <div className="card feature-card-hover" key={f.t}>
                <div className="icon-box" style={{background: f.color + "1a"}}>
                  <svg viewBox="0 0 24 24" fill="none" stroke={f.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{f.icon}</svg>
                </div>
                <h3>{f.t}</h3><p style={{color:"var(--text-muted)",fontSize:".92rem"}}>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <span className="eyebrow">Tariflər</span>
          <h2 className="section-title">Sizə uyğun tarifi seçin</h2>
          <p className="section-sub">Bütün tariflərimiz limitsiz trafik ilə təqdim olunur</p>
          <div className="plans-grid">
            {PLANS.map((p) => (
              <div className={"plan-card" + (p.popular ? " popular" : "")} key={p.name}>
                {p.popular && <div className="badge-popular">⭐ Ən Populyar</div>}
                <div className="plan-name">{p.name}</div>
                <div className="plan-speed">{p.speed}<span>Mbit/s</span></div>
                <div className="plan-price">{p.price} ₼<span>/ay</span></div>
                <ul className="plan-features"><li>✓ Limitsiz İnternet</li><li>✓ Pulsuz Quraşdırma</li><li>✓ Wi-Fi Modem Daxil</li><li>✓ 24/7 Dəstək</li></ul>
                <Link href="/elaqe" className="btn btn-primary">Seç</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="cta container">
          <h2>Qoşulma PULSUZ</h2>
          <p>Yeni müştərilərimizə xüsusi kampaniya — qoşulma tamamilə pulsuz</p>
          <div className="cta-buttons">
            <Link href="/elaqe" className="btn btn-light">İndi Qoşul</Link>
            <Link href="/tariflar" className="btn btn-outline-white">Tarifləri Gör</Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
