import { notification } from "ant-design-vue";

export function useAuthentication() {
  const router = useRouter();

  const { getLoggedInUser } = useUsers();

  const userId = useCookie<string | any>("user_id");

  const userType = useCookie("user_type");

  const accessToken = useCookie("access_token");

  const loginFormState = useState<ILoginRequest>("login-form-state", () => ({
    email: "",
    password: "",
  }));

  const resetLoginFormState = () => {
    loginFormState.value = {
      email: "",
      password: "",
    };
  };

  const registerFormState = useState<IRegisterRequest>(
    "register-form-state",
    () => ({
      full_name: "",
      username: "",
      email: "",
      phone_number: "",
      password: "",
      user_type: "user",
      profile_url: "",
      is_verified: false,
    })
  );

  const resetRegisterFormState = () => {
    registerFormState.value = {
      full_name: "",
      username: "",
      email: "",
      phone_number: "",
      password: "",
      user_type: "user",
      profile_url: "",
      is_verified: false,
    };
  };

  const forgotPasswordFormState = useState<IForgotPasswordRequest>(
    "forgot-password-form-state",
    () => ({
      email: "",
    })
  );

  const resetPasswordFormState = useState<IResetPasswordRequest>(
    "reset-password-form-state",
    () => ({
      password: "",
      confirmPassword: "",
    })
  );

  /**
   * ---------------------------------------------------
   * Login
   * ---------------------------------------------------
   *
   */
  const login = async () => {
    try {
      const response = await Authentication<ILoginResponse>("/auth/login", {
        method: "POST",
        data: loginFormState.value satisfies ILoginRequest,
      });

      if (response?.data.success) {
        notification["success"]({
          description: "You have successfully logged in.",
          message: "Welcome back!",
          placement: "bottomRight",
          duration: 8,
        });

        userId.value = response?.data?.data?.user?.id;

        accessToken.value = response?.data?.data?.token?.token;

        await getLoggedInUser(userId.value);

        resetLoginFormState();

        userType.value !== 'user' ? router.push("/dashboard") : router.push('platform')

        // router.push("/products");
      } else if (
        response?.data?.message ===
        "E_INVALID_AUTH_PASSWORD: Password mis-match"
      ) {
        notification["error"]({
          description:
            "The password you have used is not correct, please try again.",
          message: "Incorrect password",
          placement: "bottomRight",
          duration: 8,
        });
      } else {
        notification["error"]({
          description:
            "The email | password combination used is not valid, please try again.",
          message: "User not found",
          placement: "bottomRight",
          duration: 8,
        });
      }

      return response;
    } catch (error) {
      console.error("Error from login:", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Auto login
   * ---------------------------------------------------
   *
   */
  const autoLogin = async () => {
    try {
      const response = await Authentication<ILoginResponse>("/auth/login", {
        method: "POST",
        data: {
          email: registerFormState.value.email,
          password: registerFormState.value.password,
        },
      });

      if (response?.data.success) {
        notification["success"]({
          message: "Registration successful",
          placement: "bottomRight",
          duration: 8,
        });

        userId.value = response?.data?.data?.user?.id;

        accessToken.value = response?.data?.data?.token?.token;

        await getLoggedInUser(userId.value);

        resetLoginFormState();

        router.push("/dashboard");
      } else if (
        response?.data?.message ===
        "E_INVALID_AUTH_PASSWORD: Password mis-match"
      ) {
        notification["error"]({
          description:
            "The password you have used is not correct, please try again.",
          message: "Incorrect password",
          placement: "bottomRight",
          duration: 8,
        });
      } else {
        notification["error"]({
          description:
            "The email | password combination used is not valid, please try again.",
          message: "User not found",
          placement: "bottomRight",
          duration: 8,
        });
      }

      return response;
    } catch (error) {
      console.error("Error from login:", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Registration
   * ---------------------------------------------------
   *
   */
  const register = async () => {
    try {
      const response = await Authentication<IRegisterResponse>(
        "/auth/register",
        {
          method: "POST",
          data: registerFormState.value,
        }
      );

      if (response?.data?.success) {
        notification["success"]({
          description: `Welcome to Kiambu Farmers, ${registerFormState.value.username}! We think you'll love it here.`,
          message: "Account has been created successfully",
          placement: "bottomRight",
          duration: 8,
        });

        // AUTOLOGIN
        await autoLogin();

        resetRegisterFormState();
      } else if (response.data?.code === "ER_DUP_ENTRY") {
        notification["warning"]({
          description: response.data?.message,
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      } else {
        notification["error"]({
          description: "Please try again.",
          message: "Failed to create account",
          placement: "bottomRight",
          duration: 8,
        });
      }

      return response?.data;
    } catch (error) {
      console.error("Error from register", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Forgot Password
   * ---------------------------------------------------
   *
   */
  const forgotPassword = async () => {
    try {
      const response = await Authentication<IForgotPasswordResponse>(
        "/auth/forgot-password",
        {
          method: "POST",
          data: forgotPasswordFormState.value,
        }
      );
      router.push("/reset-password");
      return response?.data.data;
    } catch (error) {
      console.error("Error on forgotPassword::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Reset Password
   * ---------------------------------------------------
   *
   */
  const resetPassword = async () => {
    try {
      const response = await Authentication<IResetPasswordResponse>(
        "/auth/reset-password",
        {
          method: "POST",
          data: resetPasswordFormState.value,
        }
      );
      return response?.data.data;
    } catch (error) {
      console.error("Error resetPassword::: ", error);
    }
  };

  return {
    loginFormState,
    registerFormState,
    forgotPasswordFormState,
    resetPasswordFormState,
    login,
    register,
    forgotPassword,
    resetPassword,
    resetLoginFormState,
    resetRegisterFormState,
  };
}
