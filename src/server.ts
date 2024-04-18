import express from "express";
import { sequelize } from "./Config/db";
import cors, {CorsOptions} from "cors"
import morgan from "morgan"

import Cliente from "./Model/Cliente"; 
import Cenote from "./Model/Cenote";
import Usuario from "./Model/Usuario";
import Token from "./Model/Token";
import ClienteCenote from "./Model/ClienteCenote";

import userRoutes from "./Routes/userRoutes";
import cenoteRoutes from "./Routes/cenoteRoutes";
import clienteRoutes from "./Routes/clienteRoutes";
import clienteCenote from "./Routes/clientecenoteRoutes";

const app = express()

sequelize.addModels([Cliente, Cenote, ClienteCenote, Usuario, Token]); 

app.use(express.json());

const corsOptions : CorsOptions = {
  origin: function(origin, callback){
      const whitelist = [process.env.FRONTEND_URL, process.env.FRONTEND_URL2]

      if(process.argv[2] === '--api'){
          whitelist.push(undefined)
      }
      if(whitelist.includes(origin)){
          callback(null, true)
      }else{
          console.log('Denegar')
      }
  }
}
app.use(cors(corsOptions))

app.use(express.json())

app.use(morgan('dev'))

app.use('/admin', userRoutes)
app.use('/', cenoteRoutes)
app.use('/cliente', clienteRoutes)
app.use('/reserva', clienteCenote)

// Rutas para tu API REST
sequelize.sync({ force: false }) // Cambia a true si quieres que se eliminen y se vuelvan a crear las tablas en cada reinicio
  .then(() => {
    console.log('Base de datos sincronizada');
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });

export default app;
