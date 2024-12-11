const {calculationOfMetrics} = require('../index.js')
const mockData = require("./mock_data.json")

describe("Metrics calculation", () => {
    it("should return the given data correctly", () => {
        const response = calculationOfMetrics(mockData);
        expect(response).toEqual(mockData)
    })
})