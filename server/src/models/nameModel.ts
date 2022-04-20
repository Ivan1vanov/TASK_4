import mongoose from "mongoose";



const userNameSchema = new mongoose.Schema({
    name: {type: String, required: true}
})

export const UserName = mongoose.model('Name', userNameSchema)