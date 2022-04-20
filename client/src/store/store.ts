import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { nameReducer } from "./reducers/namesReducer";
import { messageReducer } from './reducers/messageReducer';



const reducers = combineReducers({
    names: nameReducer,
    messages: messageReducer
})

export const store = createStore(reducers, compose(applyMiddleware(thunk)))