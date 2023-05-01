const fs = require("fs");
const express = require("express");
const viewsRouter = express.Router();


let products = JSON.parse(fs.readFileSync("./productos.json" , 'utf-8'));

viewsRouter.get('/' , (req,res) => {
    
    res.render("index", {products});
});


viewsRouter.get("/realTimeProducts" , (req,res) =>{
    res.render("realTimeProducts");
});

module.exports = viewsRouter;