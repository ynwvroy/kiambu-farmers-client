declare interface ITicketFormState {
  id?: number;
  description: string;
  has_promo_code: number;
  amount_to_pay: number;
  discount_amount: number;
  has_paid: number;
  method_of_payment: string;
  payment_transaction_id: string;
  ticket_type: string;
  number_of_tickets: number;
  currency: string;
  seat_number_allocation: string;
  check_in_status: string;
  ticket_status: string;
  refund_status: string;
  refund_transaction_id: string;
  event_id: number;
  promo_code_id: number;
  user_id: number;
  created_at?: Date | null;
  updated_at?: Date | null;
  events?: IEventFormState | null;
  user?: IUserFormState | null;
  promo_codes?: IPromoCodeFormState | null;
}
declare interface IGetAllTickets {
  success: boolean;
  message: string;
  data: ITicketFormState[];
}

declare interface IGetSingleTicket {
  success: boolean;
  message: string;
  data: ITicketFormState;
}

declare interface ICreateTicketRequest extends ITicketFormState {
  // Additional properties specific to the request, if any
}

declare interface ICreateTicketResponse {
  success: boolean;
  message: string;
  data: ITicketFormState;
}

declare interface IUpdateTicketRequest extends ITicketFormState {
  // Additional properties specific to the request, if any
}

declare interface IUpdateTicketResponse {
  success: boolean;
  message: string;
  data: ITicketFormState;
}

declare interface IDeleteTicketResponse {
  success: boolean;
  message: string;
  data: null;
  code?: string;
}
