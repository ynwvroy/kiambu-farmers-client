declare interface ITasksFormState {
  id?: number;
  name: string;
  slug: string;
  description: string;
  priority: string;
  label: string;
  status: string;
  created_by: number | null;
  team_id: number | null;
  assignee_id: number | null;
  comments: string;
  created_at?: Date | null;
  updated_at?: Date | null;
  team?: ITeamsFormState | null;
  assignee?: IUserFormState | null;
  creator?: IUserFormState | null;
}

declare interface IGetAllTasks {
  success: boolean;
  message: string;
  data: ITasksFormState[];
}

declare interface IGetSingleTasks {
  success: boolean;
  message: string;
  data: ITasksFormState;
}

declare interface ICreateTasksRequest extends ITasksFormState {
  // Additional properties specific to the request, if any
}

declare interface ICreateTasksResponse {
  success: boolean;
  message: string;
  data: ITasksFormState;
}

declare interface IUpdateTasksRequest extends ITasksFormState {
  // Additional properties specific to the request, if any
}

declare interface IUpdateTasksResponse {
  success: boolean;
  message: string;
  data: ITasksFormState;
}

declare interface IDeleteTasksResponse {
  success: boolean;
  message: string;
  data: null;
  code?: string;
}
