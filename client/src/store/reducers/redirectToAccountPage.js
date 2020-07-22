import actions from "../actions";

export default function redirectToAccountPage(
  redirectToAccountPage = {},
  action
) {
  switch (action.type) {
    case actions.REDIRECT_TO_ACCOUNT_PAGE:
      return action.payload;
    default:
      return redirectToAccountPage;
  }
}
