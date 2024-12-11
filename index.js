const data = require("./data.json")
const mock_data = require("./test/mock_data.json")
const accountData = data.data

function formatValue(value){
    return `$${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
}

function  calculationOfMetrics(accountData){
    const revenue = formatValue(accountData
                    .filter(entry => entry.account_category === "revenue")
                    .reduce((sum, entry) => sum + entry.total_value, 0));
    return revenue
    
}

module.exports = {calculationOfMetrics}