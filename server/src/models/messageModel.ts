import mongoose from "mongoose";



export interface IMessageInputData {
    sender: string,
    receiver: string,
    title: string,
    text: string
}

export interface IMessage extends IMessageInputData, mongoose.Document {
    createdAt: Date,
    updatedAt: Date,
    _id: mongoose.ObjectId
}

const messageSchema: mongoose.Schema = new mongoose.Schema({
    sender: {type: String, required: true},
    receiver: {type: String, required: true},
    title: {type: String, required: true},
    text: {type: String, required: true},
}, {
    timestamps: true
})

export const Message = mongoose.model('Email', messageSchema)