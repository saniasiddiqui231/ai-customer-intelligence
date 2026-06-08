import { Link } from "react-router-dom";
import { useState } from "react";
function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          width: collapsed ? "80px" : "220px",
          backgroundColor: "#f8fafc",
    color: "#111827",
          padding: "30px",
        }}
      >
        <button
  onClick={() => setCollapsed(!collapsed)}
>
  ☰
</button>
        <h2>📊 Analytics</h2>

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            marginTop: "30px",
          }}
        >
          <Link to="/" style={{ color: "black" }}>
  {collapsed ? "📊" : "📊 Dashboard"}
</Link>

<Link to="/customers" style={{ color: "black" }}>
  {collapsed ? "🧑‍🤝‍🧑" : "🧑‍🤝‍🧑 Customer Intelligence"}
</Link>

<Link to="/products" style={{ color: "black" }}>
  {collapsed ? "🛍️" : "🛍️ Product Intelligence"}
</Link>

<Link to="/forecast" style={{ color: "black" }}>
  {collapsed ? "📈":"📈 Revenue Forecast"}
</Link>
        </nav>
      </div>

      <div
        style={{
          flex: 1,
          padding: "30px",
          background: "#f5f7fb",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Layout;