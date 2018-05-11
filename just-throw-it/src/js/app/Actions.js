export const SET_NAME = 'SET_NAME';
export const PICK_FIELD = 'PICK_FIELD';
export const SET_FIELDS = 'SET_FIELDS';
export const CLEAR_PLAYER_DATA = 'CLEAR_PLAYER_DATA';
export const SAVE_THROW = 'SAVE_THROW';
export const SAVE_AREA_FILTERS = 'SAVE_AREA_FILTERS';
export const DELETE_PLAYER = 'DELETE_PLAYER';
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const SET_GAME_ONLINE = 'SET_GAME_ONLINE';
export const SET_LOBBY_KEY = 'SET_LOBBY_KEY';

export const setName = (id, name) => ({
  type: SET_NAME,
  id: id,
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

export const clearPlayerData = () => ({
  type: CLEAR_PLAYER_DATA
});

export const saveThrow = (player, index, throws) => ({
  type: SAVE_THROW,
  player,
  index,
  throws
});

export const saveAreaFilters = (filters) => ({
  type: SAVE_AREA_FILTERS,
  filters
});

export const deletePlayer = (player) => ({
  type: DELETE_PLAYER,
  player
});

export const login = (payload) => ({
  type: LOG_IN,
  payload
});

export const logout = () => ({
  type: LOG_OUT
});

export const setGameOnline = (gameOnline, isOnlineGameOwner, gameData, lobbyKey) => ({
  type: SET_GAME_ONLINE,
  gameOnline,
  isOnlineGameOwner,
  gameData,
  lobbyKey
});

