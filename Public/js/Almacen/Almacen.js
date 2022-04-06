 function RutaAlmacen( ) {
    window.location.href = "/Almacen"
    alert("ss")
}

function RutaSocios( ) {
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
              alert("SinProducto "+Producto)
            }
            for (var i = 0; i < Herramientas.length; i++) {
                var Categoria = Herramientas[i].Categoria;
                var Producto = Herramientas[i].Producto;
                var Cantidad = Herramientas[i].Cantidad;
                var Unidades = Herramientas[i].Unidades;
                var StockMin = Herramientas[i].StockMin;
                var StockMax = Herramientas[i].StockMax;
                //Eliminar variable dentro del For
                Arreglo = [Categoria, Producto, Cantidad, Unidades, StockMin,StockMax]
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

    document.getElementById("Categoria").value = Categoria 
}

//=========================================== EVENTO SOLO DATOS NUMERICOS EN CANTIDAD =================================================//
 