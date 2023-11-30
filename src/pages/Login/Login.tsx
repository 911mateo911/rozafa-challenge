import { ChangeEventHandler, useCallback, useState } from "react";
import { TextInput } from "../../components/TextInput";
import { useUser } from "../../hooks/useUser";
import { FormPayload, LOGIN_ERROR_QP_KEY, LOGIN_FORM_ERROR_MAP, LoginFormErrors, emailRegex } from "./types";
import { useSearchParams } from "react-router-dom";

export const Login = () => {
  const [searchParams] = useSearchParams();
  const initialError = searchParams.get(LOGIN_ERROR_QP_KEY);

  // Used together because the state is dependent on each-other so we wont have useless rerenders
  const [loginFormState, setLoginFormState] = useState<FormPayload>(() => {
    if (initialError && initialError in LOGIN_FORM_ERROR_MAP) {
      return {
        email: '',
        errorMsg: initialError as LoginFormErrors
      }
    } else {
      return {
        email: '',
        errorMsg: null
      }
    }
  });
  const { loginUser } = useUser();

  const setLoginFormError = useCallback((message: LoginFormErrors | null) => {
    setLoginFormState(currentState => ({
      ...currentState,
      errorMsg: message
    }))
  }, []);

  const onInputChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { value } = target;

    setLoginFormState({
      email: value,
      errorMsg: null
    });
  };

  const onSubmit = () => {
    const isProvidedEmailValid = emailRegex.test(loginFormState.email);

    if (isProvidedEmailValid) {
      loginUser(loginFormState.email);
    } else {
      setLoginFormError(LoginFormErrors.VALIDATION_EMAIL);
    }
  };

  const presentError = loginFormState.errorMsg && LOGIN_FORM_ERROR_MAP[loginFormState.errorMsg];

  return (
    <div className="bg-gradient-bg flex items-center justify-center min-h-screen" >
      <div className="h-fit rounded-lg-xl grid gap-base md:bg-white md:shadow-card md:px-20 md:py-[83px] md:max-w-lg" >
        <h1 className="font-roboto font-bold text-3xl leading-normal text-white text-center md:text-black" >
          Login to Your Account
        </h1>
        {presentError && (
          <span>
            <p className="font-roboto text-white text-xl font-medium leading-6 md:text-red-500" >
              {presentError.errorHead}
              <br />
              <b>{presentError.errorBody}</b>
            </p>
          </span>
        )}
        <div>
          <TextInput
            name="email"
            onChange={onInputChange}
            placeholder="Email"
            value={loginFormState.email}
          />
          <button
            onClick={onSubmit}
            className="font-roboto text-xl leading-6 font-medium mt-4 rounded-lg-xl bg-app-main py-3.5 text-center w-full text-white md:mb-2"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  )
}
