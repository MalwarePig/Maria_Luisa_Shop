const Controller = {};

Controller.GetProductos = (req, res) => {
    //res.send('Metodo Get list');
    req.getConnection((err, conn) => {
        const {
            param
        } = req.params;

        let Producto = param.replace('|', '#')
    
        conn.query("select * from almacen WHERE Producto Like '%"+Producto+"%'", (err, data) => {
            if (err) {
                //res.json("Error json: " + err);
                console.log('Error al registrar recepcion ' + err);
            } else {
                //console.log(data);
                res.json(data)
            }
        });
    }); 
};

Controller.GuardarNota = (req, res) => {
    if (req.session.loggedin) {
        req.getConnection((err, conn) => {
            const data = req.body; //TRAE TODO EL OBJETO

            var limite = Object.values(data)[0].length;
            console.log("Limite: " + limite);
            for (var i = 0; i < limite; i++) {
                let Descripcion = Object.values(data)[0][i][0]; //obeter datos de un objeto Folio
                let Cantidad = Object.values(data)[0][i][1]; //obeter datos de un objeto Producto
                let Unidades = Object.values(data)[0][i][2]; //obeter datos de un objeto Entregado 

                conn.query("call DespachoAlmacen('"+Descripcion+"','"+Unidades+"',"+Cantidad+");", true, (err, rows, fields) => {
                    if (err) {
                        console.log('Error al registrar folios' + err);
                    }else{
                        res.json(true);
                    }
                }); 
                console.log("Sali " + i);
            }
        });
    } else {
        res.render('Admin/Login.html');
    }
};


module.exports = Controller;