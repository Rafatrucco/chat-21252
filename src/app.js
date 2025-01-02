import express from "express"
import handlebars from "express-handlebars"
import __dirname from "./utils.js"
import viewsRouter from './routes/views.router.js'
import { Server } from "socket.io"


const app = express()
const PORT = 8080


// MIDDLEWARE 
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Configurar handlebars para leer el contenido de los endpoints.

app.engine('handlebars',handlebars.engine())
app.set('views',__dirname + '/views')   // TODO
app.set('view engine', 'handlebars')   
app.use(express.static(__dirname + '/public')) 

app.use('/',viewsRouter)


const httpServer = app.listen(8080, ()=>console.log(`Server running on port ${PORT}`))

const socketServer = new Server(httpServer)

let messages = []


socketServer.on('connection',socketServer=>{
    console.log("Nuevo ciente conectado")

    socketServer.on("message", data=>{
        messages.push(data)
        socketServer.emit("messageLogs",messages)
    })
   
})