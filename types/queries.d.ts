declare interface IContactQueriesFormState {
  id?: number;
  name: string;
  email: string;
  description: string;
  topic: string | null;
  is_resolved: number | boolean;
  created_at?: Date | null;
  updated_at?: Date | null;
}

declare interface IGetAllContactQueries {
  success: boolean;
  message: string;
  data: IContactQueriesFormState[];
}

declare interface IGetSingleContactQueries {
  success: boolean;
  message: string;
  data: IContactQueriesFormState;
}

declare interface ICreateContactQueriesRequest
  extends IContactQueriesFormState {
  // Additional properties specific to the request, if any
}

declare interface ICreateContactQueriesResponse {
  success: boolean;
  message: string;
  data: IContactQueriesFormState;
}

declare interface IUpdateContactQueriesRequest
  extends IContactQueriesFormState {
  // Additional properties specific to the request, if any
}

declare interface IUpdateContactQueriesResponse {
  success: boolean;
  message: string;
  data: IContactQueriesFormState;
}

declare interface IDeleteContactQueriesResponse {
  success: boolean;
  message: string;
  data: null;
  code?: string;
}
