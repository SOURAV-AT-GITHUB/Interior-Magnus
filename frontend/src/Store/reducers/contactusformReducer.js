import { CONTACTUS_FORM_UPDATE, CONTACTUS_FORM_CLEAR } from "../actionTypes";
const defaultForm = {
  first_name: "",
  last_name: "",
  email: "",
  contact_number: "",
  message: "",
};

export const contactusFormReducer = (
  state = defaultForm,
  { type, payload }
) => {
  switch (type) {
    case CONTACTUS_FORM_UPDATE:
      return (state = { ...state, ...payload });
    case CONTACTUS_FORM_CLEAR: {
      return (state = defaultForm);
    }
    default:
      return state;
  }
};
