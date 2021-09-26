export const loadState = () => {
  try {
    const serializedState = JSON.parse(localStorage.getItem("state"));
    if (serializedState == null) {
      return undefined;
    }
    return serializedState  
  } catch (err) {
    return undefined;
  }
}
export const saveState = (state) => {
  
  try {
    localStorage.setItem("state", JSON.stringify(state));
  } catch (err) {
    // ignore error.
  }
};
