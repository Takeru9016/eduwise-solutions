"use client";

import { useState } from "react";

const BASE = "https://api.iconify.design";

const domains = [
  {
    iconSrc: `${BASE}/logos/tensorflow.svg`,
    label: "AI & Machine Learning",
    color: "#ff6d00",
  },
  {
    iconSrc: `${BASE}/logos/jupyter.svg`,
    label: "Data Science",
    color: "#f37626",
  },
  {
    iconSrc: `${BASE}/logos/apache-spark.svg`,
    label: "Data Analytics",
    color: "#7c3aed",
  },
  {
    iconSrc: `${BASE}/logos/google-cloud.svg`,
    label: "Cloud Computing",
    color: "#4285f4",
  },
  {
    iconSrc: `${BASE}/carbon/security.svg?color=%23ef4444`,
    label: "Cyber Security",
    color: "#ef4444",
  },
  {
    iconSrc: `${BASE}/logos/kubernetes.svg`,
    label: "DevOps",
    color: "#326ce5",
  },
  {
    iconSrc: `${BASE}/logos/react.svg`,
    label: "Full Stack Development",
    color: "#10b981",
  },
  {
    iconSrc: `${BASE}/logos/java.svg`,
    label: "Java Programming",
    color: "#f89820",
  },
  {
    iconSrc: `${BASE}/logos/python.svg`,
    label: "Python Programming",
    color: "#3776ab",
  },
  {
    iconSrc: `${BASE}/logos/html-5.svg`,
    label: "Web Development",
    color: "#e44d26",
  },
  {
    iconSrc: `${BASE}/logos/figma.svg`,
    label: "UI/UX Design",
    color: "#f24e1e",
  },
  {
    iconSrc: `${BASE}/simple-icons/scikitlearn.svg?color=%23a855f7`,
    label: "ML with Python",
    color: "#a855f7",
  },
  {
    iconSrc: `${BASE}/logos/microsoft-azure.svg`,
    label: "Azure Cloud",
    color: "#0078d4",
  },
  {
    iconSrc: `${BASE}/carbon/iot-platform.svg?color=%2322d3ee`,
    label: "IoT",
    color: "#22d3ee",
  },
  {
    iconSrc: `${BASE}/carbon/chip.svg?color=%23f43f5e`,
    label: "Embedded Systems",
    color: "#f43f5e",
  },
  {
    iconSrc: `${BASE}/carbon/car.svg?color=%2334d399`,
    label: "Hybrid Electric Vehicles",
    color: "#34d399",
  },
  {
    iconSrc: `${BASE}/carbon/chemistry.svg?color=%23818cf8`,
    label: "Nanotechnology",
    color: "#818cf8",
  },
  {
    iconSrc: `${BASE}/simple-icons/autodesk.svg?color=%23fbbf24`,
    label: "AutoCAD",
    color: "#fbbf24",
  },
  {
    iconSrc: `${BASE}/carbon/growth.svg?color=%23f472b6`,
    label: "Digital Marketing",
    color: "#f472b6",
  },
  {
    iconSrc: `${BASE}/carbon/chart-line.svg?color=%234ade80`,
    label: "Stock Market",
    color: "#4ade80",
  },
  {
    iconSrc: `${BASE}/carbon/currency.svg?color=%2360a5fa`,
    label: "Finance",
    color: "#60a5fa",
  },
  {
    iconSrc: `${BASE}/carbon/group.svg?color=%23fb923c`,
    label: "HR Management",
    color: "#fb923c",
  },
  {
    iconSrc: `${BASE}/carbon/user-profile.svg?color=%23c084fc`,
    label: "Psychology",
    color: "#c084fc",
  },
  {
    iconSrc: `${BASE}/carbon/result.svg?color=%232dd4bf`,
    label: "Placement Programs",
    color: "#2dd4bf",
  },
];

// Split into 3 rows for the diagonal cascade effect
const row1 = domains.slice(0, 8);
const row2 = domains.slice(8, 16);
const row3 = domains.slice(16, 24);

function IsometricTile({
  iconSrc,
  label,
  color,
  delay,
}: {
  iconSrc: string;
  label: string;
  color: string;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="isometric-tile"
      style={{ animationDelay: `${delay}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* The 3D tile face */}
      <div
        className="tile-face"
        style={
          {
            "--tile-color": color,
            transform:
              hovered ?
                "translateZ(20px) scale(1.08)"
              : "translateZ(0px) scale(1)",
          } as React.CSSProperties
        }
      >
        {/* Top shine strip */}
        <div className="tile-shine" />

        {/* Neon border glow on hover */}
        <div
          className="tile-glow"
          style={{
            opacity: hovered ? 1 : 0,
            boxShadow: `0 0 30px ${color}, 0 0 60px ${color}40`,
          }}
        />

        {/* Content */}
        <div className="tile-content">
          {/* Icon badge */}
          <div
            className="tile-icon-badge"
            style={{
              background: `${color}18`,
              border: `1px solid ${color}35`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={iconSrc}
              alt=""
              aria-hidden="true"
              width={22}
              height={22}
              style={{ objectFit: "contain", display: "block" }}
              loading="lazy"
            />
          </div>
          <span
            className="tile-label"
            style={{ color: hovered ? color : undefined }}
          >
            {label}
          </span>
        </div>

        {/* Bottom edge (isometric depth illusion) */}
        <div
          className="tile-bottom-edge"
          style={{ background: hovered ? `${color}40` : undefined }}
        />
        <div
          className="tile-right-edge"
          style={{ background: hovered ? `${color}30` : undefined }}
        />
      </div>
    </div>
  );
}

function DomainRow({
  domains,
  direction,
  speed,
}: {
  domains: typeof row1;
  direction: "left" | "right";
  speed: number;
}) {
  // Duplicate items for seamless looping
  const items = [...domains, ...domains, ...domains];

  return (
    <div className="domain-row-wrapper">
      <div
        className={`domain-row ${direction === "right" ? "domain-row--reverse" : ""}`}
        style={{ "--speed": `${speed}s` } as React.CSSProperties}
      >
        {items.map((d, i) => (
          <IsometricTile
            key={`${i}-${d.label}`}
            iconSrc={d.iconSrc}
            label={d.label}
            color={d.color}
            delay={(i % domains.length) * 0.1}
          />
        ))}
      </div>
    </div>
  );
}

export default function DomainsShowcase() {
  return (
    <section
      aria-label="Technologies and Domains"
      className="domains-showcase-section"
    >
      {/* ── Styles ── */}
      <style>{`
        .domains-showcase-section {
          position: relative;
          padding: 100px 0 80px;
          background: #f8fafc;
          overflow: hidden;
        }

        /* Ambient dot grid background */
        .domains-showcase-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(circle, rgba(16,185,129,0.12) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
        }

        /* Radial vignette overlay */
        .domains-showcase-section::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, #f8fafc 100%);
          pointer-events: none;
          z-index: 2;
        }

        /* ── Header ── */
        .ds-header {
          position: relative;
          z-index: 10;
          text-align: center;
          margin-bottom: 64px;
          padding: 0 20px;
        }

        .ds-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(16,185,129,0.08);
          border: 1px solid rgba(16,185,129,0.3);
          color: #059669;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 6px 16px;
          border-radius: 999px;
          margin-bottom: 24px;
        }

        .ds-badge-dot {
          width: 6px;
          height: 6px;
          background: #10b981;
          border-radius: 50%;
          animation: pulse-dot 2s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }

        .ds-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800;
          color: #0f172a;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin: 0 0 20px;
        }

        .ds-title-accent {
          background: linear-gradient(135deg, #10b981, #0ea5e9, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .ds-subtitle {
          font-size: 1.05rem;
          color: #64748b;
          max-width: 520px;
          margin: 0 auto;
          line-height: 1.7;
        }

        /* ── Rows container ── */
        .ds-rows {
          position: relative;
          z-index: 5;
          display: flex;
          flex-direction: column;
          gap: 20px;
          /* Isometric perspective tilt on the whole block */
          perspective: 1000px;
        }

        .domain-row-wrapper {
          position: relative;
        }

        /* Fade edges */
        .domain-row-wrapper::before,
        .domain-row-wrapper::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: 120px;
          z-index: 10;
          pointer-events: none;
        }
        .domain-row-wrapper::before {
          left: 0;
          background: linear-gradient(90deg, #f8fafc, transparent);
        }
        .domain-row-wrapper::after {
          right: 0;
          background: linear-gradient(-90deg, #f8fafc, transparent);
        }

        .domain-row {
          display: flex;
          gap: 28px;
          width: max-content;
          animation: scroll-left var(--speed, 40s) linear infinite;
        }

        .domain-row--reverse {
          animation-name: scroll-right;
        }

        @keyframes scroll-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }

        @keyframes scroll-right {
          from { transform: translateX(-33.333%); }
          to   { transform: translateX(0); }
        }

        /* Pause on hover of the whole row wrapper */
        .domain-row-wrapper:hover .domain-row {
          animation-play-state: paused;
        }

        /* ── Isometric Tile ── */
        .isometric-tile {
          flex-shrink: 0;
          perspective: 600px;
          animation: tile-float 3s ease-in-out infinite;
        }

        .tile-face {
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 22px;
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 14px;
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
                      border-color 0.3s ease,
                      box-shadow 0.3s ease;
          transform-style: preserve-3d;
          min-width: 200px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
          will-change: transform;
        }

        .tile-face:hover {
          border-color: color-mix(in srgb, var(--tile-color) 60%, transparent);
          box-shadow: 0 8px 24px color-mix(in srgb, var(--tile-color) 20%, transparent),
                      0 2px 8px rgba(0,0,0,0.08);
        }

        /* Shine strip at the top */
        .tile-shine {
          position: absolute;
          top: 0; left: 16px; right: 16px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent);
          border-radius: 999px;
        }

        /* Glow border effect */
        .tile-glow {
          position: absolute;
          inset: -1px;
          border-radius: 14px;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        /* Bottom depth edge (pseudo-3D illusion) */
        .tile-bottom-edge {
          position: absolute;
          bottom: -6px; left: 6px; right: -6px;
          height: 6px;
          background: rgba(0,0,0,0.06);
          border-radius: 0 0 4px 4px;
          transform: skewX(-2deg);
          transition: background 0.3s;
        }

        .tile-right-edge {
          position: absolute;
          right: -6px; top: 6px; bottom: -6px;
          width: 6px;
          background: rgba(0,0,0,0.04);
          border-radius: 0 4px 4px 0;
          transform: skewY(-2deg);
          transition: background 0.3s;
        }

        /* Tile content */
        .tile-content {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 11px;
          pointer-events: none;
        }

        .tile-icon-badge {
          flex-shrink: 0;
          width: 38px;
          height: 38px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
        }

        .isometric-tile:hover .tile-icon-badge {
          transform: scale(1.1);
        }

        .tile-label {
          font-size: 14px;
          font-weight: 600;
          color: #334155;
          white-space: nowrap;
          letter-spacing: -0.01em;
          transition: color 0.3s ease;
        }

        /* ── Mobile ── */
        @media (max-width: 640px) {
          .domains-showcase-section {
            padding: 70px 0 60px;
          }
          .ds-badge { font-size: 11px; }
          .tile-face { min-width: 170px; padding: 12px 16px; }
          .tile-label { font-size: 13px; }
          .tile-icon { font-size: 18px; }
        }
      `}</style>

      {/* ── Header ── */}
      <div className="ds-header">
        <div className="ds-badge">
          <span className="ds-badge-dot" />
          24 Domains &amp; Counting
        </div>
        <h2 className="ds-title">
          Upskill in the world&apos;s most{" "}
          <span className="ds-title-accent">in-demand technologies</span>
        </h2>
        <p className="ds-subtitle">
          Curated programs designed with industry experts to make you job‑ready
          in tomorrow&apos;s most sought-after fields.
        </p>
      </div>

      {/* ── Isometric Cascade Rows ── */}
      <div className="ds-rows">
        <DomainRow domains={row1} direction="left" speed={38} />
        <DomainRow domains={row2} direction="right" speed={45} />
        <DomainRow domains={row3} direction="left" speed={32} />
      </div>
    </section>
  );
}
