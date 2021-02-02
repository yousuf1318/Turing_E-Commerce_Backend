const express = require("express");
const app = express ();
app.use (express.json())

const router = require("./routes/routes");
app.use(router);

app.listen(4500,()=>{
    console.log("server is running on 4500");
})