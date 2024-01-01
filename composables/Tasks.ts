export function useTasks() {
  const router = useRouter();

  const tasks = ref<IGetAllTasks>();

  const isEditingTasks = useState<boolean>("is-editing-task", () => false);

  /**
   * ---------------------------------------------------
   * Tasks FormState
   * ---------------------------------------------------
   *
   */
  const tasksFormState = useState<ITasksFormState>("tasks", () => ({
    id: 0,
    name: "",
    slug: "",
    description: "",
    priority: "",
    label: "",
    status: "",
    created_by: null,
    team_id: null,
    assignee_id: null,
    comments: "",
    created_at: null,
    updated_at: null,
    team: null,
    assignee: null,
    creator: null,
  }));

  /**
   * ---------------------------------------------------
   * Reset Tasks FormState
   * ---------------------------------------------------
   *
   */
  const resetTasksFormState = () => {
    tasksFormState.value = {
      id: 0,
      name: "",
      slug: "",
      description: "",
      priority: "",
      label: "",
      status: "",
      created_by: null,
      team_id: null,
      assignee_id: null,
      comments: "",
      created_at: null,
      updated_at: null,
      team: null,
      assignee: null,
      creator: null,
    };
  };

  /**
   * ---------------------------------------------------
   * Get all tasks
   * ---------------------------------------------------
   *
   */
  const getAllTasks = async () => {
    try {
      const response = await useApi<IGetAllTasks>("/tasks", {
        method: "GET",
      });

      tasksFormState.value = response?.data
      return response?.data;
    } catch (error) {
      console.error("Error getAllTasks::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Create new task
   * ---------------------------------------------------
   *
   */
  const createTask = async () => {
    try {
      const response = await useApi<ICreateTasksResponse>("/tasks", {
        method: "POST",
        data: tasksFormState.value satisfies ICreateTasksRequest,
      });
      if (response?.success) {
        notification["success"]({
          description: "Task created successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });

        router.push("/tasks");
        resetTasksFormState();
        return response?.data;
      } else {
        notification["error"]({
          description:
            "Could not create the task. Please try again.",
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error createTask::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Get single tasks
   * ---------------------------------------------------
   *
   */
  const getSingleTask = async (task_id: string | number) => {
    try {
      const response = await useApi<IGetSingleTasks>(`/tasks/${task_id}`, {
        method: "GET",
      });

      if (response?.success) {
        tasksFormState.value = response?.data;
        return response?.data;
      }
    } catch (error) {
      console.error("Error getSingleTask::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Update single tasks
   * ---------------------------------------------------
   *
   */
  const updateSingleTask = async (task_id: number | undefined) => {
    try {
      const response = await useApi<IUpdateTasksResponse>(`/tasks/${task_id}`, {
        method: "PUT",
        data: tasksFormState.value satisfies IUpdateTasksRequest,
      });
      if (response?.success) {
        notification["success"]({
          description: "Task updated successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });

        router.push("/tasks");
        resetTasksFormState();
        isEditingTasks.value = false;
        return response?.data;
      } else {
        notification["error"]({
          description:
            "Could not update the task. Please try again.",
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error updateSingleTask::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Delete single tasks
   * ---------------------------------------------------
   *
   */
  const deleteSingleTask = async (task_id: number) => {
    try {
      const deleteTaskResponse = await useApi<IDeleteTasksResponse>(`/tasks/${task_id}`, {
        method: "DELETE",
      });
      if (deleteTaskResponse?.success === true) {
        notification["success"]({
          description: "Task deleted successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });

        return deleteTaskResponse.data?.data;
      } else if (deleteTaskResponse.data?.code === "E_ROW_NOT_FOUND") {
        notification["warning"]({
          description: deleteTaskResponse.data?.message,
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      } else if (deleteTaskResponse.data?.code === "ER_ROW_IS_REFERENCED_2") {
        notification["warning"]({
          description: deleteTaskResponse.data?.message,
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error deleteSingleTask::: ", error);
    }
  };

  return {
    tasks,
    tasksFormState,
    isEditingTasks,
    getAllTasks,
    createTask,
    getSingleTask,
    updateSingleTask,
    deleteSingleTask,
    resetTasksFormState
  };
}
