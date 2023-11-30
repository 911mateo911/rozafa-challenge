import { emailRegex } from "../pages/Login/types";

export const USER_LOCALSTORAGE_GETTER_KEY = 'rozafa_auth_user' as const;

export const getSavedUser = () => {
  const savedUser = localStorage.getItem(USER_LOCALSTORAGE_GETTER_KEY);

  if (savedUser) {
    const userIsValid = emailRegex.test(savedUser);

    if (userIsValid) {
      return savedUser;
    }
  }

  return null;
}
