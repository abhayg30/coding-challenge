const allData = require("./data.json");
const mock_data = require("./test/mock_data.json");
const accountData = allData.data;

const assetsType = ["current", "bank", "current_accounts_receivable"];
const liabilitiesType = ["current", "current_accounts_payable"];

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

  const assets = accountData
    .filter(
      (entry) =>
        entry.account_category === "assets" &&
        assetsType.includes(entry.account_type)
    )
    .reduce((sum, entry) => {
      return entry.value_type === "debit"
        ? sum + entry.total_value
        : sum - entry.total_value;
    }, 0);

  const liabilities = accountData
    .filter(
      (entry) =>
        entry.account_category === "liability" &&
        liabilitiesType.includes(entry.account_type)
    )
    .reduce((sum, entry) => {
      return entry.value_type === "credit"
        ? sum + entry.total_value
        : sum - entry.total_value;
    }, 0);

    const workingCapitalRatio = (assets / liabilities)*100 || 0

  return {
    revenue: formatValue(revenue),
    expense: formatValue(expense),
    grossProfitMargin: `${(grossProfitMargin * 100).toFixed(1)}%`,
    netProfitMargin: `${(netProfitMargin * 100).toFixed(1)}%`,
    workingCapitalRatio: `${workingCapitalRatio.toFixed(1)}%`
  };
}

const response = calculationOfMetrics(accountData);
console.log(`Revenue: ${response.revenue}`);
console.log(`Expenses: ${response.expense}`);
console.log(`Gross Profit Margin: ${response.grossProfitMargin}`);
console.log(`Net Profit Margin: ${response.netProfitMargin}`);
console.log(`Working Capital Ratio: ${response.workingCapitalRatio}`);


module.exports = { calculationOfMetrics };
