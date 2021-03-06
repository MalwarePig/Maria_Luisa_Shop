const express = require('express'); //guardar express en una variable de servidor
const router = express.Router(); //usar modulo de router de ex´press
const UserController = require('../controllers/UserController');
const SociosController = require('../controllers/SociosController');
const AlmacenController = require('../Controllers/AlmacenController');
/////////////////////////////////////////////////////////////////////////// USUARIOS /////////////////////////////////////////////////////////////////////////////////
//Acceder a login
var reinicio = router.get('/', (req, res) => {
	//res.send('holoo');
	req.session.loggedin = true;
	res.render('index.html');
});

//Iniciar logueo
router.post('/Login', UserController.login);
 
//Acceder formulario Registrar usuario

//Iniciar logueo
router.get('/Signup',  UserController.SignUp);
 
//Registrar usuario en db
router.post('/AddUser', UserController.save);

//Eliminar usuario en db
router.post('/EliminarUsuario', UserController.EliminarUsuario);

router.get('/LogueoActivo', (req, res) => {
	//res.send('holoo');
	console.log(req.session.area)
	res.json(req.session.area);
});

/////////////////////////////////////////////////////////////////////////// Socios ///////////////////////////////////////////////////////////////////////////////
//Crear Socios
router.post('/RegistrarSocio', SociosController.RegistrarSocio);
//Cargar Socios
router.get('/CargarSocios', SociosController.CargarSocios);
//Actualizar Socios
router.post('/ActualizarCliente', SociosController.ActualizarCliente);
 
router.get('/Almacen', (req, res) => {
	//res.send('holoo');
	req.session.loggedin = true;
	res.render('Almacen/whSalidas.html');
});





 router.get('/Socios', (req, res) => {
	//res.send('holoo');
	req.session.loggedin = true;
	res.render('Almacen/Socios/Socios.html');
});


//Lee las tareas del proyecto
router.get('/BuscarProductos/:param', AlmacenController.GetProductos);
router.post('/GuardarNota', AlmacenController.GuardarNota);


module.exports = router;

/*ESTA ES UNA VERSION DIRECTA SIN VERIFICAR LOGIN
router.get('/home', (req, res) => {
    //res.send('holoo');
    res.render('index.html',{title: 'Gemak'});
});*/

/*router.get('/Maquinas', (req, res) => {
    res.render('Maquinas.html',{title: 'Maquinas'});
});*/

/*
//rutas
app.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname,'/views/index.html'));//Obtiene ruta de este archiv Js + ruta del archivo a mostrar
    //console.log(__dirname);//Muestra ruta generica de archivo que lo ejecuta
    //console.log(path.join(__dirname,'views/index.html'));
    res.render('index',{title: 'Gemak'});
});
*/