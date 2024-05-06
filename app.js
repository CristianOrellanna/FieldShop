const express = require('express');
const app = express();
const port = process.env.PORT ?? 5000;

//urlencoded para capturar datos del formulario
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//asignacion del puerto, const "server" para exportar el servidor en lugar de la app, para usar supertest(test)
const server = app.listen(port, (req, res) => {
    console.log('Hola!, el servidor esta corriendo en el puerto:', port);
});
//exportando "server" para usar en testing
module.exports = server; 

//dotenv para variables de entorno
const dotenv = require('dotenv');
dotenv.config({ path: './env/.env' });

//directorio público
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

//configuración como motor de plantillas ejs
app.set('view engine', 'ejs');

//invocando bcryptjs
const bcryptjs = require('bcryptjs');

//session variable
const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

//invocando el módulo de conexión a la base de datos
const connection = require('./database/db');

//Metodos GET -> Login y Register
app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/register', (req, res) => {
    res.render('register');
})

//Metodos POST -> register, auth, index, products, us y contact
/*
*Toma los datos del formulario 'app.get('/register')...', luego hashea la contraseña para almacenarla
*encriptada y de manera segura, busca en la DB el rol que solicita el usuario y si lo encuentra
*se lo asigna, si todo sale bien al insertar el usuario con su rol se le notifica mediante un alert.
*/
app.post('/register', async (req, res) => {
    const user = req.body.user;
    const name = req.body.name;
    const rol = req.body.rol;
    const pass = req.body.pass;
    const sexo = req.body.sexo;
    const region = req.body.region;
    const comuna = req.body.comuna;
    const direccion = req.body.direccion;
    let passwordHash = await bcryptjs.hash(pass, 8);
    // Como primer paso, se debe encontrar el IdRol correspondiente al nombre del rol
    connection.query('SELECT IdRol FROM Roles WHERE RolName = ?', [rol], async (error, results) => {
        if (error) {
            console.log(error);
            res.send('Error al buscar el rol');
        } else if (results.length > 0) {
            let idRol = results[0].IdRol;
            // Insertar el nuevo usuario
            connection.query('INSERT INTO Usuarios SET ?', { user: user, name: name, pass: passwordHash }, async (error, results) => {
                if (error) {
                    console.log(error);
                    res.send('Error al insertar el usuario');
                } else {
                    let idCliente = results.insertId;// Se obtiene el IdCliente del usuario recién insertado
                    // Se asigna el rol al usuario
                    connection.query('INSERT INTO UsuarioRoles SET ?', { IdCliente: idCliente, IdRol: idRol }, async (error, results) => {
                        if (error) {
                            console.log(error);
                            res.send('Error al asignar el rol al usuario');
                        } else {
                            // Insertar el sexo del usuario
                            connection.query('INSERT INTO Sexo_Usuarios SET ?', { IdCliente: idCliente, Sexo: sexo }, async (error, results) => {
                                if (error) {
                                    console.log(error);
                                    res.send('Error al insertar el sexo del usuario');
                                } else {
                                    // Insertar la dirección del usuario
                                    connection.query('INSERT INTO direccion_usuario SET ?', { region: region, IdCliente: idCliente, comuna: comuna, direccion: direccion }, async (error, results) => {
                                        if (error) {
                                            console.log(error);
                                            res.send('Error al insertar la dirección del usuario');
                                        } else {
                                            res.send('<script>alert("Registro realizado con éxito"); window.location = "/";</script>');
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        } else {
            res.send('El rol proporcionado no existe');
        }
    });
});

//Autentica al usuario, comparando tanto el user con la contraseña hasheada almacenada en la DB
app.post('/auth', async (req, res) => {
    const user = req.body.user;
    const pass = req.body.pass;
    if (user && pass) {
        connection.query('SELECT * FROM Usuarios WHERE user = ?', [user], async (error, results) => {
            if (results.length == 0 || !(await bcryptjs.compare(pass, results[0].pass))) {
                res.send('<script>alert("Usuario y/o contraseña incorrectos"); window.location = "login";</script>');
            } else {
                // Se inicia sesion y se guarda en la variable loggedin, ademas se guarda el nombre de usuario en la variable name(req.session.name)
                req.session.loggedin = true;
                req.session.name = results[0].name;
                res.send('<script>alert("Inicio de sesión exitoso"); window.location = "/";</script>');
            }
        });
    } else {
        res.send('<script>alert("Ingrese un usuario y contraseña");</script>');
    }
});

// Autenticación en todas las páginas si el usuario esta registrado y ha iniciado sesion
app.get('/', (req, res) => {
    if (req.session.loggedin) {
        res.render('index', {
            login: true,
            name: req.session.name
        });
    } else {
        res.render('index', {
            login: false,
            name: 'Iniciar sesión'
        });
    }
    res.end();
});

app.get('/products', (req, res) => {
    if (req.session.loggedin) {
        res.render('products', {
            login: true,
            name: req.session.name,
            esAdmin: req.session.name === 'soyadmin'
        });
    } else {
        res.render('products', {
            login: false,
            name: 'Iniciar sesión',
            esAdmin: false
        });
    }
    res.end();
});


app.get('/us', (req, res) => {
    if (req.session.loggedin) {
        res.render('us', {
            login: true,
            name: req.session.name
        });
    } else {
        res.render('us', {
            login: false,
            name: 'Iniciar sesión'
        });
    }
    res.end();
})

app.get('/contact', (req, res) => {
    if (req.session.loggedin) {
        res.render('contact', {
            login: true,
            name: req.session.name
        });
    } else {
        res.render('contact', {
            login: false,
            name: 'Iniciar sesión'
        });
    }
    res.end();
})

//Borra la caché después de cerrar sesión
app.use(function (req, res, next) {
    if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});

//Al llamar esta ruta se cierra la sesion del usuario
app.get('/logout', function (req, res) {
    req.session.destroy(() => {
        res.send('<script>alert("Sesion cerrada"); window.location = "/";</script>');
    })
});