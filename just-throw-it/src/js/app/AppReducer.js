import {fields} from '../api/MockData';
import {
    SET_NAME
} from "./Actions";

const initialState = {
    fields: fields,
    mainPlayer: "UnknownPlayer",
    playerData: []
};

const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NAME:
            return {
                ...state,
                mainPlayer: action.name
            }
        default:
            return state;

    }
};

export default AppReducer;