/* Extension demonstrating a blocking command block */
/* Sayamindu Dasgupta <sayamindu@media.mit.edu>, May 2014 */

new (function() {
	
    var ext = this;
	var str =" ";
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
	//Codigo javierniano
	ext.hello_World =  function(nombre){
		cadena = "Hello World!";
		if(nombre == "javier"){
		console.log("Hello world");
		return cadena;
		}else{
			return "usuario no autorizado";
		}
		
		
	};
	ext.secuencia1 = function(algo){
		if(algo == 3){
			alert("entro al if");
			console.log("bien mi chavo");
			var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});

            saveAs(blob, "hello world.txt");
		}else{
			console.log("mal mi chavo");
		}
	};
	ext.comenzar = function(){
		
		return true;
	};
	ext.arrancar = function(){
		str = str + " Motores encendidos";
		
	};
	ext.frenar = function(){

	str = str + " Motores apagados ";

	};
	ext.estado = function(){
		var estatus;
		
		estatus = str;
		console.log(estatus);
		return str;
	};
	ext.avanzar = function(distancia){
		str = str + " Avanzo "+distancia;
		
	}
	ext.derecha = function(distancia){
		str = str + "Derecha "+distancia +" grados";
		
	}
	ext.izquierda = function(distancia){
		str = str + " Izquierda "+distancia+" grados";
		
	}
	ext.bluetoothConn = function(event){
		
		navigator.bluetooth.requestDevice({
                filters: [{
                 name: 'javvPhon'
               }],
               optionalServices: ['battery_service']
                 })
               .then(device => { /* ... */ })
               .catch(error => { console.log(error); });
		return true;
	}
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
           
			['r','hello world+ %s', 'hello_World','nombre'],
			['w', 'Secuencia 1 %n', 'secuencia1','algo'],
			['h', 'Empezar', 'comenzar'],
			[' ', 'Arrancar motores', 'arrancar'],
			[' ','Frenar motores','frenar'],
			['r', 'Consultar estado','estado'],
			[' ', 'Avanzar %n metros', 'avanzar','distancia'],
			[' ', 'Derecha %n grados', 'derecha','grados'],
			[' ', 'Izquierda %n grados', 'izquierda','grados'],
		        ['e', 'Coneccion BlueTooth', 'bluetoothConn']
			
			
        ]
    };

    // Register the extension
    ScratchExtensions.register('Javier Pruebas', descriptor, ext);
})();
