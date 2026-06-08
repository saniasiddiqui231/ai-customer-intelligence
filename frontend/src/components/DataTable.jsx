function DataTable({ columns, data }) {
  return (
    <table border="2" cellPadding="40">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>
              {column}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={column}>
                {row[column]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;