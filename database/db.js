const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'bd_fieldshop'
});

connection.connect((error) => {
    if(error){
        console.log('Ouch!, tenemos el siguiente error en la conexion: ' + error);
        return;
    }
    console.log('Tenemos exito en la conexion!!!')
});

module.exports = connection;