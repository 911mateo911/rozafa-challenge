import { ChangeEventHandler, FocusEventHandler, useCallback, useState } from "react";
import { TextInput } from "../components/TextInput";

interface FormPayload {
  errorMsg: string | null;
  email: string;
}

enum LoginFormErrors {
  VALIDATION_EMAIL = 'That doesn’t look like a valid email!'
}

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const Login = () => {
  // Used together because the state is dependent on each-other so we wont have useless rerenders
  const [loginFormState, setLoginFormState] = useState<FormPayload>({
    email: '',
    errorMsg: null
  });

  const setLoginFormError = useCallback((message: string | null) => {
    setLoginFormState(currentState => ({
      ...currentState,
      errorMsg: message
    }))
  }, []);

  const onInputBlur: FocusEventHandler<HTMLInputElement> = ({ target }) => {
    const { value } = target;

    // Could have used a simple (.includes('@')) or sth similar but i choose regex cause its more exact (also more expensive operation)
    if (value.length && !emailRegex.test(value)) {
      setLoginFormError(LoginFormErrors.VALIDATION_EMAIL);
    } else {
      setLoginFormError(null);
    }
  };

  const onInputChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { value } = target;

    setLoginFormState({
      email: value,
      errorMsg: null
    });
  };

  return (
    <div className="bg-gradient-bg flex items-center justify-center min-h-screen" >
      <div className="h-fit rounded-lg-xl grid gap-[30px] md:bg-white md:shadow-card md:px-20 md:py-[83px] md:max-w-lg" >
        <h1 className="font-roboto font-bold text-3xl leading-normal text-white text-center md:text-black" >
          Login to Your Account
        </h1>
        {loginFormState.errorMsg && (
          <span>
            <p className="font-roboto text-white text-xl font-medium leading-6 md:text-red-500" >
              Oops, there was an issue signing in:
              <br />
              <b>{loginFormState.errorMsg}</b>
            </p>
          </span>
        )}
        <div>
          <TextInput
            name="email"
            onChange={onInputChange}
            placeholder="Email"
            onBlur={onInputBlur}
            value={loginFormState.email}
          />
          <button className="font-roboto text-xl leading-6 font-medium mt-4 rounded-lg-xl bg-app-main py-3.5 text-center w-full text-white md:mb-2" >
            Sign in
          </button>
        </div>
      </div>
    </div>
  )
}
