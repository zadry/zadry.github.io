
//document.getElementById('boton').addEventListener('onclick', read);

function read(){
  //alert("algo");
  navigator.bluetooth.requestDevice({
  filters: [{
    services: [0x1234, 0x12345678, '99999999-0000-1000-8000-00805f9b34fb']
  }]
})
.then(device => { /* ... */ })
.catch(error => { console.log(error); });
}
