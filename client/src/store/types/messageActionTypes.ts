


export enum ActionMessageEnums {
    GET_RECEIVER_MESSAGES = 'GET_RECEIVER_MESSAGES',
    GET_SENDED_MESSAGES = 'GET_SENDED_MESSAGES',
    CREATE_MESSAGE = 'CREATE_MESSAGE',
    LOADING = 'LOADING'
}

export interface IMessageInputData {
    sender: string,
    receiver: string,
    title: string,
    text: string
}

export interface IMessageResponse extends IMessageInputData {
    createdAt: Date,
    updatedAt: Date,
    _id: string
}

interface Get_Receiver_Messages {
    type: ActionMessageEnums.GET_RECEIVER_MESSAGES,
    payload: IMessageResponse[]
}

interface Create_Message {
    type: ActionMessageEnums.CREATE_MESSAGE,
    payload: IMessageResponse
}


interface Get_Sended_Messages {
    type: ActionMessageEnums.GET_SENDED_MESSAGES,
    payload: IMessageResponse[]
}

interface Loading_Message {
    type: ActionMessageEnums.LOADING
}

export type MessageActionTypes = Get_Receiver_Messages | Create_Message | Get_Sended_Messages | Loading_Message