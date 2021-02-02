const knex = require("../controler/database");

module.exports = (knex,shopping)=>{
    
    // CREATING shoppingcart/unique_id //
    shopping.get("/shopping_cart/unique_id", (req, res) => {
        var text = "";
        var char_list = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
        for (var i = 0; i < 10; i++) {
        text += char_list.charAt(Math.floor(Math.random() * char_list.length))
        }
        var cart_id = {
        "cart_id": text
        }
        console.log("This is your cart_id");
        console.log(cart_id);
        res.send(cart_id);
        // var id=Math.round((Math.random()*100)+1);
        // var cart_id=id;
        // console.log(cart_id,"+++++");
    })
    
    
    // ADD TO SHOPPING CART//
    shopping.post("/shopping_cart/add", (req, res) => {
        var id = Math.round((Math.random() * 100) + 1);
        var cart_id = id;
        console.log(id);
        var add_data = {
        "cart_id": cart_id,
        "product_id": req.body.product_id,
        "attributes": req.body.attributes,
        "quantity": req.body.quantity,
        "added_on": new Date()
        }
        knex("shopping_cart").insert(add_data)
        .then(() => {
            knex.select("item_id", "name", "attributes", "shopping_cart.product_id", "price", "quantity", "image")
            .from("shopping_cart")
            .join("product", function () {
                this.on("shopping_cart.product_id", "=", "product.product_id")
            }).then((data) => {
                res.send(data);
                console.log(data);
            }).catch((err) => {
                console.log(err);
            })
        })
    })
    
    
    // Get List of Products in Shopping Cart//
    shopping.get("/shopping_cartw/:cart_id", (req, res) => {
        knex("shopping_cart")
        .where("cart_id", req.params.cart_id)
        .join("product", function () {
            this.on("shopping_cart.product_id", "=", "product.product_id")
        }).then((data) => {
            var dict = {
            "item_id": data[0].item_id,
            "name": data[0].name,
            "attributes": data[0].attributes,
            "product_id": data[0].product_id,
            "price": data[0].price,
            "quantity": data[0].quantity,
            "image": data[0].image
    
            }
            res.send(dict);
            console.log(dict);
        }).catch((err) => {
            console.log(err);
        })
    
    })
    
    //UPDATE SHOOPINGCART WITH CART_ID//
    shopping.put("/shopping_cart/update/:cart_id", (req, res) => {
        knex.select("*")
        .from("shopping_cart")
        .where("cart_id", req.params.cart_id)
        .update(req.body)
        .then((data) => {
            res.send("update successfully")
        }).catch((err) => {
            console.log(err);
        })
    })
    
    //EMPTY SHOPPING_CART with cart_id//
    shopping.delete("/shopping_cart/delete/:cart_id", (req, res) => {
        knex.select("*")
        .from("shopping_cart")
        .where("cart_id", req.params.cart_id)
        .delete(req.params.cart_id)
        .then((data) => {
            res.send("data delete successfully")
        }).catch((err) => {
            console.log(err);
        })
    })
    
    
    
    //FROM SHOPPING_CART TO MOVE TO CART WITH ITEM_ID//
    shopping.get("/shopping_cart/moveTocart/:item_id", (req, res) => {
        knex.schema.hasTable('cart').then((exists) => {
        if (!exists) {
    
            return knex.schema.createTable("cart", (t) => {
            t.increments('item_id').primary();
            t.string("cart_id");
            t.string("name");
            t.integer("product_id");
            t.string("attributes");
            t.decimal("price");
            t.integer("quantity");
            t.integer("buy_now");
            t.dateTime("added_on")
            }).then((data) => {
            console.log("table create successfuly...");
            })
        } else {
            knex("shopping_cart").join("product", "shopping_cart.product_id", "product.product_id")
            .select("shopping_cart.item_id", "product.name", "shopping_cart.attributes", "shopping_cart.product_id",
                "product.price", "shopping_cart.quantity", "shopping_cart.cart_id")
            .where("shopping_cart.item_id", req.params.item_id)
            .then((data) => {
                // console.log(data);
                if (data.length != 0) {
                var to_store = data[0]
                knex("cart").insert(to_store)
                    .where("cart.item_id", req.params.item_id)
                    .then(() => {
                    res.send("data sending successfully...");
                    console.log("data sending successfully...");
                    }).catch((ar) => {
                    console.log(ar);
                    })
                } else {
                console.log("data is not finding...");
                }
            }).catch((er) => {
                console.log(er);
            })
        }
        })
    })
    
    //FROM SHOPPING_CART GET TOTAL AMOUNT USING CART_ID
    shopping.get("/shopping_cart/totalAmount/:cart_id", (req, res) => {
        let cart_id = req.params.cart_id
        knex.select("price", "quantity")
        .from("shopping_cart")
        .join("shopping_cart.product_id", "product.product_id")
        .where("shopping_cart", cart_id)
        .then((data) => {
            console.log(data);
            for (let i of data) {
            let result = []
            let total_Amount = i.quantity * i.price
            i.total_Amount = total_Amount
            // console.log(i);
            result.push(i)
            res.send(result)
            }
        }).catch((err) => {
            console.log(err);
        })
    })
  
}