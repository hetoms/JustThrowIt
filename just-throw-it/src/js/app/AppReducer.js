import {fields} from '../api/MockData'

const initialState = {
  fields: fields,
  playerData: []
};

const AppReducer = (state = initialState, action) => {
  return state;
};

export default AppReducer;