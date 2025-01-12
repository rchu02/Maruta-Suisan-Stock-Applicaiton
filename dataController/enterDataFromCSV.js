const { PrismaClient } = require('@prisma/client');
const parseCsv = require("./parseData")
const prisma = new PrismaClient()

async function add(name, money, kg) {
    if (money != 0) {
        const stuff = await prisma.stock.create({
            data: {
                product: name,
                price: money,
                perkg: kg,
            }
        })
    }
    else {
        const stuff = await prisma.stock.create({
            data: {
                product: name,
            }
    })}
    console.log(`${name} added to database`)
  }

(async () => {
    try {
        const data = await parseCsv('./Maruta-Suisan-data-Sheet1.csv');
        // console.log(data);
        for (let i = 0; i < data.length; i++) {
            const product = data[i]
            const name = product['Product Name'];
            const price = Number(product['Price']);
            const perKg = (product['Per Kg'] === 'TRUE');
            // console.log(name, price, perKg)
            await add(name, price, perKg);
        }
      } catch (err) {
        console.error(`Error: ${err.message}`);
      }
})();