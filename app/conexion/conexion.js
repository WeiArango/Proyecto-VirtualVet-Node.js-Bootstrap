//Instalamos mysql desde el terminal (npm install mysql)
//let mysql = require("mysql");
import mysql from "mysql";

let conexion = mysql.createConnection({
    host: "localhost",
    database: "db_virtualvet",
    user: "root",
    password: ""
});

conexion.connect(function(err) {
    if(err) {
        throw err;
    } else {
        console.log("Conexión exitosa");
    }
});

//Para realizar nuevos registros a la tabla usuario (Create)
/*const nuevoRegistro = "INSERT INTO `usuario` (id_usuario, name, email,  phone, adress, password) VALUES (NULL, 'wei.bedoya@outlook.com', 'wei Bedoya', '3245698545', 'Cra 45 # 09-09', '1234')"; 
conexion.query(nuevoRegistro, function(error, rows) {
    if(error) {
        throw error;
    } else {
        console.log("Datos insertados correctamente")
    }
});*/

//Para leer los registros de una tabla (Read)
const usuario = "SELECT * FROM `usuario`";

//Creamos un método que realiza la acción y una función para verificar si hay error o si no para mostrar los resultados
conexion.query(usuario, function(error, lista) {
    if(error) {
        throw error;
    } else {        
        console.log(lista); 
        console.log("Hay en total", lista.length, "usuarios registrados");       
    }
})

//Para actualizar registros de una tabla (Update)
/*const modificar = "UPDATE `usuario` SET `password` = 'wei1234' WHERE `usuario`.`id_usuario` = 1;"
conexion.query(modificar, function(error, lista) {
    if(error) {
        throw error;
    } else {
        console.log("Registro modificado correctamente");
    }
})

conexion.end();*/

//Para eliminar registros de una tabla (delete)
/*const eliminar = "DELETE FROM usuario WHERE `usuario`.`id_usuario` = 2";
conexion.query(eliminar, function(error, lista) {
    if(error) {
        throw error;
    } else {
        console.log("Registro eliminado exitosamente");
    }
})*/

conexion.end();