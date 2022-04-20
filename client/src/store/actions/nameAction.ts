import {Dispatch} from 'redux'
import * as api from '../../api/apis'
import { NameActionConstants } from '../types/actionTypes';



export const getNameAction = () => async (dispatch: Dispatch) => {
    try {
        const {data} = await api.getNamesAPI()
        dispatch({type: NameActionConstants.GET_NAMES, payload: data.receivers})
    } catch (error) { 
        console.log(error)
    }
}