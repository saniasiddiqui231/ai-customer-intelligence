// function PageHeader({
//   title,
//   subtitle,
// }) {
//   return (
//     <div
//       style={{
//         marginBottom: "30px",
//       }}
//     >
//       <h1
//   style={{
//     color: "#111827",
//     fontWeight: "700",
//   }}
// >
//   {title}
// </h1>

//       <p
//   style={{
//     color: "#6b7280",
//   }}
// >
//   {subtitle}
// </p>
//     </div>
//   );
// }

// export default PageHeader;
function PageHeader({ title, subtitle }) {
  return (
    <div style={{ marginBottom: "28px" }}>
      <h1 style={{
        margin: 0,
        fontSize: "24px",
        fontWeight: 700,
        color: "#0F172A",
        letterSpacing: "-0.03em",
        lineHeight: 1.2,
      }}>
        {title}
      </h1>
      {subtitle && (
        <p style={{
          margin: "4px 0 0",
          fontSize: "14px",
          color: "#64748B",
          fontWeight: 400,
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default PageHeader;