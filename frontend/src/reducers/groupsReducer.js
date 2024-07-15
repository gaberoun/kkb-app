export const initialGroups = localStorage.getItem("groups")
  ? JSON.parse(localStorage.getItem("groups"))
  : [];

export const groupsReducer = (state, action) => {
  switch (action.type) {
    case "GROUPS_LIST":
      return action.payload;
    case "GROUPS_ADD":
      return [action.payload, ...state];
    default:
      return state;
  }
};