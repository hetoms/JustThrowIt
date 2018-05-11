import {fields} from '../api/MockData';

import {
  SET_NAME,
  PICK_FIELD,
  SET_FIELDS,
  CLEAR_PLAYER_DATA,
  SAVE_THROW, SAVE_AREA_FILTERS, DELETE_PLAYER,
  LOG_IN, LOG_OUT, SET_GAME_ONLINE, SET_GAME_OFFLINE
} from "./Actions";
import clone from "ramda/es/clone";

const initialState = {
  fields: fields,
  playerData: {},
  selectedField: 1,
  areaFilters: [],
  userLoggedIn: false,
  user: "",
  isOnlineGame: false,
  isOnlineGameOwner: false,
  lobbyKey: 0,
  onlineGameFinished: false
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
      if (state.userLoggedIn) {
        return {
          ...state,
          playerData: {player0: [state.user, []]}
        };
      } else {
        return {
          ...state,
          playerData: {}
        };
      }

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
        playerData: {player0: [action.payload.user, []]},
        userLoggedIn: true,
        user: action.payload.user
      };
    case LOG_OUT:
      return {
        ...state,
        userLoggedIn: false,
        user: ""
      };
    case SET_GAME_ONLINE:
      return {
        ...state,
        isOnlineGame: action.gameOnline,
        isOnlineGameOwner: action.isOnlineGameOwner,
        playerData: action.gameData,
        lobbyKey: action.lobbyKey,
        selectedField: action.selectedField,
        onlineGameFinished: false
      };
    case SET_GAME_OFFLINE:
      return {
        ...state,
        isOnlineGame: false,
        isOnlineGameOwner: false,
        lobbyKey: initialState.lobbyKey,
        onlineGameFinished: false
      };
    default:
      return state;

  }
};

export default AppReducer;
