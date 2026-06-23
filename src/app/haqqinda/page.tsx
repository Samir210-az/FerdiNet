import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = { title: "Haqqımızda - FerdiNet" };

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
        <div className="container" style={{maxWidth:760}}>
          <h2 style={{marginBottom:16}}>Bizim Hekayəmiz</h2>
          <p style={{color:"var(--text-muted)",marginBottom:16}}>FerdiNet, müştərilərinə ən sürətli və etibarlı internet bağlantısını təmin etmək məqsədilə qurulmuş telekommunikasiya şirkətidir. GPON fiber optik texnologiyası ilə evlərə və ofislərə limitsiz, kəsilməz internet çatdırırıq.</p>
          <p style={{color:"var(--text-muted)",marginBottom:16}}>Komandamız hər gün minlərlə müştəriyə xidmət göstərərək, şəbəkə stabilliyini, sürəti və müştəri məmnuniyyətini ön planda tutur.</p>
          <p style={{color:"var(--text-muted)"}}>Bu gün 1000-dən çox məmnun müştəri ilə Bakı və ətraf ərazilərdə fəaliyyət göstəririk.</p>
        </div>
      </section>
      <Footer />
    </>
  );
}
