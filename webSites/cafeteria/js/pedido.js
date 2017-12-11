/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

window.onload = function () {
    getClients();
    var divTable = document.getElementById("divTableProductos");
    console.log(divTable.id);
    divTable.style.visibility='hidden';
    var divTable = document.getElementById("pagoConBillete");
    divTable.style.visibility='hidden';
    pagar = document.getElementById("aceptarPago");
    pagar.addEventListener("click",aceptarPago);
    var divTable = document.getElementById("dialog-message");
    divTable.style.visibility='hidden';
                
}
/*
 * variables locales necesarias para que interactuen las funciones
 * @type Number
 */
var totalBebidas = 0;
var total = 0;
var alimento= false;
var bebida = false;
var papas = false;
var descuento = false;
//compras contendra las compras hechas por el usuario
var carrito=[];
/**
 * Trae toda la lista de clientes del la base de datos y crea un droplist 
 * con estos mismos
 * @returns {undefined}
 */
function getClients() {
    $.ajax({
        url: "../logica/Main.php",
        type: "GET",
        data: { option: "getClientList", datos: "null"}
    }).done(function(respu){
        console.log(respu);
        respuesta = JSON.parse(respu);
        console.log(respuesta);
        clientesList = respuesta;
        console.log("mando el ajax");
        console.log(respuesta[0]);
                    
        var clientList = document.createElement("select");
        clientList.id = "clienteList";
        clientList.onchange = changeFuncCliente;
        //clientList.setAttribute("onchange", changeFuncCliente);
        clientes = document.getElementById("listaDeClientes");
        clientes.appendChild(clientList);
                    
        console.log(respuesta.length);
        //obteniendo la longitud del json
        var count = Object.keys(respuesta).length;
        var option = document.createElement("option");
        option.value = -1;
        option.text = "Seleccione un cliente";
        clientList.appendChild(option);
        for (var i = 0; i < count; i++) {
                       
            option = document.createElement("option");
            cliente = respuesta[i];
                        
            option.value = cliente['idcliente'];
            option.text = cliente['idcliente']+"    "+cliente['nombre']+" " + cliente['apellidoP'] + " "+ cliente['apellidoM'];
                        
            console.log(cliente['nombre']+" " + cliente['apellidoP'] + " "+ cliente['apellidoM']);
            clientList.appendChild(option);
                    
        }
    });
}
/**
 * Escucha el id del cliente seleccionado del droplist Lista de clientes
 * e invoca a la funcion getProductos
 * @returns {undefined}
 */
function changeFuncCliente() {
    var selectBox = document.getElementById("clienteList");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value
            +" "+ selectBox.options[selectBox.selectedIndex].text;
    idCliente = selectBox.options[selectBox.selectedIndex].value;
    //alert(selectedValue);
    console.log("idCliente: "+selectedValue);
    //divClienteInfo = document.getElementById("clienteNombre");
    //divClienteInfo.innerHTML= selectedValue;
    getProductos();
}
/**
 * Muestra un drop list conlos productos disponibles en la base de datos 
 * @returns {undefined}
 */
function getProductos() {
    $.ajax({
        url: "../logica/Main.php",
        type: "GET",
        data: { option: "getProductList", datos: "null"}
    }).done(function(respu){
        console.log("respuesta empiieza aqui : "+ respu+ " y termina aqui");
        respuesta = JSON.parse(respu);
        console.log(respuesta);
        productosList = respuesta;
        console.log("precio"+productosList[0]['precio']);
                
        productList = document.createElement("select");
        productList.id = "productList";
        productList.min=0;
        productList.onchange = changeFuncProducto;
        //clientList.setAttribute("onchange", changeFuncCliente);
        productos = document.getElementById("divListaDeProductos");
        productos.appendChild(productList);
                    
        console.log(respuesta.length);
        //obteniendo la longitud del json
        var count = Object.keys(respuesta).length;
        var option = document.createElement("option");
        option.value = -1;
        option.text = "Seleccione un producto";
        productList.appendChild(option);
        for (var i = 0; i < count; i++) {
                       
            option = document.createElement("option");
            var producto = respuesta[i];
                        
            option.value = producto['idproducto'];
            option.text = producto['nombre'];
                        
                        
            productList.appendChild(option);
                    
        }
    });
}
function changeFuncProducto() {
    var selectBox = document.getElementById("productList");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value
            +" "+ selectBox.options[selectBox.selectedIndex].text;
    //alert(selectedValue);
    if(!document.getElementById("cantidad")){
        var newtext = document.createTextNode("Cantidad   ");
        var br = document.createElement("br");
        var br2 = document.createElement("br");
        var hr = document.createElement("hr");
        
        var x = document.createElement("INPUT");
        x.setAttribute("type", "number");
        x.setAttribute("id", "cantidad");
        x.setAttribute("min", 1);
        var btAddProd = document.createElement("BUTTON");
        btAddProd.setAttribute("id","btAddProd");
                    
        btAddProd.setAttribute("onclick", "addProduct()");
                    
        var t = document.createTextNode("Agregar a producto");
        btAddProd.appendChild(t); 
                 
        divProductoSeclect = document.getElementById("Producto");
        divProductoSeclect.appendChild(newtext);
        divProductoSeclect.appendChild(x);
        divProductoSeclect.appendChild(br);
        divProductoSeclect.appendChild(br2);
        divProductoSeclect.appendChild(btAddProd); 
        divProductoSeclect.appendChild(hr);
        
       
        
    }
}
/*
 * Simple funcion para manipular un producto
 * @param {type} id
 * @param {type} nombre
 * @param {type} description
 * @param {type} cantidad
 * @param {type} precio
 * @returns {Producto}
 */
function Producto (id,nombre,description,cantidad,precio){
    this.idProducto = id;
    this.nombre = nombre;
    this.descripcion = description;
    this.cantidad = cantidad;
    this.precio = precio;
                
}
/*
 * agrega los productos que se van seleccionando del droplis 
 * de productos
 */
function addProduct(){
    document.getElementById("clienteList").disabled=true;            
    if(document.getElementById("cantidad").value >0){
        //se recupera el valor de la cantidad de productos comprados
        var selectBox = document.getElementById("productList");
        //creasion de un nuevo objeto producto
        compra = new Producto();
                    
        compra.idProducto = selectBox.options[selectBox.selectedIndex].value;
                
        compra.nombre = selectBox.options[selectBox.selectedIndex].text;
        compra.cantidad = document.getElementById("cantidad").value;
        compra.precio = productosList[parseInt(compra.idProducto)-1]['precio'];
                    
                    
            
        //json = "{ id:"+compra.id+",nombre:"+compra.nombre+",cantidad:"+compra.cantidad+",precio:"+compra.precio+"}";
        // var index = indice;
        json = {idProducto : compra.idProducto,nombre:compra.nombre,cantidad:compra.cantidad,precio:compra.precio};
        //json = '{"index"'+indice':['id }';
        //listaDeCompras.push({json});
                    
        console.log(compra.idProducto + " " + compra.nombre +" "+ compra.cantidad);
        carrito.push(json);  
        console.log(carrito);
        var i;
                    
        var divTable = document.getElementById("divTableProductos");
        console.log(divTable.id);
        divTable.style.visibility='visible'
        // var table = document.createElement("TABLE");
        //table.setAttribute("id", "tableProducto");
        //var divTable = document.getElementById("divTableProductos");
        //divTable.appendChild(table);
                
        table = document.getElementById("tableProducto");
        row = table.insertRow(1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell1.innerHTML = compra.idProducto;
        cell2.innerHTML = compra.nombre;
        cell3.innerHTML = compra.cantidad;
        var precio = parseFloat(compra.precio) * parseInt(compra.cantidad);
        cell4.innerHTML = precio;
        if(parseInt(compra.idProducto) > 0 && parseInt(compra.idProducto) < 9){
                    
            bebida= true;
            totalBebidas = totalBebidas + parseFloat(precio);
            console.log("bebida = " + bebida);
        }  
        if(parseInt(compra.idProducto)>8 && parseInt(compra.idProducto)<12){
            alimento = true;
            console.log("alimento = " + alimento);
        }
        if(compra.idProducto == "12"){
            papas= true;
            console.log("papas = " + papas);
        }
        cant  = document.getElementById("cantidad").value;
                 
                    
        total = total + parseFloat(precio);
        totalPagar = document.getElementById("total");
        totalPagar.innerHTML = "<h3>Total a pagar $"+total+"</h3>";
        //creando al boton termnarcompra cuando se agrega un articulo almenos
        var botonTerminar = document.getElementById("btTerminarPago");
        if( botonTerminar == null){
            var btAddProd = document.createElement("INPUT");
            btAddProd.setAttribute("type","submit");
            btAddProd.setAttribute("id","btTerminarPago");
            btAddProd.setAttribute("value","Terminar compra");
            btAddProd.setAttribute("onclick", "terminarCompra()");
            var terminar = document.getElementById("terminar");
            terminar.appendChild(btAddProd);
        }
    }else {
        alert("Por favor ingrese por lo menos un producto");
    }
                
}
            
function terminarCompra(){
                
    if(bebida && papas && alimento){
        total = total - totalBebidas;
        var descuento = (totalBebidas*30)/100;
        var bebidasSubTotal = totalBebidas - descuento;
        var subTotal = total + bebidasSubTotal;
        total = subTotal;
        totalPagar.innerHTML = "<h3>Descuento por paquete aplicado<br>Total a pagar$"+subTotal+"</h3>";
                    
    }   
    document.getElementById("btAddProd").disabled = true;
    document.getElementById("cantidad").disabled = true;
    document.getElementById("btTerminarPago").disabled = true;
    document.getElementById("pagoCon").disabled = false;
    document.getElementById("aceptarPago").disabled = false;
    document.getElementById("productList").disabled=true;
}
            
function aceptarPago(){
                      
    var  pago = document.getElementById("pagoCon").value;
    console.log("pago:" + pago);
    if(pago < total){
        alert("El pago no es suficiente");   
    }else{
        console.log("pago con :" + pago);
        document.getElementById("cambio").innerHTML = "<h4>Devuelva al cliente $"+((parseFloat(pago) - total)).toFixed(2)+"</h4>"; 
        var aceptarPago = document.getElementById("aceptarPago");
        aceptarPago.disabled = true;
        registrarCompra();
        //se agrega un boton para efectuar una nueva compra
        ///var nuevaCompra = document.createElement("BUTTON");                        
        //nuevaCompra.setAttribute("id","btcompranueva");
        //nuevaCompra.setAttribute("onclick", "reload()");
                        
        //var div = document.getElementById("nuevaCompra");
        //div.appendChild(nuevaCompra);
                        
        //nuevaCompra = document.getElementById("btcompranueva");
        //var t = document.createTextNode("Realizar otra venta");
        //nuevaCompra.appendChild(t);
                        
    }
             
}
function terminarCompra(){
    var divTable = document.getElementById("pagoConBillete");
    divTable.style.visibility='visible';
    if(bebida && papas && alimento){
        total = total - totalBebidas;
        var descuento = (totalBebidas*30)/100;
        var bebidasSubTotal = totalBebidas - descuento;
        var subTotal = total + bebidasSubTotal;
        total = subTotal;
        totalPagar.innerHTML = "<h3>Descuento por paquete aplicado<br>Total a pagar$"+subTotal+"</h3>";
                    
    }   
    document.getElementById("btAddProd").disabled = true;
    document.getElementById("cantidad").disabled = true;
    document.getElementById("btTerminarPago").disabled = true;
    document.getElementById("pagoCon").disabled = false;
    document.getElementById("aceptarPago").disabled = false;
}
function registrarCompra(){
    var selectBox = document.getElementById("clienteList");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
                
    compras = JSON.stringify(carrito)
                
    console.log("carrito: " + compras);
    
    $.ajax({
        url: "../logica/Main.php",
        type: "POST",
                    
        data:{ option: "registrarPedido",datos:{compra:compras,noCliente:idCliente}}
    }).done(function(respu){
        console.log("respu: "+respu);
        if(respu.toString() == "succes"){
            //$("<div title='AVISO'>Pedido registrado exitosamente</div>").dialog();
            var divTable = document.getElementById("dialog-message");
            var cambio = document.getElementById("cambio");
            var cambioInfo = document.getElementById("cambioInfo");
            cambioInfo.appendChild(cambio);
            divTable.style.visibility='visible';
            $( "#dialog-message" ).dialog({
                modal: true,
                buttons: {
                    Ok: function() {
                                        
                        $( this ).dialog( "close" );
                        reload();
                    }
                }
            });
                        
                        
        }else {
            $("<div title='AVISO'>"+respu+"</div>").dialog();
        }
        console.log("Respuesta de registrar Producto "+ respu.toString());                   
    });
}
function reload(){
    location.reload();
}
