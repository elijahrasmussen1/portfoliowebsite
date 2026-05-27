import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "./assets/back.jpg";

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

  // ─── PASTE YOUR POLICY TEXT BELOW ───
  const policyContent = (
    <div className="policies-body">
      <p>Paste your policy text here.</p>
    </div>
  );
  // ─── END POLICY TEXT ───

  return (
    <div className="policies-page">
      <img src={bgImage} alt="" className="policies-bg" />
      <div className="policies-content">
        <h1 className="policies-title">Policies</h1>
        {policyContent}
      </div>
      <button className="policies-back-btn" onClick={() => navigate(-1)}>
        ← BACK
      </button>
      <style>{`
        .policies-page {
          position: relative;
          width: 100vw;
          min-height: 100vh;
          overflow-y: auto;
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
          padding: 60px 40px 100px 60px;
          max-width: 700px;
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
