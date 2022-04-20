import { NameActionConstants, NameActionTypes } from '../types/actionTypes';


const initializeState = {
    names: []
}

export const nameReducer = (state = initializeState, action: NameActionTypes)  => {
    switch (action.type) {
        case NameActionConstants.GET_NAMES:
           return {
               names: action.payload
           }
    
        default:
            return state
    }
}