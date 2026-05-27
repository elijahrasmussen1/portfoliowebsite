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

  return (
    <div className="policies-page">
      <img src={bgImage} alt="" className="policies-bg" />
      <div className="policies-content">
        <div className="policies-text-panel">
          <h1 className="policies-title">Policies</h1>
          <div className="policies-body">
            {policyText.split("\n").map((line, i) => (
              <p key={i} className={line.trim() === "" ? "policies-spacer" : "policies-line"}>
                {line || "\u00A0"}
              </p>
            ))}
          </div>
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
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        }
        .policies-content {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          height: 100vh;
          padding: 60px 40px 40px 60px;
        }
        .policies-text-panel {
          max-width: 600px;
          max-height: calc(100vh - 120px);
          overflow-y: auto;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(8px);
          border-radius: 12px;
          padding: 40px 36px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        }
        .policies-text-panel::-webkit-scrollbar {
          width: 6px;
        }
        .policies-text-panel::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        .policies-text-panel::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }
        .policies-text-panel::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.35);
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
        }
        .policies-body {
          font-family: 'Montserrat', 'Segoe UI', sans-serif;
          font-size: 14px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.88);
        }
        .policies-line {
          margin: 0 0 6px 0;
        }
        .policies-spacer {
          margin: 0;
          height: 12px;
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
