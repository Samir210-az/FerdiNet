import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">
              <svg viewBox="0 0 24 24" fill="currentColor" style={{width:30,height:30,color:"var(--primary)"}}><path d="M2 7l10-5 10 5-10 5-10-5z"/></svg>
              FerdiNet
            </div>
            <p style={{fontSize:".9rem",color:"#a7bfa3",marginBottom:18}}>FerdiNet — Azərbaycanda yüksək sürətli fiber optik internet xidmətlərinin lider təminatçısı.</p>
            <div className="social-links">
              <a href="https://instagram.com/s_akhundoff" target="_blank" rel="noopener" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>
              </a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Şirkət</h4>
            <ul>
              <li><Link href="/haqqinda">Haqqımızda</Link></li>
              <li><Link href="/xidmetler">Xidmətlər</Link></li>
              <li><Link href="/tariflar">Tariflər</Link></li>
              <li><Link href="/elaqe">Əlaqə</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Dəstək</h4>
            <ul>
              <li><Link href="/kabinet">Şəxsi Kabinet</Link></li>
              <li><Link href="/suret-testi">Sürət Testi</Link></li>
              <li><Link href="/elaqe">Əlaqə</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Əlaqə</h4>
            <ul><li></li><li></li><li></li><li>7/24 Dəstək Xətti</li></ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 FerdiNet. Bütün hüquqlar qorunur.</span>
          <span>By <a href="https://instagram.com/s_akhundoff" target="_blank" rel="noopener">s_akhundoff</a></span>
        </div>
      </div>
    </footer>
  );
}
