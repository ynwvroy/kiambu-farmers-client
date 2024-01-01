declare interface ITeamsFormState {
  id?: number;
  name: string;
  slug: string;
  description: string;
  event_id: number | null;
  organization_id: number | null;
  created_at?: Date | null;
  updated_at?: Date | null;
  organization?: IOrganizationFormState | null;
  event?: IEventFormState | null;
}

declare interface IGetAllTeams {
  success: boolean;
  message: string;
  data: ITeamsFormState[];
}

declare interface IGetSingleTeams {
  success: boolean;
  message: string;
  data: ITeamsFormState;
}

declare interface ICreateTeamsRequest extends ITeamsFormState {
  // Additional properties specific to the request, if any
}

declare interface ICreateTeamsResponse {
  success: boolean;
  message: string;
  data: ITeamsFormState;
}

declare interface IUpdateTeamsRequest extends ITeamsFormState {
  // Additional properties specific to the request, if any
}

declare interface IUpdateTeamsResponse {
  success: boolean;
  message: string;
  data: ITeamsFormState;
}

declare interface IDeleteTeamsResponse {
  success: boolean;
  message: string;
  data: null;
  code?: string;
}
