import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "./assets/back.jpg";
import policyText from "./assets/doc.txt?raw";

export default function PoliciesPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" || e.key === "Backspace" || e.key === "ArrowLeft") {
        navigate(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  const renderLine = (line, i) => {
    const trimmed = line.trim();
    if (trimmed === "") return <div key={i} className="policies-spacer" />;
    if (trimmed === "---") return <hr key={i} className="policies-hr" />;
    if (trimmed.startsWith("# ")) return <h2 key={i} className="policies-h1">{trimmed.slice(2)}</h2>;
    if (trimmed.startsWith("## ")) return <h3 key={i} className="policies-h2">{trimmed.slice(3)}</h3>;
    if (trimmed.startsWith("### ")) return <h4 key={i} className="policies-h3">{trimmed.slice(4)}</h4>;
    if (trimmed.startsWith("* ")) return <li key={i} className="policies-li">{trimmed.slice(2)}</li>;
    if (trimmed.startsWith("**") && trimmed.endsWith("**")) return <p key={i} className="policies-bold">{trimmed.slice(2, -2)}</p>;
    if (trimmed.includes("**")) {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <p key={i} className="policies-line">
          {parts.map((part, j) => j % 2 === 1 ? <strong key={j}>{part}</strong> : part)}
        </p>
      );
    }
    return <p key={i} className="policies-line">{line}</p>;
  };

  return (
    <div className="policies-page">
      <img src={bgImage} alt="" className="policies-bg" />
      <div className="policies-content">
        <h1 className="policies-title">Policies</h1>
        <div className="policies-body">
          {policyText.split("\n").map(renderLine)}
        </div>
      </div>
      <button className="policies-back-btn" onClick={() => navigate(-1)}>
        ← BACK
      </button>
      <style>{`
        .policies-page {
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
        }
        .policies-bg {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        }
        .policies-content {
          position: relative;
          z-index: 1;
          padding: 60px 40px 40px 60px;
          max-width: 700px;
          height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .policies-title {
          font-family: 'Anton', sans-serif;
          font-size: 42px;
          color: #ffffff;
          margin: 0 0 24px 0;
          letter-spacing: 2px;
          text-transform: uppercase;
          border-bottom: 2px solid rgba(125, 249, 255, 0.4);
          padding-bottom: 12px;
          flex-shrink: 0;
        }
        .policies-body {
          font-family: 'Montserrat', 'Segoe UI', sans-serif;
          font-size: 14px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.88);
          overflow-y: auto;
          flex: 1;
          padding-right: 20px;
          padding-bottom: 80px;
        }
        .policies-body::-webkit-scrollbar {
          width: 6px;
        }
        .policies-body::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        .policies-body::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }
        .policies-body::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.35);
        }
        .policies-h1 {
          font-size: 22px;
          font-weight: 700;
          color: #ffffff;
          margin: 28px 0 12px 0;
          letter-spacing: 0.5px;
        }
        .policies-h2 {
          font-size: 18px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.95);
          margin: 22px 0 10px 0;
        }
        .policies-h3 {
          font-size: 16px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          margin: 18px 0 8px 0;
        }
        .policies-line {
          margin: 0 0 6px 0;
        }
        .policies-bold {
          font-weight: 700;
          margin: 0 0 6px 0;
        }
        .policies-li {
          margin: 0 0 4px 0;
          padding-left: 18px;
          list-style: none;
          position: relative;
        }
        .policies-li::before {
          content: "•";
          position: absolute;
          left: 4px;
          color: rgba(125, 249, 255, 0.7);
        }
        .policies-spacer {
          height: 12px;
        }
        .policies-hr {
          border: none;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          margin: 24px 0;
        }
        .policies-back-btn {
          position: fixed;
          bottom: 28px;
          left: 60px;
          z-index: 10;
          background: rgba(0, 0, 0, 0.7);
          border: 1px solid rgba(125, 249, 255, 0.4);
          color: #7df9ff;
          font-family: 'Anton', sans-serif;
          font-size: 16px;
          letter-spacing: 2px;
          padding: 10px 24px;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .policies-back-btn:hover {
          background: rgba(125, 249, 255, 0.15);
          color: #ffffff;
        }
      `}</style>
    </div>
  );
}
