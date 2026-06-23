import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { PLANS } from "@/lib/plans";

export const metadata = { title: "Tariflər - FerdiNet" };

export default function Tariflar() {
  return (
    <>
      <Header />
      <section className="banner" style={{padding:"50px 0 40px"}}>
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
              ["İlk Ay Pulsuz","Yeni müştərilər üçün ilk ay tamamilə pulsuzdur."],
              ["İllik Ödəniş İndirimi","İl ərzində ödəyənlərə 2 ay pulsuz hədiyyə."],
              ["Dost Gətir","Hər dost üçün hesabınıza 1 ay pulsuz internet."],
            ].map(([t,d]) => (
              <div className="card" key={t} style={{textAlign:"center"}}>
                <div className="icon-box" style={{margin:"0 auto 18px"}}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M2 12h20"/></svg></div>
                <h3>{t}</h3><p style={{color:"var(--text-muted)",fontSize:".92rem"}}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
