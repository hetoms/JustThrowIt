export const SET_NAME = 'SET_NAME';
export const PICK_FIELD = 'PICK_FIELD';
export const SET_FIELDS = 'SET_FIELDS';

export const setName = (name) => ({
   type: SET_NAME,
   name: name
});

export const pickField = (field) => ({
  type: PICK_FIELD,
  field: field
});

export const setFields = (payload) => ({
  type: SET_FIELDS,
  fields: payload
});