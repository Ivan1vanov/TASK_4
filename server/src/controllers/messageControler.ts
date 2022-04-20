import {Request, Response} from 'express'
import { IMessageInputData, Message } from '../models/messageModel';
import { UserName } from '../models/nameModel';



class MessageControllers {


    async createMessage(req: Request, res: Response) {
        const data: IMessageInputData = req.body
        try {
            
            if(!data.receiver || !data.sender || !data.text || !data.title) {
                res.status(500).send({
                    message: 'All fields are requeired!'
                })
            } else {
                const isNameExists = await UserName.findOne({name: data.receiver})

                if(!isNameExists) {
                    const newName = await UserName.create({name: data.receiver})
                    await newName.save()
                }
    
                const newMessage = await Message.create({
                    sender: data.sender,
                    receiver: data.receiver,
                    title: data.title,
                    text: data.text,
                })
    
                await newMessage.save()
    
                res.status(200).send({
                    newMessage
                })
            }
            
        } catch (error) {
            console.log(error)
        }
    }


    async getAllReceivers(req: Request, res: Response) {
        try {
            const receivers = await UserName.find()

            res.status(200).send({
                receivers: receivers
            })
        } catch (error) {
            console.log(error)
        }
    }

    async getUserMessages(req: Request, res: Response) {
            const {nameOfUser} = req.params

            try {
                
                const currentUserMessages =  await Message.find({
                    receiver: nameOfUser
                }).sort({_id: -1})

                res.status(200).send({
                    messages: currentUserMessages
                })

            } catch (error) {
                console.log(error)
            }
    }


    async sendedMessage(req: Request, res: Response) {
        const {nameOfSender} = req.params
        try {
                
            const currentUserMessages =  await Message.find({
                sender: nameOfSender
            }).sort({_id: -1})

            res.status(200).send({
                messages: currentUserMessages
            })

        } catch (error) {
            console.log(error)
        }
    }

}

export default new MessageControllers()