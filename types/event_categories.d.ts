declare interface IEventCategoryFormState {
  id?: number;
  name: string;
  description: string;
  slug: string;
  banner_url: string;
  created_at?: Date | null;
  updated_at?: Date | null;
}

declare interface IGetAllEventCategories {
  success: boolean;
  message: string;
  data: IEventCategoryFormState[];
}

declare interface IGetSingleEventCategory {
  success: boolean;
  message: string;
  data: IEventCategoryFormState;
}

declare interface ICreateEventCategoryRequest extends IEventCategoryFormState {
  // Additional properties specific to the request, if any
}

declare interface ICreateEventCategoryResponse {
  success: boolean;
  message: string;
  data: IEventCategoryFormState;
}

declare interface IUpdateEventCategoryRequest extends IEventCategoryFormState {
  // Additional properties specific to the request, if any
}

declare interface IUpdateEventCategoryResponse {
  success: boolean;
  message: string;
  data: IEventCategoryFormState;
}

declare interface IDeleteEventCategoryResponse {
  success: boolean;
  message: string;
  code?: string;
  data: null;
}

