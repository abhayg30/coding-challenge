const data = require("./data.json");
const mock_data = require("./test/mock_data.json");
const accountData = data.data;

function formatValue(value) {
  return `$${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

function calculationOfMetrics(accountData) {
  const revenue = accountData
    .filter((entry) => entry.account_category === "revenue")
    .reduce((sum, entry) => sum + entry.total_value, 0);

  const expense = accountData
    .filter((entry) => entry.account_category === "expense")
    .reduce((sum, entry) => sum + entry.total_value, 0);

  const grossProfitMargin =
    (accountData
      .filter(
        (entry) =>
          entry.account_type === "sales" && entry.value_type === "debit"
      )
      .reduce((sum, entry) => sum + entry.total_value, 0) /
      revenue) *
      100 || 0;

  const netProfitMargin = (revenue - expense) / revenue;

  return {
    revenue: formatValue(revenue),
    expense: formatValue(expense),
    grossProfitMargin: `${(grossProfitMargin * 100).toFixed(1)}%`,
    netProfitMargin: `${(netProfitMargin * 100).toFixed(1)}%`,
  };
}

console.log(calculationOfMetrics(mock_data));

module.exports = { calculationOfMetrics };
