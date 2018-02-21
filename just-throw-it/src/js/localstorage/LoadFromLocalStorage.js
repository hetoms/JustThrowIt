import getFields from "../api/GetFields";
import {fields} from "../api/MockData";

//const fieldsFromAPI = getFields();
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState == null) {
      return undefined;
    }
    return {...JSON.parse(serializedState), fields: fields};
  } catch (err) {
    return undefined;
  }
};