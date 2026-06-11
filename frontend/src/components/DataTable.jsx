// function DataTable({ columns, data }) {
//   return (
//     <table border="2" cellPadding="40">
//       <thead>
//         <tr>
//           {columns.map((column) => (
//             <th key={column}>
//               {column}
//             </th>
//           ))}
//         </tr>
//       </thead>

//       <tbody>
//         {data.map((row, index) => (
//           <tr key={index}>
//             {columns.map((column) => (
//               <td key={column}>
//                 {row[column]}
//               </td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }

// export default DataTable;
function DataTable({ columns, data }) {
  if (!data || data.length === 0) {
    return (
      <div style={{
        background: "#fff", borderRadius: "12px",
        border: "1px solid #E2E8F0", padding: "40px",
        textAlign: "center", color: "#94A3B8", fontSize: "14px",
      }}>
        No data available
      </div>
    );
  }

  return (
    <div style={{
      background: "#FFFFFF",
      borderRadius: "12px",
      border: "1px solid #E2E8F0",
      overflow: "hidden",
    }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "13px",
          tableLayout: "fixed",
        }}>
          <thead>
            <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
              {columns.map((col) => (
                <th key={col} style={{
                  padding: "12px 16px",
                  textAlign: "left",
                  fontWeight: 600,
                  fontSize: "11px",
                  color: "#64748B",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  whiteSpace: "nowrap",
                }}>
                  {col.replace(/_/g, " ")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} style={{
                borderBottom: i < data.length - 1 ? "1px solid #F1F5F9" : "none",
                transition: "background 0.1s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "#F8FAFC"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                {columns.map((col) => (
                  <td key={col} style={{
                    padding: "12px 16px",
                    color: "#334155",
                    fontVariantNumeric: "tabular-nums",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}>
                    {row[col]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;