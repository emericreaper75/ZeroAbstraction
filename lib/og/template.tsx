import React from "react";

import { clampText, normalizeTags } from "@/lib/og/utils";

export function OgTemplate(props: {
  kind: "Post" | "Project";
  title: string;
  subtitle?: string;
  tags?: string[];
  theme?: "dark" | "light";
}) {
  const theme = props.theme ?? "dark";
  const isDark = theme === "dark";

  const title = clampText(props.title, 120);
  const subtitle = props.subtitle ? clampText(props.subtitle, 140) : undefined;
  const tags = normalizeTags(props.tags, 5);

  const bg = isDark
    ? "linear-gradient(135deg, #050810 0%, #0b1024 45%, #09061a 100%)"
    : "linear-gradient(135deg, #ffffff 0%, #f4f7ff 45%, #ffffff 100%)";

  const border = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)";
  const text = isDark ? "#e5e7eb" : "#0f172a";
  const mut = isDark ? "rgba(229,231,235,0.65)" : "rgba(15,23,42,0.65)";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: bg,
        padding: 64,
        fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          borderRadius: 32,
          border: `1px solid ${border}`,
          padding: 56,
          background: isDark ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.65)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
              color: mut,
              fontSize: 22,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: isDark ? "rgba(34,211,238,0.85)" : "rgba(14,116,144,0.85)",
              }}
            />
            {props.kind}
          </div>
          <div style={{ color: mut, fontSize: 20, letterSpacing: 1 }}>
            Zero Abstraction
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: 40, gap: 18 }}>
          <div
            style={{
              color: text,
              fontSize: 62,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              wordBreak: "break-word",
            }}
          >
            {title}
          </div>

          {subtitle ? (
            <div
              style={{
                color: mut,
                fontSize: 26,
                lineHeight: 1.35,
                maxWidth: 980,
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>

        <div style={{ display: "flex", marginTop: "auto", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {tags.map((t) => (
              <span
                key={t}
                style={{
                  display: "inline-flex",
                  padding: "10px 14px",
                  borderRadius: 999,
                  border: `1px solid ${border}`,
                  background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                  color: mut,
                  fontSize: 18,
                }}
              >
                {t}
              </span>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 6,
              color: mut,
              fontSize: 18,
            }}
          >
            <span style={{ color: isDark ? "rgba(34,211,238,0.9)" : "rgba(14,116,144,0.9)" }}>
              zero-abstraction.dev
            </span>
            <span>{isDark ? "Dark" : "Light"} theme OG</span>
          </div>
        </div>
      </div>
    </div>
  );
}

