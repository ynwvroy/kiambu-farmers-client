declare interface IEventsCommentsFormState {
  id?: number;
  name: string;
  email: string;
  comment: string;
  rating: number;
  event_id: number;
  is_anonymous: number;
  created_at: Date | null;
  updated_at: Date | null;
  event?: IEventFormState | null;
}

declare interface IGetAllEventsComments {
  success: boolean;
  message: string;
  data: IEventsCommentsFormState[];
}

declare interface IGetSingleEventsComment {
  success: boolean;
  message: string;
  data: IEventsCommentsFormState;
}

declare interface ICreateEventsCommentRequest extends IEventsCommentsFormState {
  // Additional properties specific to the request, if any
}

declare interface ICreateEventsCommentResponse {
  success: boolean;
  message: string;
  data: IEventsCommentsFormState;
}

declare interface IUpdateEventsCommentRequest extends IEventsCommentsFormState {
  // Additional properties specific to the request, if any
}

declare interface IUpdateEventsCommentResponse {
  success: boolean;
  message: string;
  data: IEventsCommentsFormState;
}

declare interface IDeleteEventsCommentResponse {
  success: boolean;
  message: string;
  data: null;
}
