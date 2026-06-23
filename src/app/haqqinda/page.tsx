import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = { title: "Haqqımızda - FerdiNet" };

const VALUES = [
  { t: "Etibarlılıq", d: "99.9% şəbəkə stabilliyi", color: "#10b981",
    icon: <path d="M12 2 4 6v6c0 5.5 3.8 8.7 8 10 4.2-1.3 8-4.5 8-10V6l-8-4z" /> },
  { t: "Sürət", d: "1 Gbit/s-ə qədər bağlantı", color: "#f59e0b",
    icon: <path d="M13 2 3 14h7l-1 8 10-12h-7z" /> },
  { t: "Dəstək", d: "24/7 texniki yardım", color: "#8b5cf6",
    icon: <><path d="M3 11a9 9 0 0 1 18 0v6a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" /><path d="M3 11v3a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3" /></> },
  { t: "Şəffaflıq", d: "Gizli ödəniş yoxdur", color: "#3b82f6",
    icon: <><circle cx="12" cy="12" r="3" /><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /></> },
];

const TEAM_ROLES = [
  "Baş Direktor",
  "Texniki Direktor",
  "Satış üzrə Menecer",
  "Müştəri Dəstəyi Rəhbəri",
];

export default function Haqqinda() {
  return (
    <>
      <Header />
      <section className="banner" style={{padding:"50px 0 40px"}}>
        <div className="container">
          <div className="breadcrumb"><Link href="/">Ana Səhifə</Link> › <span>Haqqımızda</span></div>
          <h1>FerdiNet haqqında</h1>
          <p>Azərbaycanda yüksək sürətli fiber optik internet xidmətlərinin lider təminatçısı</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:50,alignItems:"center"}} className="about-grid-resp">
            <div style={{width:"100%",borderRadius:"var(--radius)",boxShadow:"var(--shadow)",background:"linear-gradient(135deg,#2e9e4d,#5cc97f)",minHeight:340,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:"4rem",fontWeight:800}}>FN</div>
            <div>
              <h2 style={{fontSize:"1.9rem",marginBottom:16}}>Bizim Hekayəmiz</h2>
              <p style={{color:"var(--text-muted)",marginBottom:16}}>FerdiNet, müştərilərinə ən sürətli və etibarlı internet bağlantısını təmin etmək məqsədilə qurulmuş telekommunikasiya şirkətidir. GPON fiber optik texnologiyası ilə evlərə və ofislərə limitsiz, kəsilməz internet çatdırırıq.</p>
              <p style={{color:"var(--text-muted)",marginBottom:16}}>Komandamız hər gün minlərlə müştəriyə xidmət göstərərək, şəbəkə stabilliyini, sürəti və müştəri məmnuniyyətini ön planda tutur. Bizim üçün hər bir müştəri etibar deməkdir.</p>
              <p style={{color:"var(--text-muted)"}}>Bu gün 1000-dən çox məmnun müştəri ilə Bakı və ətraf ərazilərdə fəaliyyət göstəririk və şəbəkəmizi davamlı olaraq genişləndiririk.</p>
            </div>
          </div>

          <div style={{marginTop:60}}>
            <span className="eyebrow">Dəyərlərimiz</span>
            <h2 className="section-title">Bizi fərqləndirən prinsiplər</h2>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20,marginTop:30}} className="values-grid-resp">
              {VALUES.map((v) => (
                <div className="card" key={v.t} style={{textAlign:"center",padding:"24px 18px"}}>
                  <div className="icon-box" style={{margin:"0 auto 12px",background:v.color+"1a"}}>
                    <svg viewBox="0 0 24 24" fill="none" stroke={v.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:28,height:28}}>{v.icon}</svg>
                  </div>
                  <h4 style={{fontSize:"1rem",marginBottom:6}}>{v.t}</h4>
                  <p style={{fontSize:".85rem",color:"var(--text-muted)"}}>{v.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <span className="eyebrow">Komandamız</span>
          <h2 className="section-title">Bizimlə tanış olun</h2>
          <p className="section-sub">FerdiNet-i irəli aparan komanda üzvləri</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:24}} className="team-grid-resp">
            {TEAM_ROLES.map((role) => (
              <div className="card" key={role} style={{textAlign:"center",padding:"26px 18px"}}>
                <div style={{width:80,height:80,borderRadius:"50%",background:"var(--primary-light)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",fontWeight:800,color:"var(--primary)",fontSize:"1.6rem"}}>?</div>
                <h4 style={{fontSize:"1rem",marginBottom:4}}>&nbsp;</h4>
                <span style={{fontSize:".85rem",color:"var(--text-muted)"}}>{role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="cta container">
          <h2>Bizimlə qoşulmağa hazırsınız?</h2>
          <p>FerdiNet ailəsinə qoşulun, sürətli internetin fərqini hiss edin</p>
          <div className="cta-buttons">
            <Link href="/tariflar" className="btn btn-light">Tarifləri Gör</Link>
            <Link href="/elaqe" className="btn btn-outline-white">Bizimlə Əlaqə</Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
