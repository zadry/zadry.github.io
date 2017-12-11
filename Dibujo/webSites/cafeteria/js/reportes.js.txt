/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

window.onload= function (){
    totalVentas();
    fillTable();
    var verDetalle = document.getElementById("verDetalle");
    verDetalle.addEventListener("click",getPedidoDetalle);               
    clienteNombre = null;
    clienteId = null;  
    contCliente = [];
}
       
function totalVentas(){
                
    $.ajax({
        url: "../logica/Main.php",
        type: "GET",
        //data: { option: "registrarCompra",datos:carrito,noCliente:idCliente }
        //dataType: "json",
        data:{ option: "getTotalVentas",datos:"null"}
    }).done(function(respu){
        console.log("Respuesta Consultas "+ respu);
        var divTotal = document.getElementById("total");
        var fecha = new Date();
        divTotal.innerHTML = "Total de ventas "+fecha.getDay()+"/"
                +fecha.getMonth()+"/"+fecha.getFullYear()+"<br> $"+respu;
    });
}
            
/*
 * implementa una la funcionalidad de dar click en un row de la tabla
 * y devuelve el contenido de dicha tabla 
 * @returns {undefined}
 */
function addRowHandlers() {
    var table = document.getElementById("pedidos");
    var rows = table.getElementsByTagName("tr");
    //var rows = table.getElementsByClassName("rowPedido");
               
    for (i = 0; i < rows.length; i++) {
        var currentRow = table.rows[i];
        var createClickHandler = 
                function(row) {
                    return function() { 
                        var cell = row.getElementsByTagName("td")[0];
                var id = cell.innerHTML;
                alert("id:" + id);
            };
        };

        currentRow.onclick = createClickHandler(currentRow);
    }
}
/*
 * Llena la tabla de pedidos
 */
function fillTable(){
    $.ajax({
        url: "../logica/Main.php",
        type: "GET",
        //data: { option: "registrarCompra",datos:carrito,noCliente:idCliente }
        //dataType: "json",
        data:{ option: "getPedidos",datos:"null"}
    }).done(function(respu){
        console.log(respu);
        respuesta1 = JSON.parse(respu);
        var table = document.getElementById("pedidos");
        var count = Object.keys(respuesta1).length;
        for (var i = 0; i < count; i++) {
            var row =  document.createElement("TR");
            var td  = document.createElement("TD");
            row.appendChild(td);
            table.appendChild(row);
            row.setAttribute("id",respuesta1[i]["idpedido"]);
            mrow = document.getElementById(respuesta1[i]["idpedido"]);
            mrow.name = i;
            //alert(row.id);
            // contCliente = {"idprod": respuesta1[i]["idpedido"],"post" :i};
            //var dato= {idpedido:respuesta1[i]["idpedido"],post:i};
            //contCliente.push(dato);
                        
            var newRow  = document.getElementById(respuesta1[i]["idpedido"]);
            newRow.addEventListener("click",returnID);
            td.innerHTML = respuesta1[i]["idpedido"];
            td  = document.createElement("TD");
            row.appendChild(td);
            td.innerHTML = respuesta1[i]["idcliente"];
            td  = document.createElement("TD");
            row.appendChild(td);
            td.innerHTML = respuesta1[i]["nombre"];
            td  = document.createElement("TD");
            row.appendChild(td);
            td.innerHTML = respuesta1[i]["apellidoP"];
            td  = document.createElement("TD");
            row.appendChild(td);
            td.innerHTML = respuesta1[i]["apellidoM"];
            td  = document.createElement("TD");
            row.appendChild(td);
            td.innerHTML = respuesta1[i]["fecha"];
                       
        }
                
    });
    addRowHandlers();
}
/*
 * esta funcion regresa el id de una celda seleccionada y le cambia
 * el color a azul y le regresa el color a la anterior
 */
var celdaActual = null;
function returnID(){
                  
    if(celdaActual == null){
        celdaActual = document.getElementById(this.id);                   
    }  
                
    celdaActual.style.backgroundColor = "white";
    celdaActual = document.getElementById(this.id);               
    celdaActual.style.backgroundColor = "#00FFFF";
    console.log("ID "+this.id);
                
    console.log("name: "+this.name);
    clienteNombre = respuesta1[this.name]["nombre"] 
            + " " + respuesta1[this.name]["apellidoP"]
            + " " + respuesta1[this.name]["apellidoM"];
    clienteId = respuesta1[this.name]["idcliente"];
    return this.id;
                
                
}
function getPedidoDetalle(){
    console.log("entro a get Pedido detalle");
    console.log("celdaActual="+ celdaActual.id);
    $.ajax({
        url: "../logica/Main.php",
        type: "GET",
        //data: { option: "registrarCompra",datos:carrito,noCliente:idCliente }
        //dataType: "json",
        data:{ option: "getPedidoDetalle",datos:celdaActual.id}
    }).done(function(respu){
        console.log("respue de getPedidodetalle "+respu);
        respuesta = JSON.parse(respu);
        console.log(respuesta);
        var div = document.getElementById("pedidoDet");
        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }
        var count = Object.keys(respuesta).length;
        var titulo = document.getElementById("detalles").innerHTML= "PEDIDO DETALLE ";
        
        var datosCliente = document.getElementById("datosCliente").innerHTML= "ID Cliente: " +clienteId+ "<br>Nombre: "+clienteNombre+"<br>\n\
        Total Compra: $"+ respuesta[count-1];
        var table = document.createElement("TABLE");
        var header = table.insertRow(0);
                   
        var cell1 = header.insertCell(0);
        var cell2 = header.insertCell(1);
        var cell3 = header.insertCell(2);
        var cell4 = header.insertCell(3);
        var cell5 = header.insertCell(3);
        cell1.innerHTML = "ID PEDIDO";
        cell2.innerHTML = "ID PRODUCTO";
        cell3.innerHTML = "NOMBRE PRODUCTO";
                        
        cell4.innerHTML = "CANTIDAD";
        cell5.innerHTML = "TOTAL";
        var myNode = document.getElementById("foo");
                        
        div.appendChild(table);
        table.setAttribute("id", "pedidoDetalle");
        
        for (var i = 0; i < count - 1; i++) {
            var row = table.insertRow(1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(3);
            cell1.innerHTML = respuesta[i]["idPedido"];
            cell2.innerHTML = respuesta[i]["idProducto"];
            cell3.innerHTML = respuesta[i]["nombre"];                
            cell4.innerHTML = respuesta[i]["cantidad"];
            cell5.innerHTML = respuesta[i]["total"];
        }    
                    
    });
}
    

