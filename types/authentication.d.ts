declare interface ILoginRequest {
  email: string;
  password: string;
}

declare interface ILoginResponse {
  success: boolean;
  message: string;
  data: {
    token: {
      type: string;
      token: string;
    };
    user: IUserFormState;
  };
}
declare interface IRegisterRequest extends IUserFormState {
  // Additional properties specific to the request, if any
}

declare interface IRegisterResponse {
  success?: boolean;
  message?: string;
  data: IUserFormState;
}
declare interface IForgotPasswordRequest {
  email: string;
}

declare interface IResetPasswordRequest {
  password: string;
  confirmPassword: string;
}

declare interface IForgotPasswordResponse {
  success?: boolean;
  message?: string;
  data: null;
}

declare interface IResetPasswordResponse {
  success?: boolean;
  message?: string;
  data: null;
}
