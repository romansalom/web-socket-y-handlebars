const express = require("express");
const handlebars = require('express-handlebars');
const {Server} = require('socket.io');
const app = express();
const fs = require("fs");
const { v4: uuidv4} = require('uuid');
const productsRouters = require('./routers/productsRouters');
const cartsRouters = require('./routers/cartsRouters');
const views = require("./routers/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products',productsRouters);
app.use('/api/cart',cartsRouters);
app.use('/' , views);
const PORT = 4000;
const httpServer = app.listen(PORT,() =>{
  console.log('servidor levantado ')
});
const socketServer = new Server(httpServer);

app.engine('handlebars' , handlebars.engine());
app.set('views' , __dirname +'/views');
app.set('view engine' , 'handlebars');
app.use(express.static(__dirname +'/public'));


socketServer.on('connection',  (socket)  =>{

  let products =  JSON.parse(fs.readFileSync("./productos.json" , 'utf-8'));

  socket.emit('cargadeProductos' , products)
  socket.on("productoNuevo" , (productos)=>{
    
    let objetoNuevo = {id:uuidv4() , ...productos};
    products.push(objetoNuevo);

    fs.writeFileSync("./productos.json" , JSON.stringify(products) )

    socket.emit('cargadeProductos' , products);
  })

  socket.on("idaEliminar" , (id)=>{
    let arrayVacio =[ ];
    products.map((product) =>{
        if(product.id !== id) arrayVacio.push(product)
  
    })
    fs.writeFileSync("./productos.json" , JSON.stringify(arrayVacio) )
    })

    socket.emit('cargadeProductos' , products);
  
  })
  


