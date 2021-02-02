// const knex = require("../controler/database");

module.exports = (knex,department)=>{
        //department api//
    department.get("/department", (req, res) => {
        // res.send(data)
    
        knex.select("*")
        .from("department")
        .then((data) => {
            res.send(data)
            console.log(data);
        }).catch((err) => {
            console.log(err);
        })
    })
    
    
    
    
    //GET DEPARTMENT BY ID//
    department.get("/department/:id", (req, res) => {
        // res.send(data)
        console.log(req.params.id);
        id = req.params.id
        knex.select("*")
        .from("department")
        .where("department_id", id)
        .then((data) => {
            res.send(data)
            console.log(data);
        }).catch((err) => {
            console.log(err);
        })
    })
    
}