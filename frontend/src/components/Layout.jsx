// import { Link } from "react-router-dom";
// import { useState } from "react";
// function Layout({ children }) {
//   const [collapsed, setCollapsed] = useState(false);

//   return (
//     <div
//       style={{
//         display: "flex",
//         minHeight: "100vh",
//       }}
//     >
//       <div
//         style={{
//           width: collapsed ? "80px" : "220px",
//           backgroundColor: "#f8fafc",
//     color: "#111827",
//           padding: "30px",
//         }}
//       >
//         <button
//   onClick={() => setCollapsed(!collapsed)}
// >
//   ☰
// </button>
//         <h2>📊 Analytics</h2>

//         <nav
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             gap: "15px",
//             marginTop: "30px",
//           }}
//         >
//           <Link to="/" style={{ color: "black" }}>
//   {collapsed ? "📊" : "📊 Dashboard"}
// </Link>

// <Link to="/customers" style={{ color: "black" }}>
//   {collapsed ? "🧑‍🤝‍🧑" : "🧑‍🤝‍🧑 Customer Intelligence"}
// </Link>

// <Link to="/products" style={{ color: "black" }}>
//   {collapsed ? "🛍️" : "🛍️ Product Intelligence"}
// </Link>

// <Link to="/forecast" style={{ color: "black" }}>
//   {collapsed ? "📈":"📈 Revenue Forecast"}
// </Link>
//         </nav>
//       </div>

//       <div
//         style={{
//           flex: 1,
//           padding: "30px",
//           background: "#f5f7fb",
//         }}
//       >
//         {children}
//       </div>
//     </div>
//   );
// }

// export default Layout;
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: "ti-layout-dashboard" },
  { to: "/customers", label: "Customer Intelligence", icon: "ti-users" },
  { to: "/products", label: "Product Intelligence", icon: "ti-box" },
  { to: "/forecast", label: "Revenue Forecast", icon: "ti-trending-up" },
];

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F1F5F9", fontFamily: "'Inter', sans-serif" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Sidebar */}
      <aside style={{
        width: collapsed ? "68px" : "240px",
        minHeight: "100vh",
        background: "#0F172A",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.2s ease",
        overflow: "hidden",
        flexShrink: 0,
      }}>
        {/* Logo row */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: collapsed ? "20px 18px" : "20px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          minHeight: "64px",
        }}>
          <div style={{
            width: "32px", height: "32px", borderRadius: "8px",
            background: "#6366F1", display: "flex", alignItems: "center",
            justifyContent: "center", flexShrink: 0,
          }}>
            <i className="ti ti-chart-bar" style={{ color: "#fff", fontSize: "18px" }} />
          </div>
          {!collapsed && (
            <span style={{ color: "#F8FAFC", fontWeight: 700, fontSize: "15px", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>
              Analytics
            </span>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "12px 8px", display: "flex", flexDirection: "column", gap: "2px" }}>
          {NAV_ITEMS.map(({ to, label, icon }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                title={collapsed ? label : undefined}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: collapsed ? "10px 18px" : "10px 12px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  background: active ? "rgba(99,102,241,0.18)" : "transparent",
                  color: active ? "#A5B4FC" : "#94A3B8",
                  fontWeight: active ? 600 : 400,
                  fontSize: "14px",
                  transition: "background 0.15s, color 0.15s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#E2E8F0"; } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#94A3B8"; } }}
              >
                <i className={`ti ${icon}`} style={{ fontSize: "18px", flexShrink: 0 }} />
                {!collapsed && <span>{label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Collapse toggle */}
        <div style={{ padding: "12px 8px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{
              width: "100%", padding: "10px", border: "none",
              background: "transparent", cursor: "pointer",
              color: "#64748B", borderRadius: "8px",
              display: "flex", alignItems: "center", justifyContent: collapsed ? "center" : "flex-end",
              transition: "background 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <i className={`ti ${collapsed ? "ti-chevron-right" : "ti-chevron-left"}`} style={{ fontSize: "18px" }} />
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: "32px", overflow: "auto", minWidth: 0 }}>
        {children}
      </main>
    </div>
  );
}

export default Layout;