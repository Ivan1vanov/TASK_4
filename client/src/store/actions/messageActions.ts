import * as api from '../../api/apis'
import { IMessageInputData, ActionMessageEnums } from '../types/messageActionTypes';
import { Dispatch } from 'redux';

import * as io from 'socket.io-client'


export const getReceiverMessagesAction = (nameOfUser: string) => async (dispatch: Dispatch) => {
        try {
            dispatch({type: ActionMessageEnums.LOADING})
            const {data} = await api.getReceiverMessagesAPI(nameOfUser)
            dispatch({type: ActionMessageEnums.GET_RECEIVER_MESSAGES, payload: data.messages})
        } catch (error) {   
            console.log(error)
        }
}

export const getsendedMessagesAction = (nameOfUser: string) => async (dispatch: Dispatch) => {
    try {
        dispatch({type: ActionMessageEnums.LOADING})
        const {data} = await api.getSendedMessagesAPI(nameOfUser)
        dispatch({type: ActionMessageEnums.GET_SENDED_MESSAGES, payload: data.messages})
    } catch (error) {   
        console.log(error)
    }
}

export const createMessageAction = async (messageData: IMessageInputData) => {
    try {
        const {data} = await api.createMessageAPI(messageData)
        console.log(data.newMessage)
        // dispatch({type: ActionMessageEnums.GET_SENDED_MESSAGES, payload: data.messages})
        return data.newMessage
    } catch (error) {   
        console.log(error)
    }
}