import {fields} from '../api/MockData';

import {
	SET_NAME,
	RESET_DATA,
	PICK_FIELD,
	SET_FIELDS,
	SAVE_THROWS,
	CLEAR_PLAYER_DATA,
	SAVE_THROW_DUMB
} from "./Actions";

const initialState = {
	fields: fields,
	mainPlayer: "UnknownPlayer",
	playerData: {},
	selectedField: 1
};

const AppReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_NAME:
			return {
				...state,
				// mainPlayer: action.name
				playerData: {...state.playerData, [action.id]: [action.name, []]}
			};
		case RESET_DATA:
			return {
				fields: fields,
				mainPlayer: "UnknownPlayer",
				playerData: {},
				selectedField: 1
			};

		case PICK_FIELD:
			return {
				...state,
				selectedField: action.field.fieldID,
				playerData: new Array(action.field.numberOfTracks).fill(0)
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
			let newPlayerData = [];
			state.playerData.map(track => {
				if(track.trackNumber === action.trackNumber) {
					found = true;
					newPlayerData.push({
						trackNumber: action.trackNumber,
						throws: action.throws
					})
				} else {
					newPlayerData.push(track)
				}
			});
			if (!found) {
				newPlayerData.push({
					trackNumber: action.trackNumber,
					throws: action.throws
				})
			}
			return{
				...state,
				playerData: newPlayerData
			};
		case SAVE_THROW_DUMB:
			let newPlayerDataDumb = state.playerData.slice();
			newPlayerDataDumb[action.index - 1] = action.throws;
			return{
				...state,
				playerData: newPlayerDataDumb
			};
		default:
			return state;

	}
};

export default AppReducer;