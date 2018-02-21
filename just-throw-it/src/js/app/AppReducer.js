import {fields} from '../api/MockData';
import {
  SET_NAME,
  PICK_FIELD
} from "./Actions";

const initialState = {
    fields: fields,
    mainPlayer: "UnknownPlayer",
    playerData: [],
    selectedField: 1
};

const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NAME:
            return {
                ...state,
                mainPlayer: action.name
            };
        case PICK_FIELD:
          return {
            ...state,
            selectedField: action.field
          };
        default:
            return state;

    }
};

export default AppReducer;