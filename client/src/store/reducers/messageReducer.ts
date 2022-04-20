import { ActionMessageEnums, MessageActionTypes } from '../types/messageActionTypes';


const initializeState = {
    loading: false,
    messages: []
}

export const messageReducer = (state = initializeState, action: MessageActionTypes) => {
    switch (action.type) {
        case ActionMessageEnums.GET_RECEIVER_MESSAGES:
            return {
                messages: action.payload
            }

        case ActionMessageEnums.GET_SENDED_MESSAGES:
            return {
                messages: action.payload
            }   

        case ActionMessageEnums.LOADING: 
        return {
            loading: true
        }

        default:
            return state
    }
}