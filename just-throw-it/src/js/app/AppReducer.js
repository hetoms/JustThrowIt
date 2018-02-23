import {fields} from '../api/MockData';

import {
  SET_NAME,
  PICK_FIELD,
  SET_FIELDS
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
      case SET_FIELDS:
        return {
          ...state,
          fields: action.fields
        };
        default:
            return state;

    }
};

export default AppReducer;