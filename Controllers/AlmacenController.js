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

module.exports = Controller;