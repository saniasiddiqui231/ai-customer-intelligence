// import { useEffect, useState } from "react";
// import api from "../api";
// import TopProductsChart from "../components/TopProductChart";
// import DataTable from "../components/DataTable";
// import PageHeader from "../components/PageHeader";
// <PageHeader
//   title="Product Intelligence"
//   subtitle="Revenue, recommendations and purchasing patterns"
// />
// function Products() {
//   const [topProducts, setTopProducts] = useState([]);
//   const [recommendations, setRecommendations] = useState([]);
//   const [pairs, setPairs] = useState([]);

//   useEffect(() => {
//     api.get("/products/top")
//       .then((response) => {
//         setTopProducts(response.data);
//       });

//     api.get("/products/recommendations")
//       .then((response) => {
//         setRecommendations(response.data);
//       });

//     api.get("/products/pairs")
//       .then((response) => {
//         setPairs(response.data);
//       });

//   }, []);
// const chartData = topProducts.slice(0, 10);
// const cleanedRecommendations =
//   recommendations.map((item) => ({
//     ...item,
//     confidence: item.confidence.toFixed(2),
//     lift: item.lift.toFixed(1),
//   }));
//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Products</h1>

//       <h2>Top Products by Revenue</h2>
//       <div className="chart-card"><TopProductsChart
//         data={chartData}
//       />
// </div>
//       <br />

//       <h2>Product Insights</h2>

// {recommendations
//   .slice(0, 5)
//   .map((item, index) => (
//     <div
//       key={index}
//       style={{
//         border: "1px solid #ddd",
//         padding: "15px",
//         marginBottom: "10px",
//         borderRadius: "8px",
//       }}
//     >
//       <strong>
//         Customers who buy
//       </strong>

//       <p>{item.product_a}</p>

//       <strong>
//         are {item.lift.toFixed(1)}× more likely to buy
//       </strong>

//       <p>{item.product_b}</p>
//     </div>
// ))}
//     <div
//   style={{
//     overflowX: "auto",
//   }}
// >
//       <DataTable
//         columns={[
//           "product_a",
//           "product_b",
//           "confidence",
//           "lift"
//         ]}
//         data={cleanedRecommendations}
//       />
//       </div>

//       <br />

//       <h2>Strongest Product Pairs</h2>

//       <DataTable
//         columns={[
//           "product_a",
//           "product_b",
//           "lift"
//         ]}
//         data={pairs}
//       />
//     </div>
//   );
// }

// export default Products;
import { useEffect, useState } from "react";
import api from "../api";
import TopProductsChart from "../components/TopProductChart";
import DataTable from "../components/DataTable";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";

function SectionLabel({ children }) {
  return (
    <p style={{
      margin: "28px 0 12px",
      fontSize: "11px",
      fontWeight: 700,
      color: "#94A3B8",
      textTransform: "uppercase",
      letterSpacing: "0.1em",
    }}>
      {children}
    </p>
  );
}

function RecommendationCard({ item, index }) {
  return (
    <div style={{
      background: "#FFFFFF",
      border: "1px solid #E2E8F0",
      borderRadius: "10px",
      padding: "16px 20px",
      display: "grid",
      gridTemplateColumns: "1fr auto 1fr",
      alignItems: "center",
      gap: "16px",
    }}>
      <div>
        <div style={{ fontSize: "11px", color: "#94A3B8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>
          If they buy
        </div>
        <div style={{ fontSize: "13px", fontWeight: 600, color: "#0F172A", lineHeight: 1.4 }}>
          {item.product_a}
        </div>
      </div>

      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "4px",
        padding: "8px 16px",
        background: "#EEF2FF",
        borderRadius: "8px",
        flexShrink: 0,
      }}>
        <span style={{ fontSize: "18px", fontWeight: 700, color: "#6366F1", fontVariantNumeric: "tabular-nums" }}>
          {item.lift.toFixed(1)}×
        </span>
        <span style={{ fontSize: "10px", color: "#6366F1", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
          more likely
        </span>
      </div>

      <div>
        <div style={{ fontSize: "11px", color: "#94A3B8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px", textAlign: "right" }}>
          to also buy
        </div>
        <div style={{ fontSize: "13px", fontWeight: 600, color: "#0F172A", lineHeight: 1.4, textAlign: "right" }}>
          {item.product_b}
        </div>
      </div>
    </div>
  );
}

function Products() {
  const [topProducts, setTopProducts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [pairs, setPairs] = useState([]);

  useEffect(() => {
    api.get("/products/top").then((r) => setTopProducts(r.data));
    api.get("/products/recommendations").then((r) => setRecommendations(r.data));
    api.get("/products/pairs").then((r) => setPairs(r.data));
  }, []);

  const chartData = topProducts.slice(0, 10);

  const cleanedRecommendations = recommendations.map((item) => ({
    ...item,
    confidence: Number(item.confidence).toFixed(2),
    lift: Number(item.lift).toFixed(1),
  }));

  return (
    <div>
      <PageHeader
        title="Product Intelligence"
        subtitle="Revenue leaders, recommendations, and purchasing patterns"
      />

      <Card title="Top Products by Revenue">
        <TopProductsChart data={chartData} />
      </Card>

      <SectionLabel>Product Affinities</SectionLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
        {recommendations.slice(0, 5).map((item, index) => (
          <RecommendationCard key={index} item={item} index={index} />
        ))}
      </div>

      <SectionLabel>Association Rules</SectionLabel>
      <DataTable
        columns={["product_a", "product_b", "confidence", "lift"]}
        data={cleanedRecommendations}
      />

      <SectionLabel>Strongest Product Pairs</SectionLabel>
      <DataTable
        columns={["product_a", "product_b", "lift"]}
        data={pairs}
      />
    </div>
  );
}

export default Products;