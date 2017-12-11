/* 
 * Created by Javier Monroy Salcedo.
 * 
 * Script cliente
 */
window.onload = function(){
    document.clienteinfo.addEventListener("invalid",validacion , true);
    document.clienteinfo.addEventListener("input", controlar ,false);  
    var submit = document.getElementById("send");
    submit.addEventListener("click",enviar,false);
    var divTable = document.getElementById("dialog-message");
    divTable.style.visibility='hidden';
    //document.getElementById("info").style.visibility='hidden';
}
function validacion(e){
    var  elemento=e.target;

    elemento.style.background= '#FFDDDD';
}
function enviar(e){
   
    var  valido=document.clienteinfo.checkValidity ();
    /*
     * Si el fomulario es valido se entrar a aqui 
     */
    if(valido){
        console.log("formulario valido");
        //document.clienteinfo.submit ();
        var nom = document.getElementById("nom").value;
        var aP= document.getElementById("apellidoP").value;
        var aM= document.getElementById("apellidoM").value;
        var ed= document.getElementById("age").value;
        if(document.getElementById("gender1").checked){
            var genero = document.getElementById("gender1").value;
        }
        if(document.getElementById("gender2").checked){
            var genero = document.getElementById("gender2").value;
        }
    
        var tel= document.getElementById("tel").value;
        var correo= document.getElementById("correo").value;
        console.log(nom+aP+aM+ed+genero+tel+correo);
        
        $.ajax({
            url: "../logica/Main.php",
            type: "POST",
            data: { option: "insertCliente", datos: {nombre: nom,apeP:aP,apeM:aM,edad:ed,gender:genero,telefono:tel,mail:correo}}
        }).done(function(respu){
            console.log("respuesta: "+respu);
            if(respu.toString() == "succes"){
                var divTable = document.getElementById("dialog-message");
                divTable.style.visibility='visible';
                
                $( "#dialog-message" ).dialog({
                    modal: true,
                    buttons: {
                        Ok: function() {
                            $("#form")[0].reset();           
                            $( this ).dialog( "close" );
                            reload();
                        }
                    }
                });
                        
                        
            }else {
                $("<div title='AVISO'>"+respu+"</div>").dialog();
            }
        });
    } 
}
function reload(){
    location.reload();
}
function sendData(){
    alert("entro qui");$("#clienteInfo").submit(function(e){
    
        $.ajax({
            url: "../logica/Main.php",
            type: "POST",
            //data: { option: "clientes", datos: "null"}
        }).done(function(respu){
            console.log(respu);
        });
    });
}
function  controlar(e){
    var  elemento=e.target;
    if (elemento.validity.valid) {
        elemento.style.background='#FFFFFF';
    } else {
        elemento.style.background='#FFDDDD';

    }

}

