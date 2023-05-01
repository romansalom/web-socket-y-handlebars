const socket = io();
let formulario = document.querySelector(".formulario");
let formularioEliminar = document.querySelector(".formularioEliminar");
let productsRealTime = document.querySelector("#productsRealTime");

const cargaDeProductos = () => {
  socket.on("cargadeProductos", (data) => {
    productsRealTime.innerHTML = "";

    data.forEach((e) => {
      productsRealTime.innerHTML += `<ul>
            <li><h3>Nombre: ${e.nombre}</h3></li>
            <li>Precio: ${e.precio} </li>
            <li>Stock: ${e.quantity} </li>
            <li>ID: ${e.id} </li>
         </ul>`;
    });
  });
};
cargaDeProductos();

formulario.addEventListener("submit" , (evento)=>{
 evento.preventDefault();
 let producto = {
  nombre: document.querySelector("#nombre").value ,
  precio : document.querySelector("#precio").value , 
   quantity: document.querySelector("#quantity").value}

   socket.emit("productoNuevo" , producto);
   socket.on("productos" , cargaDeProductos());
});

formularioEliminar.addEventListener("submit" , (evento) =>{
  evento.preventDefault();
  let idaEliminar = document.querySelector("#idDelete").value;
  socket.emit("idaEliminar" , idaEliminar );
 
})
