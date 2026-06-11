// function KPICard({ title, value }) {
//   return (
//     <div
//       style={{
//   background: "white",
//   padding: "24px",
//   borderRadius: "12px",
//   boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
//   textAlign: "center"
// }}
//     >
//       <h4
//   style={{
//     color: "#6b7280",
//   }}
// >
//   {title}
// </h4>

// <h2
//   style={{
//     color: "#111827",
//   }}
// >
//   {value}
// </h2>
//     </div>
//   );
// }

// export default KPICard;
/**
 * accent: "indigo" | "emerald" | "amber" | "rose" — drives left-bar color
 * trend: optional string like "+12%" shown as sub-label
 */
const ACCENTS = {
  indigo: "#6366F1",
  emerald: "#10B981",
  amber: "#F59E0B",
  rose: "#EF4444",
};

function KPICard({ title, value, accent = "indigo", trend, icon }) {
  const color = ACCENTS[accent] || ACCENTS.indigo;

  return (
    <div style={{
      background: "#FFFFFF",
      borderRadius: "12px",
      border: "1px solid #E2E8F0",
      padding: "20px 24px",
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      borderLeft: `4px solid ${color}`,
      minWidth: 0,
    }}>
      <span style={{
        fontSize: "12px",
        fontWeight: 600,
        color: "#94A3B8",
        textTransform: "uppercase",
        letterSpacing: "0.08em",
      }}>
        {title}
      </span>
      <span style={{
        fontSize: "28px",
        fontWeight: 700,
        color: "#0F172A",
        letterSpacing: "-0.02em",
        lineHeight: 1,
        fontVariantNumeric: "tabular-nums",
      }}>
        {value}
      </span>
      {trend && (
        <span style={{ fontSize: "13px", color: "#64748B" }}>{trend}</span>
      )}
    </div>
  );
}

export default KPICard;