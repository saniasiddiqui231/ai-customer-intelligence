function KPICard({ title, value }) {
  return (
    <div
      style={{
  background: "white",
  padding: "24px",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  textAlign: "center"
}}
    >
      <h4
  style={{
    color: "#6b7280",
  }}
>
  {title}
</h4>

<h2
  style={{
    color: "#111827",
  }}
>
  {value}
</h2>
    </div>
  );
}

export default KPICard;