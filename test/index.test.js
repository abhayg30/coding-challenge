const { calculationOfMetrics } = require("../index.js");
const mockData = require("./mock_data.json");

describe("Metrics calculation", () => {
  it("should calculate the revenue correctly", () => {
    const { revenue } = calculationOfMetrics(mockData);
    expect(revenue).toBe("$32,431");
  });

  it("should calculate the expense correctly", () => {
    const { expense } = calculationOfMetrics(mockData);
    expect(expense).toBe("$3,665");
  });

  it("should calculate gross profit margin correctly", () => {
    const { grossProfitMargin } = calculationOfMetrics(mockData);
    expect(grossProfitMargin).toBe("298.1%");
  });

  it("should calculate net profit margin correctly", () => {
    const { netProfitMargin } = calculationOfMetrics(mockData);
    expect(netProfitMargin).toBe("88.7%");
  });
});
