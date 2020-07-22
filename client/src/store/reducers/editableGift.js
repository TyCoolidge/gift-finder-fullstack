import actions from "../actions";

export default function editableGift(editableGift = {}, action) {
  switch (action.type) {
    case actions.STORE_EDITABLE_GIFT:
      const newEditableGift = action.payload;
      return newEditableGift;
    default:
      return editableGift;
  }
}
