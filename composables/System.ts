
export function useSystem() {
  const userId = useCookie<string | undefined>("user_id");
  const userFullName = useCookie<string | undefined>("full_name");
  const userUserName = useCookie<string | undefined>('username')
  const userEmail = useCookie<string | undefined>('email')
  const userType = useCookie<string | undefined>("user_type");
  const userPhone = useCookie<string | undefined>('phone_number')
  const accessToken = useCookie("access_token");

  const router = useRouter()

  /**
   * ---------------------------------------------------
   * Logout
   * ---------------------------------------------------
   *
   */
  const logout = async () => {
    try {
        userId.value = null
        userFullName.value = null
        userUserName.value = null
        userEmail.value = null
        userType.value = null
        userPhone.value = null
        accessToken.value = null

        router.push('/')
    } catch (error) {
      console.error("Error from logout", error);
    }
  };

  return {
    logout,
  };
}
