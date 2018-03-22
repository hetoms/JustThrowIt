export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem('state', serializedState)
  } catch (err) {
    console.log(err);
  }
};