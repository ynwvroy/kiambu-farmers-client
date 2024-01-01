declare interface IPromoCodeFormState {
  id?: number;
  amount: number;
  description: string;
  event_id: number | string;
  code: string;
  event?: IEventFormState | null;
  is_valid: number;
  valid_until: Date | null;
  type_of_use: string;
  currency: string;
  redemption_count: number;
  usage_limit_per_person: number;
  created_at?: Date | null;
  updated_at?: Date | null;
}

declare interface IGetAllPromoCodes {
  success: boolean;
  message: string;
  data: IPromoCodeFormState[];
}

declare interface IGetSinglePromoCode {
  success: boolean;
  message: string;
  data: IPromoCodeFormState;
}

declare interface ICreatePromoCodeRequest extends IPromoCodeFormState {
  // Additional properties specific to the request, if any
}

declare interface ICreatePromoCodeResponse {
  success: boolean;
  message: string;
  data: IPromoCodeFormState;
}

declare interface IUpdatePromoCodeRequest extends IPromoCodeFormState {
  // Additional properties specific to the request, if any
}

declare interface IUpdatePromoCodeResponse {
  success: boolean;
  message: string;
  data: IPromoCodeFormState;
}

declare interface IDeletePromoCodeResponse {
  success: boolean;
  message: string;
  data: null;
  code?: string;
}
