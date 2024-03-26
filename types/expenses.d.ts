declare interface IExpenseFormState {
  id?: number;
  amount: number;
  description: string;
  comments: string;
  created_at?: Date | null;
  updated_at?: Date | null;
}

declare interface IGetAllExpenses {
  success: boolean;
  message: string;
  data: IExpenseFormState[];
}

declare interface IGetSingleExpense {
  success: boolean;
  message: string;
  data: IExpenseFormState;
}

declare interface ICreateExpenseRequest extends IExpenseFormState {
  // Additional properties specific to the request, if any
}

declare interface ICreateExpenseResponse {
  success: boolean;
  message: string;
  data: IExpenseFormState;
}

declare interface IUpdateExpenseRequest extends IExpenseFormState {
  // Additional properties specific to the request, if any
}

declare interface IUpdateExpenseResponse {
  success: boolean;
  message: string;
  data: IExpenseFormState;
}

declare interface IDeleteExpenseResponse {
  success: boolean;
  message: string;
  data: null;
  code?: string;
}
