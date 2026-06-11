/**
 * Card wrapper for charts and content sections
 */
function Card({ title, children, style }) {
  return (
    <div style={{
      background: "#FFFFFF",
      borderRadius: "12px",
      border: "1px solid #E2E8F0",
      overflow: "hidden",
      ...style,
    }}>
      {title && (
        <div style={{
          padding: "16px 20px",
          borderBottom: "1px solid #F1F5F9",
        }}>
          <h3 style={{
            margin: 0,
            fontSize: "14px",
            fontWeight: 600,
            color: "#0F172A",
            letterSpacing: "-0.01em",
          }}>
            {title}
          </h3>
        </div>
      )}
      <div style={{ padding: "20px" }}>
        {children}
      </div>
    </div>
  );
}

export default Card;