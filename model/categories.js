const knex = require("../controler/database");

module.exports = (knex,categories)=>{
    
    //catagory api//
    categories.get("/categories", (req, res) => {
        knex.select("*")
        .from("category")
        .then((data) => {
            res.send(data)
            console.log(data);
        }).catch((err) => {
            console.log(err);
        })
    })
    
    
    //GET CATEGORIES BY ID//
    categories.get("/categories/:id", (req, res) => {
        knex.select("*")
        .from("category")
        .where("category_id", req.params.id)
        .then((data) => {
            res.send(data)
            console.log(data);
        }).catch((err) => {
            console.log(err);
        })
    })
    //GET CATEGORIES WITH PRODUCT ID//
    categories.post("/categories/product/:id", (req, res) => {
    
        knex.select("*").from("product")
        .innerJoin('category', 'category_id', 'product_id')
        .where("category_id", req.params.id)
        .then((data) => {
            var dict = {
            "category_id": data[0].category_id,
            "department_id": data[0].department_id,
            "name": data[0].name
            }
            res.send(dict)
            console.log(dict);
        }).catch((err) => {
            console.log(err);
        })
    })
    
}