declare interface IIncomeFormState {
  id?: number;
  amount: number;
  description: string;
  comments: string;
  created_at?: Date | null;
  updated_at?: Date | null;
}

declare interface IGetAllIncomes {
  success: boolean;
  message: string;
  data: IIncomeFormState[];
}

declare interface IGetSingleIncome {
  success: boolean;
  message: string;
  data: IIncomeFormState;
}

declare interface ICreateIncomeRequest extends IIncomeFormState {
  // Additional properties specific to the request, if any
}

declare interface ICreateIncomeResponse {
  success: boolean;
  message: string;
  data: IIncomeFormState;
}

declare interface IUpdateIncomeRequest extends IIncomeFormState {
  // Additional properties specific to the request, if any
}

declare interface IUpdateIncomeResponse {
  success: boolean;
  message: string;
  data: IIncomeFormState;
}

declare interface IDeleteIncomeResponse {
  success: boolean;
  message: string;
  data: null;
  code?: string;
}
