const Controller = {};
 
Controller.RegistrarSocio = (req, res) => {
    if (req.session.loggedin) {
        req.getConnection((err, conn) => {
            const data = req.body; //TRAE TODO EL OBJETO
 
            let Nombre = Object.values(data)[0].Nombre;
            let Direccion = Object.values(data)[0].Direccion;
            let Telefono = Object.values(data)[0].Telefono;
            let Referencia = Object.values(data)[0].Referencia;
            let Usuario = Object.values(data)[0].Usuario;
            let Contraseña = Object.values(data)[0].Contraseña;
  
            console.log(Nombre,Direccion,Telefono,Referencia)

            conn.query("call newSocio('"+Nombre+"','"+Direccion+"','"+Telefono+"','"+Referencia+"','"+Usuario+"','"+Contraseña+"');", true, (err, rows, fields) => {
                if (err) {
                    console.log('Error al descontar almacen' + err);
                }else{
                    res.json(true)
                }
            });
             
        });
    } else {
        res.render('Admin/Login.html');
    }
};


Controller.CargarSocios = (req, res) => {
    if (req.session.loggedin) {
        //res.send('Metodo Get list');
        req.getConnection((err, conn) => {

            conn.query("call CargarSocio();", true, (err, rows, fields) => {
                if (err) {
                    console.log('Error al descontar almacen' + err);
                }else{
                   /*  console.log(rows[0]) */
                    res.json(rows[0])                
                }
            });
        });
    } else {
        res.render('Admin/Login.html');
    }
};


/////////////////////////////////////////////////////////////////////------- Actualizar Cliente -------/////////////////////////////////////////////////////////////////////
Controller.ActualizarCliente = (req, res) => {
    if (req.session.loggedin) {
        req.getConnection((err, conn) => {
            const data = req.body; //TRAE TODO EL OBJETO
 
            let Nombre = Object.values(data)[0].Nombre;
            let Direccion = Object.values(data)[0].Direccion;
            let Telefono = Object.values(data)[0].Telefono;
            let Referencia = Object.values(data)[0].Referencia; 
            let Usuario = Object.values(data)[0].user;
            let Contraseña = Object.values(data)[0].pass;
            let id = Object.values(data)[0].idLogin;
  
            console.log(Nombre,Direccion,Telefono,Referencia)

            conn.query("call ActualizarCliente('"+Nombre+"','"+Direccion+"','"+Telefono+"','"+Referencia+"','"+Usuario+"','"+Contraseña+"',"+id+");", true, (err, rows, fields) => {
                if (err) {
                    console.log('Error al descontar almacen' + err);
                }else{
                    console.log(fields)
                    //res.json(rows[0])                
                }
            });
        });
    } else {
        res.render('Admin/Login.html');
    }
};


module.exports = Controller;