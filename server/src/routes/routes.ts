import {Express} from 'express'
import messageControler from '../controllers/messageControler'


export const messageRoutes = (app: Express) => {
    app.post('/api/message', messageControler.createMessage)
    app.get('/api/message/:nameOfUser', messageControler.getUserMessages)
    app.get('/api/message/sended/:nameOfSender', messageControler.sendedMessage)
    app.get('/api/names', messageControler.getAllReceivers)

}