import { combineReducers } from "redux";
import currentUser from "./reducers/currentUser";
import editableGift from "./reducers/editableGift";
import redirectToAccountPage from "./reducers/redirectToAccountPage";

export default combineReducers({
  currentUser,
  editableGift,
  redirectToAccountPage,
});
