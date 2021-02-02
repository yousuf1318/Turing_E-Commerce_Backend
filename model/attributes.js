const knex = require("../controler/database");

module.exports = (knex,attributes)=>{
    //GET ALL ATTRIBUTES//
    attributes.get("/attribute", (req, res) => {
        knex.select("*")
        .from("attribute")
        .then((data) => {
            console.log(data);
        }).catch((err) => {
            console.log(err);
        })
    
    })
    
    //GET ATTRIBUTE BY ID//
    attributes.get("/attribute/:id", (req, res) => {
        knex.select("*")
        .from("attribute")
        .where("attribute_id", req.params.id)
        .then((data) => {
            console.log(data);
        }).catch((err) => {
            console.log(err);
        })
    })
    
    //ATTRIBUTE VALUE BY ATTRIBUTE ID//
    
    attributes.get("/attribute/value/:id", (req, res) => {
        var attribute_id = req.params.id
        knex.select("*")
        .from(" attribute_value_id", "value")
        .from("attribute_value")
        .where("attribute_value_id", attribute_id)
        .then((data) => {
            res.send(data)
        }).catch((err) => {
            console.log(err);
        })
    })
  
}