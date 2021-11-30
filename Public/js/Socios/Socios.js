/*============================================== Registrar Cliente ===============================================*/
function RegistrarSocio() {
    let dataCliente = {
        Nombre: document.getElementById("new_Nombre").value,
        Direccion: document.getElementById("new_Direccion").value,
        Telefono: document.getElementById("new_Telefono").value,
        Referencia: document.getElementById("new_Referencia").value,
        Usuario: document.getElementById("new_Usuario").value,
        Contraseña: document.getElementById("new_Contraseña").value
    }
    console.info(dataCliente)
    $.post("/RegistrarSocio", // inicia la lista de ot en el flujo de produccion
        {
            dataCliente
        }, // data to be submit
        function (objeto, estatus) { // success callback
            //console.log("objeto: " + objeto + "Estatus: " + estatus);
            CargarClientes()
            if (objeto == true) {
                CargarSocios();
                $('#FormularioCliente')[0].reset();
            } else {
                $('#FormularioCliente')[0].reset();
                alert("Erro en registro");
            }
        });
}

/*============================================== Cargar Clientes ===============================================*/
function CargarSocios() {
    $.ajax({
        url: '/CargarSocios',
        success: function (data) {
            console.log(data[0])
            $("#CuerpoClientes tr").remove();
            let TotalRegistros = data.length;
            var Tabla = document.getElementById('TablaClientes').getElementsByTagName('tbody')[0];
            for (let index = 0; index < TotalRegistros; index++) {
                let id = data[index].idLogin;
                let Nombre = data[index].Name || '-';
                let Dirección = data[index].addres;
                let Telefono = data[index].phone;
                let Referencia = data[index].typeCard;
                let username = data[index].username;
                let pass = data[index].pass;

                let Arreglo = [id, Nombre, Dirección, Telefono,Referencia, username, pass];
                // inserta una fila al final de la tabla
                var newRow = Tabla.insertRow(Tabla.rows.length);
                for (var x = 0; x < (Arreglo.length + 1); x++) {

                    // inserta una celda en el indice 0
                    var newCell = newRow.insertCell(x);
                    newRow.setAttribute("id", "ncRows" + index); //se asigna id al incrementar cada fila +1 para contar el encabezado
                    if (x == 0) { //Ingresar el id
                        newCell.innerHTML = '<input required type="text" id="ncId' + index + '" class="form-control" value="' + Arreglo[x] + '" readonly style="display: none"></input>';
                    } else if (x == 5) { //Ingresar el id
                        newCell.innerHTML = '<input required type="text" id="ncUser' + index + '" class="form-control" value="' + Arreglo[x] + '" readonly style="display: none"></input>';
                    } else if (x == 6) { //Ingresar el id
                        newCell.innerHTML = '<input required type="text" id="ncPass' + index + '" class="form-control" value="' + Arreglo[x] + '" readonly style="display: none"></input>';
                    }
                    else if (x == 7) { //Si termina de registrar datos crear el boton
                        var newCell = newRow.insertCell(7); //CREAR CELDA
                        newCell.innerHTML = '<button id="' + index + '" class="btn btn-dark" name="btn" data-bs-toggle="modal" href="#modEditarCliente" onclick=EditarCliente(' + (index) + ')> <i class="fas fa-edit"></i> </button>'
                            + '<button id="EliminarTi' + index + '" class="btn btn-danger" name="btn" onclick=EliminarTrabajoIn(' + (index) + ')><i class="fas fa-minus-square"></i></button>';
                    } else {
                        var newText = document.createTextNode(Arreglo[x]);
                        newCell.appendChild(newText);
                    }
                } //fin de for de columnas
            } //document.getElementById("TotalMuerto").value = (data[0].TMUno + data[0].TMDos + data[0].TMTres);
        } //Funcion success
    }); //Ajax 
}

/*============================================== Editar Clientes ===============================================*/
function EditarCliente(variable) {
    Registro = document.getElementById("TablaClientes");

    let id = document.getElementById("ncId" + (variable)).value; //Obtiene el valor de Producto
    document.getElementById("editId").value = id;
    let user = document.getElementById("ncUser" + (variable)).value; //Obtiene el valor de Producto
    document.getElementById("editUsuario").value = user;
    let pass = document.getElementById("ncPass" + (variable)).value; //Obtiene el valor de Producto
    document.getElementById("editContraseña").value = pass;
    let Nombre = Registro.rows[(variable + 1)].cells[1].childNodes[0].nodeValue; //Obtiene el valor de Producto
    document.getElementById("editNombre").value = Nombre;
    var Dirección = Registro.rows[(variable + 1)].cells[2].childNodes[0].nodeValue; //Obtiene el valor de Producto
    document.getElementById("editDireccion").value = Dirección;

    var Telefono = Registro.rows[(variable + 1)].cells[3].childNodes[0].nodeValue; //Obtiene el valor de Producto
    document.getElementById("editTelefono").value = Telefono;

    var Membresia = Registro.rows[(variable + 1)].cells[4].childNodes[0].nodeValue; //Obtiene el valor de Producto
    document.getElementById("editMembresia").value = Membresia;

    console.log(id, user, pass, Nombre, Dirección, Telefono, Membresia);
}

/*============================================== Editar Clientes ===============================================*/
function ActualizarCliente() {
    let dataCliente = {
        Nombre: document.getElementById("editNombre").value,
        Direccion: document.getElementById("editDireccion").value,
        Telefono: document.getElementById("editTelefono").value,
        Referencia: document.getElementById("editReferencia").value,
        user: document.getElementById("editUsuario").value,
        pass: document.getElementById("editContraseña").value,
        idLogin: document.getElementById("editId").value
    }

    $.post("/ActualizarCliente", // inicia la lista de ot en el flujo de produccion
        {
            dataCliente
        }, // data to be submit
        function (objeto, estatus) { // success callback
            //console.log("objeto: " + objeto + "Estatus: " + estatus);
            CargarClientes()
            if (objeto == true) {
                CargarClientes();
                $('#FormularioCliente')[0].reset();
            } else {
                $('#FormularioCliente')[0].reset();
                alert("Erro en registro");
            }
        });
}























