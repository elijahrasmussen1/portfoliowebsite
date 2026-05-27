import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

  return (
    <div className="policies-page">
      <div className="policies-content">
        <h1 className="policies-title">Policies</h1>
        <div className="policies-body">
          {policyText.split("\n").map((line, i) => {
            const trimmed = line.trim();
            if (trimmed === "") return <p key={i} className="policies-spacer">&nbsp;</p>;
            if (trimmed.startsWith("# ")) return <h1 key={i} className="policies-h1">{trimmed.slice(2)}</h1>;
            if (trimmed.startsWith("## ")) return <h2 key={i} className="policies-h2">{trimmed.slice(3)}</h2>;
            if (trimmed.startsWith("### ")) return <h3 key={i} className="policies-h3">{trimmed.slice(4)}</h3>;
            if (trimmed.startsWith("* ")) return <li key={i} className="policies-li">{trimmed.slice(2)}</li>;
            if (trimmed === "---") return <hr key={i} className="policies-hr" />;
            if (trimmed.startsWith("**") && trimmed.endsWith("**")) return <p key={i} className="policies-line policies-bold">{trimmed.slice(2, -2)}</p>;
            return <p key={i} className="policies-line">{line}</p>;
          })}
        </div>
      </div>
      <button className="policies-back-btn" onClick={() => navigate(-1)}>
        ← BACK
      </button>
      <style>{`
        .policies-page {
          width: 100%;
          min-height: 100vh;
          background: #1a1a2e;
          overflow-y: auto;
        }
        .policies-content {
          max-width: 760px;
          margin: 0 auto;
          padding: 80px 48px 120px;
        }
        .policies-title {
          font-family: 'Montserrat', 'Segoe UI', sans-serif;
          font-size: 36px;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 40px 0;
          letter-spacing: 0.5px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
          padding-bottom: 16px;
        }
        .policies-body {
          font-family: 'Montserrat', 'Segoe UI', Arial, sans-serif;
          font-size: 15px;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.9);
        }
        .policies-h1 {
          font-size: 26px;
          font-weight: 700;
          color: #ffffff;
          margin: 40px 0 16px 0;
          letter-spacing: 0.3px;
        }
        .policies-h2 {
          font-size: 20px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.95);
          margin: 32px 0 12px 0;
        }
        .policies-h3 {
          font-size: 17px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          margin: 24px 0 10px 0;
        }
        .policies-line {
          margin: 0 0 8px 0;
        }
        .policies-bold {
          font-weight: 700;
        }
        .policies-li {
          margin: 0 0 6px 0;
          padding-left: 20px;
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
          margin: 0;
          height: 16px;
        }
        .policies-hr {
          border: none;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
          margin: 36px 0;
        }
        .policies-back-btn {
          position: fixed;
          bottom: 28px;
          left: 48px;
          z-index: 10;
          background: rgba(26, 26, 46, 0.9);
          border: 1px solid rgba(125, 249, 255, 0.4);
          color: #7df9ff;
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 1px;
          padding: 10px 22px;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
          backdrop-filter: blur(8px);
        }
        .policies-back-btn:hover {
          background: rgba(125, 249, 255, 0.12);
          color: #ffffff;
        }
        .policies-page::-webkit-scrollbar {
          width: 8px;
        }
        .policies-page::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.03);
        }
        .policies-page::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 4px;
        }
        .policies-page::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.25);
        }
      `}</style>
    </div>
  );
}
