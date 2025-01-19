const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();
// Make data that can be added, updated or removed

let stockController = {
    getAll: async (req, res) => {
        let stocks = await db.stock.findMany()
        res.render("index", { items: stocks })
    },

    new: (req, res) => {
        res.render("create");
    },

    getOne: async (req, res) => {
        try {
            let stockToFind = parseInt(req.params.id);
            console.log(stockToFind);
            const searchResult = await db.stock.findFirst({
                where: {id: stockToFind}
            });

            if (searchResult != undefined) {
                res.render("single-product", { stock:  searchResult});
            } else {
                res.redirect("/");
            }
        } catch (err) {
            res.redirect("/")
        }
    },

    edit: async (req, res) => {
        let stockToFind = parseInt(req.params.id);
        const searchResult = await db.stock.findFirst({
            where: {id: stockToFind}
        });
        res.render("edit", { stock: searchResult });
    },

    create: async (req, res) => {
        let product = req.body.productName;
        let price = parseInt(req.body.price);
        let perkg = req.body.perkg;

        if (perkg) {
            perkg = true;
        } else {
            perkg = false;
        }
        const productCreate = await db.stock.create({
            data: {product, price, perkg}
        })
        res.redirect("/");
    },

    update: async (req, res) => {
        let productId = parseInt(req.params.id);
        let newProduct = req.body.name;
        let newPrice = parseInt(req.body.price);
        let newPerkg = req.body.perkg;

        if (newPerkg == 'true') {
            newPerkg = true;
        } else {
            newPerkg = false;
        }

        const productUpdate = await db.stock.update({
            where: {id: productId},
            data: {
                product: newProduct,
                price: newPrice,
                perkg: newPerkg
            }
        });
        res.redirect("/");
    },

    delete: async (req, res) => {
        let productId = parseInt(req.params.id);
        const productDelete = await db.stock.delete({
            where: {id: productId}
        });
        res.redirect("/")
    }
};

module.exports = stockController;