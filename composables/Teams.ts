export function useTeams() {
  const router = useRouter();

  const teams = ref<IGetAllTeams>();

  const isEditingTeams = useState<boolean>("is-editing-team", () => false);

  /**
   * ---------------------------------------------------
   * Teams FormState
   * ---------------------------------------------------
   *
   */
  const teamsFormState = useState<ITeamsFormState>("teams", () => ({
    id: 0,
    name: "",
    slug: "",
    description: "",
    event_id: null,
    organization_id: null,
    created_at: null,
    updated_at: null,
  }));

  /**
   * ---------------------------------------------------
   * Reset Teams FormState
   * ---------------------------------------------------
   *
   */
  const resetTeamsFormState = () => {
    teamsFormState.value = {
      id: 0,
      name: "",
      slug: "",
      description: "",
      event_id: null,
      organization_id: null,
      created_at: null,
      updated_at: null,
    };
  };

  /**
   * ---------------------------------------------------
   * Get all teams
   * ---------------------------------------------------
   *
   */
  const getAllTeams = async () => {
    try {
      const response = await useApi<IGetAllTeams>("/teams", {
        method: "GET",
      });

      teamsFormState.value = response?.data
      return response?.data;
    } catch (error) {
      console.error("Error getAllTeams::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Create new team
   * ---------------------------------------------------
   *
   */
  const createTeam = async () => {
    try {
      const response = await useApi<ICreateTeamsResponse>("/teams", {
        method: "POST",
        data: teamsFormState.value satisfies ICreateTeamsRequest,
      });
      if (response?.success) {
        notification["success"]({
          description: "Team created successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });

        router.push("/teams");
        resetTeamsFormState();
        return response?.data;
      } else {
        notification["error"]({
          description: "Could not create the team. Please try again.",
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error createTeam::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Get single teams
   * ---------------------------------------------------
   *
   */
  const getSingleTeam = async (team_id: string | number) => {
    try {
      const response = await useApi<IGetSingleTeams>(`/teams/${team_id}`, {
        method: "GET",
      });

      if (response?.success) {
        teamsFormState.value = response?.data;
        return response?.data;
      }
    } catch (error) {
      console.error("Error getSingleTeam::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Update single teams
   * ---------------------------------------------------
   *
   */
  const updateSingleTeam = async (team_id: number | undefined) => {
    try {
      const response = await useApi<IUpdateTeamsResponse>(`/teams/${team_id}`, {
        method: "PUT",
        data: teamsFormState.value satisfies IUpdateTeamsRequest,
      });
      if (response?.success) {
        notification["success"]({
          description: "Team updated successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });

        router.push("/teams");
        resetTeamsFormState();
        isEditingTeams.value = false;
        return response?.data;
      } else {
        notification["error"]({
          description: "Could not update the team. Please try again.",
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error updateSingleTeam::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Delete single teams
   * ---------------------------------------------------
   *
   */
  const deleteSingleTeam = async (team_id: number) => {
    try {
      const deleteTeamResponse = await useApi<IDeleteTeamsResponse>(`/teams/${team_id}`, {
        method: "DELETE",
      });
      if (deleteTeamResponse?.success === true) {
        notification["success"]({
          description: "Team deleted successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });
        resetTeamsFormState()
      } else if (deleteTeamResponse.data?.code === "E_ROW_NOT_FOUND") {
        notification["warning"]({
          description: deleteTeamResponse.data?.message,
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      } else if (deleteTeamResponse.data?.code === "ER_ROW_IS_REFERENCED_2") {
        notification["warning"]({
          description: deleteTeamResponse.data?.message,
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error deleteSingleTeam::: ", error);
    }
  };

  return {
    teams,
    teamsFormState,
    isEditingTeams,
    getAllTeams,
    createTeam,
    getSingleTeam,
    updateSingleTeam,
    deleteSingleTeam,
    resetTeamsFormState,
  };
}
