 function RutaAlmacen() {
     window.location.href = "/Almacen"
     alert("ss")
 }

 function RutaSocios() {
     window.location.href = "/Socios"
     alert("ss")
 }

 //CONSULTAR HERRAMIENTAS -- BOTON BUSCAR    
 function GETPRODUCTS() {
     var Producto = document.getElementById("BProductos").value.replace('#', '|')
     console.log(Producto)
     $.ajax({
         url: '/BuscarProductos/' + Producto,
         success: function (Herramientas) {
             var Arreglo = [];
             //Limpiar tabla 
             var TablaAlmacen = document.getElementById('Herr_Encontradas').getElementsByTagName('tbody')[0];
             var limite = TablaAlmacen.rows.length;
             for (var i = 0; i < limite; i++) {
                 $("#Rows").remove(); //elimina los elementos con id Rows
             }
             if (Herramientas.length == 0) {
                 //  $("#Vacio").modal();
                 alert("SinProducto " + Producto)
             }
             for (var i = 0; i < Herramientas.length; i++) {
                 var Categoria = Herramientas[i].Categoria;
                 var Producto = Herramientas[i].Producto;
                 var Cantidad = Herramientas[i].Cantidad;
                 var Unidades = Herramientas[i].Unidades;
                 var StockMin = Herramientas[i].StockMin;
                 var StockMax = Herramientas[i].StockMax;
                 //Eliminar variable dentro del For
                 Arreglo = [Categoria, Producto, Cantidad, Unidades, StockMin, StockMax]
                 var TablaAlmacen = document.getElementById('Herr_Encontradas').getElementsByTagName('tbody')[0];
                 // inserta una fila al final de la tabla
                 var newRow = TablaAlmacen.insertRow(TablaAlmacen.rows.length);
                 for (var x = 0; x < Arreglo.length; x++) {
                     // inserta una celda en el indice 0
                     var newCell = newRow.insertCell(x);
                     newRow.setAttribute("id", "Rows"); //se asigna id al incrementar cada fila +1 para contar el encabezado
                     // adjuntar el texto al nodo
                     var newText = document.createTextNode(Arreglo[x]);
                     newCell.appendChild(newText);

                     if (x == 5) { //Si termina de registrar datos crear el boton
                         var newCell = newRow.insertCell(6); //CREAR CELDA
                         newCell.innerHTML = '<button id="' + i + '" class="btn btn-dark" name="btn" onclick=Seleccion(' + (i + 1) + ')> Selección </button>';
                     }
                 } //fin de for de columnas
             } //fin de for de filas
         } //Funcion success
     }); //Ajax  
 } //Evento clic

 //Evento buscar con enter
 function runScript(e) {
     if (e.keyCode == 13) {
         GETPRODUCTS();
     }
 }

 //=========================================== EVENTO CLIC SOBRE LA TABLA DE BUSQUEDA PARA SELECCIONAR HERRAMIENTA =================================================//
 function Seleccion(variable) {
     Registro = document.getElementById("Herr_Encontradas");

     var Categoria = Registro.rows[variable].cells[0].childNodes[0].nodeValue; //Obtiene el valor de Clave
     var Producto = Registro.rows[variable].cells[1].childNodes[0].nodeValue; //Obtiene el valor de Producto
     var Cantidad = Registro.rows[variable].cells[2].childNodes[0].nodeValue; //Obtiene el valor de Stock
     var Unidades = Registro.rows[variable].cells[3].childNodes[0].nodeValue; //Obtiene el valor de StockUsado
     var StockMin = Registro.rows[variable].cells[4].childNodes[0].nodeValue; //Obtiene el valor de Ubicacion
     var StockMax = Registro.rows[variable].cells[5].childNodes[0].nodeValue; //Obtiene el valor de Ubicacion

     document.getElementById("Categoria").value = Categoria;
     document.getElementById("Producto").value = Producto;
 }

 //=========================================== EVENTO SOLO DATOS NUMERICOS EN CANTIDAD =================================================//

 //=========================================== EVENTO CLIC SOBRE BOTON EN FORMULARIO PARA CREAR LA NOTA DE SALIDA =================================================//
 function CrearNota() {
     let tabla = document.getElementById("TablaNotaSalida");
     let total = tabla.rows.length //Total de filas

     if (total > 5) {
         alert("No se permiten más articulos")
     } else {
         var Producto = document.getElementById("Producto").value; //Obtiene el valor de Clave
         var Cantidad = document.getElementById("Cantidad").value; //Obtiene el valor de Clave
         var Unidades = document.getElementById("Unidades").value; //Obtiene el valor de Clave

         var Arreglo = [Producto, Cantidad, Unidades];
         console.log(Arreglo)
         console.log(Arreglo.length)
         var Condicion = true; //para campos vacios
         for (var a in Arreglo) { //recorrer arreglo en busca de campos vacios
             console.log(a + "-" + Arreglo[a])
             if (Arreglo[a].length == 0 || Arreglo[a].length == undefined) {
                 Condicion = false; //si algun campo esta vacio cambia a falso
                 alert("Faltan campos por llenar")
             }
         }

         if (Condicion == true) { //si todos los campos estan llenos avanza
             var TablaAlmacen = document.getElementById('TablaNotaSalida').getElementsByTagName('tbody')[0];
             // inserta una fila al final de la tabla
             var newRow = TablaAlmacen.insertRow(TablaAlmacen.rows.length);
             let indice = (TablaAlmacen.rows.length + 1);
             newRow.setAttribute("id", "fila" + indice); //se asigna id al incrementar cada fila +1 para contar el encabezado
             for (var x = 0; x < Arreglo.length; x++) {

                 // inserta una celda en el indice 0
                 var newCell = newRow.insertCell(x);
                 // adjuntar el texto al nodo
                 var newText = document.createTextNode(Arreglo[x]);
                 newCell.appendChild(newText);
                 if (x == 2) { //Si termina de registrar datos crear el boton
                     var newCell = newRow.insertCell(3); //CREAR CELDA onclick="CrearNota()"
                     newCell.innerHTML = '<button id="' + x + '" class="btn btn-danger" name="btn" onclick="EliminarFila(' + indice + ')"> <i class="far fa-minus-square"></i> </button>';
                 }
             }
             //document.getElementById("RegistroSalida").reset();
             document.getElementById("Producto").value = "";
             document.getElementById("Cantidad").value = "";
             
         }
         
     } 
 }

 //=========================================== ELIMINAR FILA DE REGISTRO EN NOTAS =================================================//
function EliminarFila(index) {
    $("#fila" + index).remove();
}

//=========================================== Guardar elementos de la nota =================================================//
function GuardarNota() {
    var tabla = document.getElementById("TablaNotaSalida");
    var total = tabla.rows.length //Total de filas

    var Arreglo = [];

    for (var j = 1; j <= total - 1; j++) { //filas
        //var dato = tabla.rows[j].cells[h].childNodes[0].nodeValue;
        var Descripcion = tabla.rows[j].cells[0].childNodes[0].nodeValue;
        var Cantidad = tabla.rows[j].cells[1].childNodes[0].nodeValue;
        var Unidades = tabla.rows[j].cells[2].childNodes[0].nodeValue; 
        var Tabla = [Descripcion,Cantidad,Unidades];
        Arreglo.push(Tabla);
    } //fin filas

    console.table(Arreglo);
    $.post("/GuardarNota", // url
        {
            Arreglo
        }, // data to be submit
        function (objeto, estatus) { // success callback
            //console.log("objeto: " + objeto + "Estatus: " + estatus);
        });

    //Limpiar tabla 
    var TablaAlmacen = document.getElementById('TablaNotaSalida').getElementsByTagName('tbody')[0];
    var limite = TablaAlmacen.rows.length;
    for (var i = 0; i <= limite; i++) {
        $("#fila" + (i + 1)).remove(); //elimina los elementos con id Rows
    } 
}