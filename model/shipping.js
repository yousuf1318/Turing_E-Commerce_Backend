module.exports = (knex,shipping)=>{
    //GET shippings regions//
    shipping.get("/shippings/regions", (req, res) => {
        knex.select("*")
        .from("shipping_region")
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            console.log(err);
        })
    })
    
    //GET shippings regions BY shippings_regions_ID//
    shipping.get("/shipping/regions/:shipping_region_id", (req, res) => {
        let shipping_region_id = req.params.shipping_region_id;
        knex
        .select('*')
        .from('shipping')
        .where('shipping_region_id', shipping_region_id)
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            console.log(err);
        })
    })
    
  
}