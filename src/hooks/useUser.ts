import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { USER_LOCALSTORAGE_GETTER_KEY, getSavedUser } from "../helpers/getSavedUser";
import { LOGIN_ERROR_QP_KEY, LoginFormErrors, emailRegex } from "../pages/Login/types";

interface User {
  // Object cause we might add more properties here later;
  email: string;
}

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const savedUser = getSavedUser();

    if (savedUser) {
      setUser({
        email: savedUser
      });
    }

    // Subscribes to the user-made changes to the localstorage 
    // Usecase 2: if the users logouts on another tab, we get the event on all the tabs and we logout everywhere
    const storageChangeListener = (event: StorageEvent) => {
      const { key, newValue } = event;

      if (key === USER_LOCALSTORAGE_GETTER_KEY) {
        if (newValue) {
          if (emailRegex.test(newValue)) {
            setUser({
              email: newValue
            });
            navigate('/');
          }
        } else {
          navigate(`/login?${LOGIN_ERROR_QP_KEY}=${LoginFormErrors.NOT_LOGGED}`);
        }
      }
    };

    window.addEventListener('storage', storageChangeListener);

    return () => {
      window.removeEventListener('storage', storageChangeListener);
    }
  }, [navigate]);

  const loginUser = (userEmail: string) => {
    localStorage.setItem(USER_LOCALSTORAGE_GETTER_KEY, userEmail);
    setUser({
      email: userEmail
    });
    navigate('/');
  };

  const logoutUser = () => {
    localStorage.removeItem(USER_LOCALSTORAGE_GETTER_KEY);
    setUser(null);
    navigate('/login');
  }

  return {
    user,
    loginUser,
    logoutUser
  };
}
