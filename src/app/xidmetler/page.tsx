import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = { title: "Xidmətlər - FerdiNet" };

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
            {[
              ["Fiber İnternet","GPON texnologiyası ilə ev və ofis üçün yüksək sürətli internet"],
              ["IPTV / OTT","200+ kanal, HD keyfiyyət və zəngin televiziya paketi"],
              ["Rəqəmsal Telefon","Aydın səs keyfiyyəti və sərfəli tariflərlə VoIP telefon"],
            ].map(([t,d]) => (
              <div className="card" key={t} style={{textAlign:"center"}}>
                <div className="icon-box" style={{margin:"0 auto 18px"}}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><circle cx="12" cy="20" r="1"/></svg></div>
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
