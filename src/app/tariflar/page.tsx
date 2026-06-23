import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import BannerDecor from "@/components/BannerDecor";
import { PLANS } from "@/lib/plans";

export const metadata = { title: "Tariflər - FerdiNet" };

export default function Tariflar() {
  return (
    <>
      <Header />
      <section className="banner" style={{padding:"50px 0 40px"}}>
        <BannerDecor compact />
        <div className="container">
          <div className="breadcrumb"><Link href="/">Ana Səhifə</Link> › <span>Tariflər</span></div>
          <h1>İnternet Tarifləri — Sürətli, Limitsiz, Sərfəli</h1>
          <p>100 Mbit/s-dən 1000 Mbit/s-ə qədər fiber internet paketləri.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
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
      <section className="section section-alt">
        <div className="container">
          <h2 className="section-title">Aksiya və Kampaniyalar</h2>
          <p className="section-sub">Bizimlə qoşularkən əlavə endirimlərdən yararlanın</p>
          <div className="grid-3">
            {[
              { t: "İlk Ay Pulsuz", d: "Yeni müştərilər üçün ilk ay tamamilə pulsuzdur.", color: "#f59e0b",
                icon: <><path d="M12 1v6m0 10v6M4.2 4.2l4.2 4.2m7.2 7.2 4.2 4.2M1 12h6m10 0h6M4.2 19.8l4.2-4.2m7.2-7.2 4.2-4.2"/></> },
              { t: "İllik Ödəniş Endirimi", d: "İl ərzində ödəyənlərə 2 ay pulsuz hədiyyə.", color: "#3b82f6",
                icon: <><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="M9 16l2 2 4-4"/></> },
              { t: "Dost Gətir", d: "Hər dost üçün hesabınıza 1 ay pulsuz internet.", color: "#ec4899",
                icon: <><circle cx="9" cy="7" r="4"/><path d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2"/><circle cx="18" cy="7" r="3" opacity=".6"/><path d="M22 21v-2a3 3 0 0 0-2-2.83"/></> },
            ].map((f) => (
              <div className="card" key={f.t} style={{textAlign:"center"}}>
                <div className="icon-box" style={{margin:"0 auto 18px",background:f.color+"1a"}}>
                  <svg viewBox="0 0 24 24" fill="none" stroke={f.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{f.icon}</svg>
                </div>
                <h3>{f.t}</h3><p style={{color:"var(--text-muted)",fontSize:".92rem"}}>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
