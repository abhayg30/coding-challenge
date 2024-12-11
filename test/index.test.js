const {calculationOfMetrics} = require('../index.js')
const mockData = require("./mock_data.json")

describe("Metrics calculation", () => {
    it("should calculate the revenue correctly", () => {
        const revenue = calculationOfMetrics(mockData);
        expect(revenue).toBe("$32,431")
    })
})