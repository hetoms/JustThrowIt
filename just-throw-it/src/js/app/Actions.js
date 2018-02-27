export const SET_NAME = 'SET_NAME';
export const PICK_FIELD = 'PICK_FIELD';
export const SET_FIELDS = 'SET_FIELDS';
export const SAVE_THROWS = 'SAVE_THROWS';
export const CLEAR_PLAYER_DATA = 'CLEAR_PLAYER_DATA';
export const SAVE_THROW_DUMB = 'SAVE_THROW_DUMB';

export const setName = (name) => ({
	type: SET_NAME,
	name: name
});

export const pickField = (field) => ({
	type: PICK_FIELD,
	field: field,
});

export const setFields = (payload) => ({
	type: SET_FIELDS,
	fields: payload
});

export const saveThrows = (payload) => ({
	type: SAVE_THROWS,
	trackNumber: payload.trackNumber,
	throws: payload.throws
});

export const clearPlayerData = () => ({
	type: CLEAR_PLAYER_DATA
});

export const saveThrowDumb = (index, throws) => ({
	type: SAVE_THROW_DUMB,
	index,
	throws
});