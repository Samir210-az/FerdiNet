import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { PLANS } from "@/lib/plans";

export default function Home() {
  return (
    <>
      <Header />
      <section className="banner">
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
              ["Yüksək Sürət","GPON fiber optik ilə 1 Gbit/s-ə qədər sürət"],
              ["Limitsiz Trafik","Bütün tariflərdə limitsiz internet"],
              ["Pulsuz Quraşdırma","Mütəxəssis komandamız tərəfindən"],
              ["24/7 Dəstək","İstənilən vaxt yardıma hazır komanda"],
              ["Sərfəli Qiymət","Ən yaxşı qiymət-keyfiyyət nisbəti"],
              ["Stabil Bağlantı","99.9% şəbəkə stabilliyi"],
            ].map(([t,d]) => (
              <div className="card" key={t}>
                <div className="icon-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2 2 7v10l10 5 10-5V7z"/></svg></div>
                <h3>{t}</h3><p style={{color:"var(--text-muted)",fontSize:".92rem"}}>{d}</p>
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
