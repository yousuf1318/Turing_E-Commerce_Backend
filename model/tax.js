const knex = require("../controler/database");

module.exports = (knex,tax)=>{
    

    // GET ALL TAX DATA //
    tax.get("/tax", (req, res) => {
        knex.select("*")
        .from("tax")
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            console.log(err);
        })
    })
    
    //GET ALL TAX DATA FROM TAX_ID/
    tax.get("/tax/:tax_id", (req, res) => {
        let tax_id = req.params.tax_id
        knex.select("*")
        .from("tax")
        .where("tax_id", tax_id)
        .then((data) => {
            res.send(data)
        }).catch((err) => {
            console.log(err);
        })
    })
  
}