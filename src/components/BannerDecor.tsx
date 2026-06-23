import ParallaxBlob from "./Parallax";

const ICONS = {
  wifi: (
    <><path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><circle cx="12" cy="20" r="1" /></>
  ),
  headset: (
    <><path d="M3 11a9 9 0 0 1 18 0v6a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" /><path d="M3 11v3a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3" /></>
  ),
  router: (
    <><rect x="2" y="14" width="20" height="7" rx="2" /><path d="M6 14V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6" /><circle cx="7" cy="17.5" r=".7" fill="currentColor" /><circle cx="11" cy="17.5" r=".7" fill="currentColor" /></>
  ),
  signal: (
    <><path d="M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 20V4" /></>
  ),
  bolt: (
    <path d="M13 2 3 14h7l-1 8 10-12h-7z" />
  ),
  globe: (
    <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>
  ),
};

const PRESETS: { icon: keyof typeof ICONS; top?: string; left?: string; right?: string; bottom?: string; size: number; speed: number; opacity: number }[] = [
  { icon: "wifi", top: "3%", left: "8%", size: 38, speed: -0.18, opacity: 0.18 },
  { icon: "bolt", top: "4%", right: "10%", size: 26, speed: -0.25, opacity: 0.2 },
  { icon: "signal", top: "2%", right: "32%", size: 28, speed: -0.12, opacity: 0.16 },
  { icon: "globe", bottom: "3%", left: "10%", size: 40, speed: 0.1, opacity: 0.16 },
  { icon: "headset", bottom: "4%", right: "9%", size: 34, speed: 0.22, opacity: 0.18 },
  { icon: "router", bottom: "2%", right: "32%", size: 30, speed: 0.16, opacity: 0.16 },
];

/**
 * Banner daxilində üzən, parallax + daimi "float" hərəkəti olan ikon nişanları.
 * compact=true: kiçik (alt səhifə) banner-lər üçün daha az/kiçik element.
 */
export default function BannerDecor({ compact = false, noBottom = false }: { compact?: boolean; noBottom?: boolean }) {
  let items = compact ? [PRESETS[0], PRESETS[1], PRESETS[4]] : PRESETS;
  if (noBottom) items = items.filter((p) => !p.bottom);
  return (
    <>
      {items.map((p, i) => (
        <ParallaxBlob
          key={i}
          speed={p.speed}
          className="banner-decor-item"
          style={{
            top: p.top,
            left: p.left,
            right: p.right,
            bottom: p.bottom,
            width: p.size,
            height: p.size,
            zIndex: 1,
          }}
        >
          <div
            className="floaty-badge"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              background: `rgba(255,255,255,${p.opacity})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(2px)",
              animationDuration: `${3.2 + i * 0.6}s`,
              animationDelay: `${i * 0.35}s`,
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: "55%", height: "55%", opacity: 0.9 }}
            >
              {ICONS[p.icon]}
            </svg>
          </div>
        </ParallaxBlob>
      ))}
    </>
  );
}
