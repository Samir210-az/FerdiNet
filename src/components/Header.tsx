"use client";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="topbar">
        <div className="container">
          <div className="topbar-left">
            <a href="tel:"><span>📞</span></a>
            <a href="mailto:"><span>✉️</span></a>
          </div>
          <div className="topbar-right">
            <Link href="/kabinet">Şəxsi Kabinet</Link>
            <Link href="/suret-testi">Sürət Testi</Link>
          </div>
        </div>
      </div>
      <header className="main">
        <div className="container navbar">
          <Link href="/" className="logo">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 7l10-5 10 5-10 5-10-5z"/><path d="M2 7v10l10 5V12z" opacity=".6"/><path d="M22 7v10l-10 5V12z" opacity=".8"/></svg>
            FerdiNet
          </Link>
          <nav className={"nav-links" + (open ? " open" : "")}>
            <Link href="/" onClick={() => setOpen(false)}>Ana Səhifə</Link>
            <Link href="/haqqinda" onClick={() => setOpen(false)}>Haqqımızda</Link>
            <Link href="/xidmetler" onClick={() => setOpen(false)}>Xidmətlər</Link>
            <Link href="/tariflar" onClick={() => setOpen(false)}>Tariflər</Link>
            <Link href="/elaqe" onClick={() => setOpen(false)}>Əlaqə</Link>
          </nav>
          <div className="nav-actions">
            <Link href="/tariflar" className="btn btn-primary">Qoşul</Link>
            <button className="burger" onClick={() => setOpen(!open)} aria-label="Menyu">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
