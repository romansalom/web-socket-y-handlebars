const express = require("express");
const routerCarts = express.Router();
const fs = require("fs");
const { v4: uuidv4} = require('uuid');


//Array de productos
const todoslosProductos = [];
let products = JSON.parse(fs.readFileSync("./productos.json" , 'utf-8'));
todoslosProductos.push(...products);

//Array de Carritos
const carritos = [];
const todosloscarts = JSON.parse(fs.readFileSync("./carrito.json" , "utf8", (error)=>{ throw Error(error) }));
carritos.push(...todosloscarts);


//Obtener los carritos
routerCarts.get('/',(req,res) =>{ res.send(carritos) });


//Crear un carrito
routerCarts.post('/' , (req,res) =>{
    
    carritos.push({ productosCarrito: [], id: uuidv4()})
    fs.writeFileSync("./carrito.json" , JSON.stringify(carritos),(err)=>{ throw new Error(err) })
    res.send('carrito creado')
    
});
   

//Obtener un carrito especifico
routerCarts.get('/:cid' ,(req,res)=>{

    let {cid} = req.params;
    const carrito = carritos.find(c => c.id = cid);
    res.send(carrito) 

})


//Insertar productos en un carrito
routerCarts.post('/:cid/products/:pid' , (req,res) => {

    //Tomamos el carrito desde el params
        const {cid} = req.params;
        const carritoAsignado = carritos.find((c => c.id = cid ));

    //Tomamos el producto que vamos a insertar desde el params
        const {pid} = req.params;
        const indexp  = todoslosProductos.find((p => p.id = pid ));

        const productoRepetido = carritoAsignado.productosCarrito.find( e => e.id === pid ) //cambiar = por ===

        if(productoRepetido){
        
            carritoAsignado.productosCarrito.map( ( element )=>{ if( element.id === pid ){ element.quantity++ } }) //cambiar = por ===

        }
        else
        {
            carritoAsignado.productosCarrito.push({

                id : indexp.id, //cambiar iddelproducto por id
                quantity : 1
                
                })
        }

        //Cargamos los cambios en el JSON 
        fs.writeFileSync("./carrito.json" , JSON.stringify(carritos),(err)=>{ throw new Error(err) })

        //Retornamos una respuesta
        res.send(carritoAsignado);
 
})
    
module.exports = routerCarts;