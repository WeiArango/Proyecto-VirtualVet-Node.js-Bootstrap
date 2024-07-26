import bcryptjs from "bcryptjs"; //Librería para encriptar los passwords
import JsonWebTokenError from "jsonwebtoken";//Librerías para generar pass (tokens) que el usuario nos va a proporcionar y poder verificar veracidad de información y además autorizar uso de datos, etc
import dotenv from "dotenv"; //Librería que nos ayuda a crear variables de entorno, osea un lugar para poner claves que no deberían publicarse nunca o no deberían estar a la vista del usuario final. Vamos a crear un archivo con el nombre .env en la carpeta raíz para poder crear este tipo de claves (Importante nunca compartir ese tipo de claves e ingresarla al archivo .gitignore junto)
dotenv.config();

//Para verificar que no hayan usuarios iguales (vamos a crear un usuario de ejemplo)
export const usuarios = [{
    name: 'u', //password "u"
    email: 'u@u.com',
    phone: '1234',
    adress: '134',
    password: '$2a$05$XgbveB7kZFXALBJGSVTATuHRdZgZbmp2Gz8aK4/CJDcQBWTMPu0gO'
}]

/*Archivo Controlador de la autenticación*/
async function login(req, res) { 
    console.log(req.body);
    const name = req.body.name;
    const password = req.body.password;
    if (!name || !password) {
        return res.status(400).send({status:"Error", message: "Por favor digite todos los campos"})
    }
    //Para verificar que el usuario ingresado si exista
    const usuarioValidar = usuarios.find(usuario => usuario.name === name);
    if(!usuarioValidar) {
        return res.status(400).send({status:"Error", message: "Error durante login"})
    }
    //Para contrastar la contraseña ingresada con la contraseña almacenada
    const loginCorrecto = await bcryptjs.compare(password, usuarioValidar.password);
    console.log(loginCorrecto)
    //Acá vamos a generar los tokens cuando el login no sea correcto
    if(!loginCorrecto) {
        return res.status(400).send({status:"Error", message: "Error durante login"})
    }
    const token = JsonWebTokenError.sign(
    {name:usuarioValidar.name}, 
    process.env.JWT_SECRET, 
    {expiresIn:process.env.JWT_EXPIRATION});

    //Vamos a crear una cookie para almacenar el token y que tenga un tiempo de expiración
    const cookieOption = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
        path: "/"
    }
    //Vamos a enviar el token al usuario
    res.cookie("jwt",token,cookieOption);
    res.send({status: "ok", message: "Usuario loggeado", redirect: "/admin"})
}

async function register (req, res) {
    console.log(req.body);
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const adress = req.body.adress;
    const password = req.body.password;
    if (!name || !email || !phone || !adress || !password) {
        return res.status(400).send({status:"Error", message: "Por favor digite todos los campos"});        
    }
    //Para verificar que el usuario ingresado no exista en la base de datos
    const usuarioValidar = usuarios.find(usuario => usuario.name === name);
    if (usuarioValidar) {
        return res.status(400).send({status: "Error", message: "Este usuario ya existe"});
    }
    //Para encryptar los passwords
    const salt = await bcryptjs.genSalt(5);
    const hashPasswords = await bcryptjs.hash(password, salt);
    const nuevoUsuario = {
        name,
        email,
        phone,
        adress,
        password: hashPasswords
    }
    console.log(nuevoUsuario),
    usuarios.push(nuevoUsuario);
    return res.status(201).send({status: "ok", message: `Usuario ${nuevoUsuario.name} creado exitosamente`,redirect:"/"})
}

export const methods = {
    login, 
    register
}