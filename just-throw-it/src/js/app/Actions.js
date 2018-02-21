export const SET_NAME = 'SET_NAME';
export const PICK_FIELD = 'PICK_FIELD';

export const setName = (name) => ({
   type: SET_NAME,
   name: name
});

export const pickField = (field) => ({
  type: PICK_FIELD,
  field: field
});