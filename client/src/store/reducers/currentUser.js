import actions from "../actions";

export default function currentUser(currentUser = {}, action) {
  switch (
    action.type //if action type: UPDATE_CURRENT_USER
  ) {
    case actions.UPDATE_CURRENT_USER:
      return action.payload; //then return what the action wants to do(payload)
    default:
      return currentUser;
  }
}
