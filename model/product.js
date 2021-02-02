module.exports = (knex,product)=>{
        //GEETING DATA BY PRODUCT ID//
    product.post("/attribute/inproduct/:id", (req, res) => {
        knex.select("*")
        .from("attribute")
        .join("attribute_value", "attribute_value.attribute_id", "attribute.attribute_id")
        .where("attribute_value_id", req.params.id)
        .then((data) => {
            res.send(data);
            console.log(data);
        }).catch((err) => {
            console.log(err);
        })
    })
    
    //GEETING ALL PRODUCTS//
    product.get("/products", (req, res) => {
        knex.select("*")
        .from("product")
        .then((data) => {
            var dict = {
            "count": data.length,
            "rows": data
            }
            res.send(dict)
            console.log(dict);
            // console.log(data);
        }).catch((err) => {
            console.log(err);
        })
    })
    
    //GET PRODUCT BY SEARCH//
    product.get("/product/search", (req, res) => {
        var search_word = req.query.name
        knex.select("*")
        .from("product")
        .where("name", "like", `%${search_word}%`)
        .then((search_data) => {
            res.send(search_data);
            // console.log(serach_data);
        }).catch((err) => {
            console.log(err);
        })
    })
    
    //GET PRODUCT BY ID//
    product.get("/product/:id", (req, res) => {
        var id = req.params.id
        knex.select("*")
        .from("product")
        .where("product_id", id)
        .then((data) => {
            res.send(data);
        }).then((err) => {
            console.log(err);
        })
    })
    
    //GET PRODUCTS BY INCATEGORY ID// INCOM
    product.post("/products/incategory/:id", (req, res) => {
        knex.select("*")
        .from("department")
        .join("category", " category.deparyment_id", "department .department_id")
        .where("department_id", req.params.id)
        .then((data) => {
            res.send(data)
        }).catch((err) => {
            console.log(err);
        })
    })
    
    // GET PRODUCT DETAILS BY PRODUCT ID//
    product.get("/products/detail/:product_id", (req, res) => {
        knex.select("product_id", "name", "description", "price", "discounted_price", "image", "image_2")
        .from("product")
        .where("product_id", req.params.product_id)
        .then((details_data) => {
            res.send(details_data);
            console.log(details_data);
        }).catch((err) => {
            console.log(err);
        })
    })
    
    
    //GET PRODUCT location BY PRODUCT ID//
    product.get("/product/location/:product_id", (req, res) => {
        knex.select('category.category_id', 'category.name as category_name', 'department.department_id', 'department.name as department_name')
        .from("category")
        .join("product_category", "product_category.category_id", "category.category_id")
        .join("department", "department.department_id", "category.department_id")
        .where("product_id", req.params.product_id)
        .then((data) => {
            res.send(data);
            console.log(data);
        }).catch((err) => {
            console.log(err);
        })
    })
    
}