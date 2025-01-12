const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

const getStock = async () => {
    let stocks = await db.stock.findMany()
    // console.log(stocks)
    return stocks
}

// getStock();
module.exports = getStock;