export const formatCurrency = (
  value
) => {
  if (value >= 1000000) {
    return `₹${(
      value / 1000000
    ).toFixed(2)}M`;
  }

  return `₹${value.toLocaleString()}`;
};

export const formatPercent = (
  value
) => {
  return `${(
    value * 100
  ).toFixed(1)}%`;
};