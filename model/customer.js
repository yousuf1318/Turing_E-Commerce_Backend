const knex = require("../controler/database");

module.exports = (knex,customer)=>{
        // //register customers//
    customer.post("/customers", async (req, res) => {
        try {
        var name = req.body.name
        var email = req.body.email
        var password = req.body.password
        // const hash = await bcryptjs.hash(password,5)
        // console.log(hash);
        if (email.includes("@gmail.com")) {
            knex("customer").insert({
            "name": name,
            "email": email,
            "password": password
            }).then(() => {
            knex("customer").where("email", req.body.email)
                .then((data) => {
    
                res.send(data);
                console.log(data);
                })
            })
        } else {
            console.log("invalide email");
        }
        } catch (err) {
        console.log(err);
        }
    
    })
    
    
    // //login customers//
    customer.post("/customer/login", (req, res) => {
        let a = false
        knex.select("*")
        .from("customer")
        .then((data) => {
            for (i of data) {
            // res.send(data)
            if (i.email == req.body.email && i.password == req.body.password) {
                a = true
    
                let token = jwt.sign({ email: i.email }, "yousuf", { expiresIn: "24h" })
                res.cookie("yousuf", token);
                let decode = req.headers.cookie
                console.log(decode);
    
            }
    
            }
            if (a) {
            knex.select("*")
                .from("customer")
                .where("email", req.body.email)
                .then((data) => {
                delete data[0].password
                res.send(data)
                }).catch((err) => {
                console.log(err);
                })
            console.log("login succesfully");
            } else {
            console.log("your email or passworld id wrong");
            }
        }).catch((err) => {
            console.log(err);
        })
    })
    
    
    //UPDATE CUSTOMER DATA//
    customer.put("/customer/update", (req, res) => {
        let token = req.headers.cookie
        let p = token.slice(7);
        console.log(p);
        var decoded = jwt.verify(p, 'yousuf');
        console.log(decoded)
        knex("customer").
        where({ email: decoded.email })
        .update(req.body)
        .then((data) => {
            res.send("update succesfully")
        }).catch((err) => {
            console.log(err);
        })
    })
    
    
    
    //GET CUSTOMER BY ID//
    customer.get("/customer/:id", (req, res) => {
        var id = req.params.id
        knex.select("*")
        .from("customer")
        .where("customer_id", id)
        .then((data) => {
            res.send(data);
        }).then((err) => {
            console.log(err);
        })
    })
    
    //UPDATE CUSTOMER ADDRESS//
    customer.put("/customer/address", (req, res) => {
        knex.select("*")
        .from("customer")
        .where("email", req.body.email)
        .update(req.body)
        .then(() => {
            res.send("address update successfully")
        }).catch((err) => {
            console.log(err);
        })
    })
}