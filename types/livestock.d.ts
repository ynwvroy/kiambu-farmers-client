declare interface ILivestockFormState {
  id?: number;
  name: string;
  type: string;
  breed: string;
  date_of_birth: Date;
  sex: boolean; // Assuming 'true' for male and 'false' for female
  color: string;
  status: string;
  created_at?: Date | null;
  updated_at?: Date | null;
}

declare interface IGetAllLivestock {
  success: boolean;
  message: string;
  data: ILivestockFormState[];
}

declare interface IGetSingleLivestock {
  success: boolean;
  message: string;
  data: ILivestockFormState;
}

declare interface ICreateLivestockRequest extends ILivestockFormState {
  // Additional properties specific to the request, if any
}

declare interface ICreateLivestockResponse {
  success: boolean;
  message: string;
  data: ILivestockFormState;
}

declare interface IUpdateLivestockRequest extends ILivestockFormState {
  // Additional properties specific to the request, if any
}

declare interface IUpdateLivestockResponse {
  success: boolean;
  message: string;
  data: ILivestockFormState;
}

declare interface IDeleteLivestockResponse {
  success: boolean;
  message: string;
  data: null;
  code?: string;
}
