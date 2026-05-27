import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgVideo from "./assets/main1.mp4";
import mainm from "./assets/mainm.jpeg";
import mainm2 from "./assets/mainm2.jpeg";
import mainf from "./assets/mainf.jpeg";

const MAIN_IMAGES = [mainm, mainm2, mainf];

const REVEAL_CONTENT = [
  {
    upper: ["name moneybagg", "age:23"],
    lower: "major: computer science",
  },
  {
    upper: [
      "Cleopatra lived closer to the Moon landing than to the building of the pyramids.",
      "Vikings kept cats on ships for pest control (and vibes).",
      "In medieval Europe, animals could be put on trial for crimes",
    ],
    lower: "abbove is some history fun fact",
  },
  {
    upper: [
      "Oxford University founding is older than the Aztec Empire.",
      "The shortest war in history lasted 38–45 minutes (Britain vs Zanzibar).",
      "Humans have been writing for ~5,000 years",
    ],
    lower: "yes it's a place holder",
  },
];

const ITEMS = [
  { id: "aboutme",  label: "ABOUT ME",  fontSize: 80, offsetX: 0,  offsetY: 0,  skew: -6,  skewY: 10  },
  { id: "funfacts", label: "FUN FACTS", fontSize: 74, offsetX: 20, offsetY: 8,  skew: -11, skewY: -10 },
  { id: "extras",   label: "EXTRAS",    fontSize: 74, offsetX: 8,  offsetY: 6,  skew: 0,   skewY: -4  },
];

const CLIP_SHAPES = [
  (w, h) => `polygon(0px 0px, ${w}px ${h * 0.5}px, 0px ${h}px)`,
  (w, h) => `polygon(0px 0px, ${w}px ${h * 0.5}px, 0px ${h}px)`,
  (w, h) => `polygon(0px 0px, ${w}px ${h * 0.5}px, 0px ${h}px)`,
];

export default function AboutMe() {
  const [active, setActive]   = useState(0);
  const [mounted, setMounted] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const navigate = useNavigate();

  const activate = (idx) => {
    setActive(idx);
    setAnimKey(k => k + 1);
  };

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") activate(Math.max(0, active - 1));
      if (e.key === "ArrowDown") activate(Math.min(ITEMS.length - 1, active + 1));
      if (e.key === "Enter") setRevealed(true);
      if (e.key === "ArrowRight") setRevealed(true);
      if (e.key === "ArrowLeft") {
        if (revealed) setRevealed(false);
        else navigate(-1);
      }
      if (e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, navigate, revealed]);

  return (
    <div id="menu-screen">
      <video src={bgVideo} autoPlay loop muted playsInline />
      {revealed && <div key={`dim-${active}`} className="ab-dim" />}
      {revealed && (
        <div key={`panel-${active}`} className={`ab-reveal-panel${mounted ? " mounted" : ""}`}>
          <div className="ab-reveal-upper-bar">
            {REVEAL_CONTENT[active].upper.map((line) => (
              <div className="ab-reveal-upper-line" key={line}>{line}</div>
            ))}
          </div>
          <div className="ab-reveal-lower-bar">{REVEAL_CONTENT[active].lower}</div>
        </div>
      )}
      {revealed && (
        <div key={`nav-${active}`} className="ab-right-nav">
          <span className="ab-nav-arrow left">◄</span>
          <span className="ab-nav-btn">LB</span>
          <span className="ab-nav-dot" />
          <span className="ab-nav-btn">RB</span>
          <span className="ab-nav-arrow right">►</span>
        </div>
      )}
      {revealed && (
        <div key={`portrait-${active}`} className={`ab-main-portrait-shell${mounted ? " mounted" : ""}`}>
          <img
            className="ab-main-portrait"
            src={MAIN_IMAGES[active]}
            alt=""
          />
        </div>
      )}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:ital,wght@0,400;0,700;1,700&family=Montserrat:wght@300&display=swap');

        .ab-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .ab-menu {
          position: relative;
          z-index: 20;
          padding: 48px;
          display: flex;
          flex-direction: column;
          align-items: center;
          pointer-events: all;
        }

        .ab-row {
          position: relative;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
          text-decoration: none;
          opacity: 0;
          transform: translateX(36px);
          transition: opacity 0.38s ease, transform 0.38s cubic-bezier(0.22,1,0.36,1);
        }
        .ab-row.mounted {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }

        .ab-glow {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 120%; height: 200%;
          background: radial-gradient(ellipse at center, rgba(80,140,255,0.35) 0%, transparent 70%);
          filter: blur(18px);
          z-index: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .ab-row.active .ab-glow { opacity: 1; }

        .ab-skew-wrap {
          position: relative;
          display: flex;
          align-items: center;
          isolation: isolate;
        }

        @keyframes ab-shadow-pop {
          0%   { transform: translateY(-40%) translateX(-12px) scaleX(0) scaleY(1); }
          55%  { transform: translateY(-46%) translateX(-15px) scaleX(1.22) scaleY(1.18); }
          75%  { transform: translateY(-39%) translateX(-11px) scaleX(0.96) scaleY(0.97); }
          100% { transform: translateY(-40%) translateX(-12px) scaleX(1) scaleY(1); }
        }

        .ab-shadow-tri {
          position: absolute;
          top: 50%;
          transform-origin: left center;
          background: rgba(80, 120, 235, 0.85);
          z-index: 1;
          pointer-events: none;
          transform: translateY(-40%) translateX(-12px) scaleX(0);
          transition: transform 0.18s ease;
        }
        .ab-shadow-tri.pop {
          animation: ab-shadow-pop 0.28s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .ab-highlight {
          position: absolute;
          top: 50%;
          transform-origin: left center;
          background: #ffffff;
          z-index: 2;
          transition: transform 0.22s cubic-bezier(0.22,1,0.36,1);
          pointer-events: none;
        }

        .ab-label-wrap {
          position: relative;
          z-index: 3;
        }

        .ab-label-base {
          font-family: 'Anton', sans-serif;
          font-style: italic;
          letter-spacing: 2px;
          line-height: 0.85;
          display: block;
          white-space: nowrap;
          user-select: none;
        }

        .ab-label-dark {
          color: #ffffff;
          text-shadow: 0 0 8px rgba(0,200,255,0.7), 0 2px 4px rgba(0,0,0,0.8);
          -webkit-text-stroke: 1px rgba(0,180,255,0.4);
          transition: color 0.12s ease, text-shadow 0.12s ease;
        }
        .ab-row.active .ab-label-dark { color: #001a4d; text-shadow: none; -webkit-text-stroke: 0; }
        .ab-row:hover:not(.active) .ab-label-dark { color: #ffffff; text-shadow: 0 0 12px rgba(0,220,255,0.9), 0 2px 6px rgba(0,0,0,0.9); }

        .ab-label-bright {
          color: #4da6ff;
          position: absolute;
          inset: 0;
          z-index: 1;
          opacity: 0;
          transition: opacity 0.12s ease;
        }
        .ab-row.active .ab-label-bright { opacity: 1; }

        .ab-hint {
          position: absolute;
          bottom: 24px; right: 28px;
          z-index: 20;
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 5px;
          font-family: 'Anton', sans-serif;
          opacity: 0;
          transition: opacity 0.5s ease 0.9s;
        }
        .ab-hint.mounted { opacity: 1; }
        .ab-hint-row {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; letter-spacing: 2px;
          color: rgba(255,255,255,0.28);
        }
        .ab-hint-key {
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 3px;
          padding: 1px 6px; font-size: 11px;
        }

        /* Reveal panel styles */
        .ab-dim {
          position: absolute;
          inset: 0;
          z-index: 12;
          background: rgba(40, 45, 54, 0.68);
          pointer-events: none;
          animation: ab-dim-in 0.32s ease-out;
        }

        @keyframes ab-dim-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes ab-reveal-bar-in {
          0% { opacity: 0; transform: translateX(-120px) rotate(-20deg) scaleX(0.72); }
          60% { opacity: 0.96; transform: translateX(18px) rotate(-20deg) scaleX(1.03); }
          100% { opacity: 0.92; transform: translateX(0) rotate(-20deg) scaleX(1); }
        }

        @keyframes ab-portrait-in {
          0% { opacity: 0; transform: translateX(78px) skewX(-8deg) scale(0.94); filter: blur(8px); }
          55% { opacity: 0.9; transform: translateX(-8px) skewX(-8deg) scale(1.015); filter: blur(0); }
          100% { opacity: 0.96; transform: translateX(0) skewX(-8deg) scale(1); filter: blur(0); }
        }

        @keyframes ab-arrow-left {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50% { transform: translateX(-5px); opacity: 0.4; }
        }
        @keyframes ab-arrow-right {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50% { transform: translateX(5px); opacity: 0.4; }
        }

        .ab-main-portrait-shell {
          position: absolute;
          top: 0; right: -3vw;
          z-index: 13;
          pointer-events: none;
          width: 43vw; height: 100vh;
          overflow: hidden;
          opacity: 0;
          transform: translateX(24px) skewX(-8deg) scale(0.98);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .ab-main-portrait-shell.mounted {
          opacity: 0.96;
          transform: translateX(0) skewX(-8deg) scale(1);
          animation: ab-portrait-in 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .ab-main-portrait {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: top right;
          transform: skewX(8deg) scale(1.08);
          transform-origin: top right;
        }

        .ab-reveal-panel {
          position: absolute;
          top: 44vh; left: -6vw;
          width: 88vw; height: 60vh;
          z-index: 12;
          pointer-events: none;
          background: linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(243,246,252,0.98) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 88px) 100%, 0 100%);
          box-shadow: 0 0 0 2px rgba(255,255,255,0.18), 18px 0 0 rgba(30, 90, 215, 0.82), 28px 0 0 rgba(255,255,255,0.26);
          opacity: 0;
          transform: translateX(-40px) rotate(-20deg);
          transform-origin: left bottom;
          transition: opacity 0.3s ease, transform 0.35s ease;
        }
        .ab-reveal-panel.mounted {
          opacity: 0.92;
          transform: translateX(0) rotate(-20deg);
          animation: ab-reveal-bar-in 0.46s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .ab-reveal-panel::before {
          content: "";
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 8px;
          background: linear-gradient(180deg, #1a6aff 0%, #3380ff 100%);
          clip-path: inherit;
        }
        .ab-reveal-upper-bar {
          position: absolute;
          top: 10%; left: 0%; width: 100%; height: 40%;
          background: rgba(0, 0, 0, 0.92);
          clip-path: polygon(0 0, 100% 0, calc(100% - 22px) 100%, 0 100%);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.06);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 10px; color: #fff; text-align: center;
        }
        .ab-reveal-upper-line {
          font-family: 'Montserrat', sans-serif;
          font-weight: 300; font-size: 20px;
          letter-spacing: 0.5px; line-height: 1.15;
        }
        .ab-reveal-lower-bar {
          position: absolute;
          top: 58%; right: 0;
          width: 48%; height: 20%;
          background: rgba(0, 0, 0, 0.92);
          clip-path: polygon(0 0, 100% 0, calc(100% - 22px) 100%, 0 100%);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.06);
          display: flex; align-items: center; justify-content: flex-start;
          color: #fff;
          font-family: 'Montserrat', sans-serif;
          font-weight: 300; font-size: 22px;
          letter-spacing: 0.4px; text-transform: lowercase;
          padding-left: 22px;
        }

        @keyframes ab-right-nav-pop {
          0%   { opacity: 0; transform: scale(0.55) translateY(-10px); }
          65%  { opacity: 1; transform: scale(1.1) translateY(2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .ab-right-nav {
          position: absolute;
          top: 10vh; left: 6vw;
          display: flex; align-items: center; gap: 6px;
          pointer-events: none; z-index: 14;
          transform: translateX(-40px) rotate(-20deg);
          transform-origin: left bottom;
          animation: ab-right-nav-pop 0.38s cubic-bezier(0.22,1,0.36,1) both;
        }
        .ab-right-nav .ab-nav-btn {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 100px; letter-spacing: 3px; line-height: 1;
          user-select: none; color: #fff;
          -webkit-text-stroke: 2px #000;
          paint-order: stroke fill;
          background: none; border: none; padding: 0 6px;
        }
        .ab-right-nav .ab-nav-dot {
          width: 16px; height: 16px; border-radius: 999px;
          background: #111; margin: 0 10px; flex-shrink: 0;
        }
        .ab-right-nav .ab-nav-arrow {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px; color: #1a6aff;
          display: inline-block; user-select: none;
        }
        .ab-right-nav .ab-nav-arrow.left  { animation: ab-arrow-left  0.8s ease-in-out infinite; }
        .ab-right-nav .ab-nav-arrow.right { animation: ab-arrow-right 0.8s ease-in-out infinite; }
      `}</style>

      <div className="ab-overlay">
        <nav className="ab-menu">
          {ITEMS.map((item, i) => {
            const isActive = active === i;
            const dist = Math.abs(i - active);
            const opacity = isActive ? 1 : Math.max(0.5, 1 - dist * 0.2);
            const estW = item.label.length * item.fontSize * 0.6 + 80;
            const estH = item.fontSize * 0.94;
            const clipFn = CLIP_SHAPES[i] ?? CLIP_SHAPES[0];

            return (
              <a
                key={item.id}
                href="#"
                className={`ab-row ${isActive ? "active" : ""} ${mounted ? "mounted" : ""}`}
                style={{
                  marginRight: item.offsetX,
                  marginTop: item.offsetY,
                  transitionDelay: mounted ? `${i * 80}ms` : "0ms",
                }}
                onClick={(e) => { e.preventDefault(); setActive(i); setRevealed(true); }}
                onMouseEnter={() => activate(i)}
                aria-current={isActive ? "page" : undefined}
              >
                <div className="ab-glow" />
                <div
                  className="ab-skew-wrap"
                  style={{ transform: `skewX(${item.skew}deg) skewY(${item.skewY}deg)` }}
                >
                  <div
                    key={isActive ? `pop-${i}-${animKey}` : `idle-${i}`}
                    className={`ab-shadow-tri${isActive ? ' pop' : ''}`}
                    style={{
                      width: estW,
                      height: estH,
                      clipPath: clipFn(estW, estH),
                    }}
                  />
                  <div
                    className="ab-highlight"
                    style={{
                      width: estW,
                      height: estH,
                      clipPath: clipFn(estW, estH),
                      transform: `translateY(-50%) scaleX(${isActive ? 1 : 0})`,
                    }}
                  />
                  <div className="ab-label-wrap" style={{ opacity }}>
                    <span className="ab-label-base ab-label-dark" style={{ fontSize: item.fontSize }}>
                      {item.label}
                    </span>
                    <span
                      className="ab-label-base ab-label-bright"
                      style={{
                        fontSize: item.fontSize,
                        clipPath: clipFn(estW, estH),
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </nav>

        <div className={`ab-hint ${mounted ? "mounted" : ""}`}>
          <div className="ab-hint-row"><span className="ab-hint-key">↑↓</span><span>SELECT</span></div>
          <div className="ab-hint-row"><span className="ab-hint-key">↵</span><span>REVEAL</span></div>
          <div className="ab-hint-row"><span className="ab-hint-key">ESC</span><span>BACK</span></div>
        </div>
      </div>
    </div>
  );
}
