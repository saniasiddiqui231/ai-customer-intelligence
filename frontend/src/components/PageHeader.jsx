function PageHeader({
  title,
  subtitle,
}) {
  return (
    <div
      style={{
        marginBottom: "30px",
      }}
    >
      <h1
  style={{
    color: "#111827",
    fontWeight: "700",
  }}
>
  {title}
</h1>

      <p
  style={{
    color: "#6b7280",
  }}
>
  {subtitle}
</p>
    </div>
  );
}

export default PageHeader;