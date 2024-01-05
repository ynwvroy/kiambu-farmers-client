declare interface IEventFormState {
  id?: number;
  name: string;
  about: string;
  description: string;
  slug: string;
  organizer_email: string;
  organizer_phone: string;
  ticket_types: string;
  additional_images: string;
  start_date: Date | null;
  start_time: string;
  end_date: Date | null;
  end_time: string;
  number_of_days: number;
  event_category_id: number;
  organization_id: number;
  event_qr_code: string;
  event_link: string;
  ticket_qr_code: string;
  event_has_price: number;
  event_has_promo_codes: number;
  event_has_tickets: number;
  entry_fee: string;
  location: string;
  maps_direction_pin: string;
  banner_url: string;
  initial_places_available: string;
  places_available: string;
  is_public: number;
  created_at: Date | null;
  updated_at: Date | null;
  category?: IGetSingleProductCategory | null;
  organization?: IOrganizationFormState | null;
}
declare interface IGetAllEvents {
  success: boolean;
  message: string;
  data: IEventFormState[];
}

declare interface IGetSingleEvent {
  success: boolean;
  message: string;
  data: IEventFormState;
}

declare interface ICreateEventRequest extends IEventFormState {
  // Additional properties specific to the request, if any
}

declare interface ICreateEventResponse {
  success: boolean;
  message: string;
  data: IEventFormState;
}

declare interface IUpdateEventRequest extends IEventFormState {
  // Additional properties specific to the request, if any
}

declare interface IUpdateEventResponse {
  success: boolean;
  message: string;
  data: IEventFormState;
}

declare interface IDeleteEventResponse {
  success: boolean;
  message: string;
  data: null;
  code?: string;
}
