//Como generamos el type module en el package json, debemos importar de otra manera: antes ===> import { Express } from "express"; ===> ahora ===>
import  express  from "express";
//Debemos importar el cookieParser ya que express no lee cookies por defecto
//Para poder ver las res obtenidas en consola
import morgan from "morgan";
import cookieParser from "cookie-parser";
//Fix para __dirname (como desplegamos type : module tenemos que generar estas tres lineas para importar archivos a este archivo)
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
//Importación de la autenticación
import { methods as authentication } from "./controllers/authentication.controller.js";
import { methods as authorization } from "./middlewares/authorization.js";
// Importar Bootstrap CSS


/*====PARA EJECUTAR EL NODEMON ESCRIBIMOS EN LA CONSOLA npm run dev====*/

//Server
const app = express();
app.set("port", 3000);
app.listen(app.get("port"));
console.log(`Servidor corriendo en puerto`, app.get("port"));

//Configuración archivos estáticos
app.use(express.static(__dirname + "/public"));//Para importar archivos de public
app.use(express.json());//Para ver la solicitud que mandamos en formato JSON
app.use(cookieParser()); //Para mostrar las cookies con express
app.use(morgan("dev"));//Para mostrar las res en consola


//Routing
app.get("/", authorization.soloPublico, (req, res) => res.sendFile(__dirname + "/pages/login.html"));
app.get("/register", authorization.soloPublico, (req, res) => res.sendFile(__dirname + "/pages/register.html"));
app.get("/admin", authorization.soloAdmin, (req, res) => res.sendFile(__dirname + "/pages/admin/admin.html"));
app.get("/homepage", (req, res) => res.sendFile(__dirname + "/pages/homepage.html"))
app.post("/api/login", authentication.login);
app.post("/api/register", authentication.register);



