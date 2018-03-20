import {fields} from '../api/MockData';

import {
  SET_NAME,
  PICK_FIELD,
  SET_FIELDS,
  SAVE_THROWS,
  CLEAR_PLAYER_DATA,
  SAVE_THROW_DUMB, SAVE_AREA_FILTERS
} from "./Actions";

const initialState = {
	fields: fields,
	mainPlayer: "UnknownPlayer",
	playerData: {},
	selectedField: 1,
	areaFilters: []
};

const AppReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_NAME:
			return {
				...state,
				// mainPlayer: action.name
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
		case SAVE_THROWS:
			let found = false;
			let newPlayerDataAr = [];
			state.playerData.map(track => {
				if(track.trackNumber === action.trackNumber) {
					found = true;
					newPlayerDataAr.push({
						trackNumber: action.trackNumber,
						throws: action.throws
					})
				} else {
					newPlayerDataAr.push(track)
				}
			});
			if (!found) {
				newPlayerDataAr.push({
					trackNumber: action.trackNumber,
					throws: action.throws
				})
			}
			return{
				...state,
				playerData: newPlayerDataAr
			};
		case SAVE_THROW_DUMB:
			let newPlayerDataDumb = state.playerData;
			newPlayerDataDumb[action.player][1][action.index - 1] = action.throws;
			return{
				...state,
				playerData: newPlayerDataDumb
			};
		case SAVE_AREA_FILTERS:
			return {
				...state,
				areaFilters: action.filters
			};
		default:
			return state;

	}
};

export default AppReducer;