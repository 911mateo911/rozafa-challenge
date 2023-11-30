export enum LoginFormErrors {
  VALIDATION_EMAIL = 'VALIDATION_EMAIL',
  NOT_LOGGED = 'NOT_LOGGED'
}

export interface FormPayload {
  errorMsg: LoginFormErrors | null;
  email: string;
}

export const LOGIN_FORM_ERROR_MAP: Record<LoginFormErrors, {
  errorHead: string;
  errorBody: string;
}> = {
  [LoginFormErrors.VALIDATION_EMAIL]: {
    errorHead: 'Oops, there was an issue signing in:',
    errorBody: 'That doesn’t look like a valid email!'
  },
  [LoginFormErrors.NOT_LOGGED]: {
    errorHead: 'Oops, you cannot access that page!',
    errorBody: 'You are not logged in!'
  }
}

export const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const LOGIN_ERROR_QP_KEY = 'login_err' as const;
