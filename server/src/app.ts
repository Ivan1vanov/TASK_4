import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import * as dotenv from 'dotenv'
import config from 'config'
import { messageRoutes } from './routes/routes';

import {createServer} from 'http'
import { Socket, Server } from 'socket.io'

const app = express()

dotenv.config({path: __dirname+'/.env'})

const httpServer = createServer(app)

const io = new Server(httpServer, {
    cors: {
        origin: '*',
        credentials: true
    }
})

app.use(cors({origin: '*'}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
 
const PORT: number | string = process.env.PORT || 5000

app.get('/', (_, res) => res.send('hello with sokest'))


let users: any = [];
  
const addUser = (userName: string, socketId: string) => {
  !users.some((user: any) => user === userName) &&
    users.push({ userName, socketId });
};

const removeUser = (socketId: string) => {
  users = users.filter((user: any) => user.socketId !== socketId);
};

const getUser = (userId: string) => {
  return users.find((user: any) => user.userId === userId);
};

   
const EVENTS = {
    connection:'connection',
    disconnection: 'disconnect',
    SEND_MESSAGE: 'send-message',
    ADD_USER: 'addUser',
    GET_MESSAGE: 'get-message'
}
    io.on(EVENTS.connection, (socket: Socket) => { 
        console.log(`User connected ${socket.id}`)

        socket.on(EVENTS.ADD_USER, (userName) => {
            addUser(userName, socket.id);
            io.emit("getUsers", users);
          console.log(users)
          });  

        socket.on(EVENTS.SEND_MESSAGE, (data) => {
            socket.emit('send-message', data)
            console.log(data)
            const user = users.find((user: any) => user.userName === data.receiver);

            if(user) {
                socket.to(user.socketId).emit(EVENTS.GET_MESSAGE, data)
            }
        })

        socket.on(EVENTS.disconnection, () => {
            console.log('userdisconnected')
            removeUser(socket.id);
        })
    })




mongoose.connect(config.get<string>('dbUrl')).then(() => {
    httpServer.listen(PORT, () => {
        console.log(`server started on http://localhost:${PORT}`)
        messageRoutes(app)
    })
}).catch((e) => console.log(e))

