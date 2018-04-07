import {fields} from '../api/MockData';

import {
  SET_NAME,
  PICK_FIELD,
  SET_FIELDS,
  CLEAR_PLAYER_DATA,
  SAVE_THROW, SAVE_AREA_FILTERS, DELETE_PLAYER,
	LOG_IN, LOG_OUT
} from "./Actions";
import clone from "ramda/es/clone";

const initialState = {
  fields: fields,
  playerData: {},
  selectedField: 1,
  areaFilters: [],
	userLoggedIn: true,
	user: {}
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NAME:
      return {
        ...state,
        playerData: {...state.playerData, [action.id]: [action.name, []]}
      };
    case PICK_FIELD:
      let newPlayerData = state.playerData;
      Object.keys(newPlayerData).map((player) => {
        newPlayerData[player] = [newPlayerData[player][0], new Array(action.field.numberOfTracks).fill(0)]
      });
      return {
        ...state,
        selectedField: action.field.fieldID,
        playerData: newPlayerData
      };
    case SET_FIELDS:
      return {
        ...state,
        fields: action.fields
      };
    case CLEAR_PLAYER_DATA:
      return {
        ...state,
        playerData: {}
      };
    case SAVE_THROW:
      let newPlayerDataDumb = state.playerData;
      newPlayerDataDumb[action.player][1][action.index - 1] = action.throws;
      return {
        ...state,
        playerData: newPlayerDataDumb
      };
    case SAVE_AREA_FILTERS:
      return {
        ...state,
        areaFilters: action.filters
      };
    case DELETE_PLAYER:
      let players = clone(state.playerData);
      const name = action.player;
      delete players[name];
      return {
        ...state,
        playerData: players
      };
		case LOG_IN:
			return {
				...state,
				userLoggedIn: true,
				user: action.payload.user
			};
		case LOG_OUT:
			return {
				...state,
				userLoggedIn: false,
				user: {}
			}
    default:
      return state;

  }
};

export default AppReducer;
