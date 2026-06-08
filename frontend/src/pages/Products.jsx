import { useEffect, useState } from "react";
import api from "../api";
import TopProductsChart from "../components/TopProductChart";
import DataTable from "../components/DataTable";
import PageHeader from "../components/PageHeader";
<PageHeader
  title="Product Intelligence"
  subtitle="Revenue, recommendations and purchasing patterns"
/>
function Products() {
  const [topProducts, setTopProducts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [pairs, setPairs] = useState([]);

  useEffect(() => {
    api.get("/products/top")
      .then((response) => {
        setTopProducts(response.data);
      });

    api.get("/products/recommendations")
      .then((response) => {
        setRecommendations(response.data);
      });

    api.get("/products/pairs")
      .then((response) => {
        setPairs(response.data);
      });

  }, []);
const chartData = topProducts.slice(0, 10);
const cleanedRecommendations =
  recommendations.map((item) => ({
    ...item,
    confidence: item.confidence.toFixed(2),
    lift: item.lift.toFixed(1),
  }));
  return (
    <div style={{ padding: "20px" }}>
      <h1>Products</h1>

      <h2>Top Products by Revenue</h2>
      <div className="chart-card"><TopProductsChart
        data={chartData}
      />
</div>
      <br />

      <h2>Product Insights</h2>

{recommendations
  .slice(0, 5)
  .map((item, index) => (
    <div
      key={index}
      style={{
        border: "1px solid #ddd",
        padding: "15px",
        marginBottom: "10px",
        borderRadius: "8px",
      }}
    >
      <strong>
        Customers who buy
      </strong>

      <p>{item.product_a}</p>

      <strong>
        are {item.lift.toFixed(1)}× more likely to buy
      </strong>

      <p>{item.product_b}</p>
    </div>
))}
    <div
  style={{
    overflowX: "auto",
  }}
>
      <DataTable
        columns={[
          "product_a",
          "product_b",
          "confidence",
          "lift"
        ]}
        data={cleanedRecommendations}
      />
      </div>

      <br />

      <h2>Strongest Product Pairs</h2>

      <DataTable
        columns={[
          "product_a",
          "product_b",
          "lift"
        ]}
        data={pairs}
      />
    </div>
  );
}

export default Products;