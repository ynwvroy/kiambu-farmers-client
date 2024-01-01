export function useTickets() {
  const tickets = ref<IGetAllTickets>();

  /**
   * ---------------------------------------------------
   * Tickets  FormState
   * ---------------------------------------------------
   *
   */
  const ticketFormState = useState<ITicketFormState>(
    "ticket",
    () => ({
      id: 0,
      description: '',
      has_promo_code: 0,
      amount_to_pay: 0,
      discount_amount: 0,
      has_paid: 0,
      method_of_payment: "",
      payment_transaction_id: "",
      ticket_type: "",
      number_of_tickets: 0,
      currency: "",
      seat_number_allocation: "",
      check_in_status: "",
      ticket_status: "",
      refund_status: "",
      refund_transaction_id: "",
      event_id: 0,
      promo_code_id: 0,
      user_id: 0,
      created_at: null,
      updated_at: null,
    })
  );

  /**
   * ---------------------------------------------------
   * Get all tickets
   * ---------------------------------------------------
   *
   */
  const getAllTickets = async () => {
    try {
      const response = await useApi<IGetAllTickets>(
        "/tickets",
        {
          method: "GET",
        }
      );
      return response?.data;
    } catch (error) {
      console.error("Error getAllTickets::: ", error);
    }
  };


  /**
   * ---------------------------------------------------
   * Get single ticket
   * ---------------------------------------------------
   *
   */
  const getSingleTicket = async (ticket_id: string) => {
    try {
      const response = await useApi<IGetSingleTicket>(
        `/tickets/${ticket_id}`,
        {
          method: "GET",
        }
      );
      return response?.data;
    } catch (error) {
      console.error("Error getSingleTicket::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Update single ticket
   * ---------------------------------------------------
   *
   */
  const updateSingleTicket = async (ticket_id: string) => {
    try {
      const response = await useApi<IUpdateTicketResponse>(
        `/tickets/${ticket_id}`,
        {
          method: "PUT",
          data: ticketFormState.value satisfies IUpdateTicketRequest,
        }
      );
      return response?.data;
    } catch (error) {
      console.error("Error updateSingleTicket::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Delete single ticket
   * ---------------------------------------------------
   *
   */
  const deleteSingleTicket = async (ticket_id: string) => {
    try {
      const response = await useApi<IDeleteTicketResponse>(
        `/tickets/${ticket_id}`,
        {
          method: "DELETE",
        }
      );
      return response?.data;
    } catch (error) {
      console.error("Error deleteSingleTicket::: ", error);
    }
  };

  return {
    tickets,
    ticketFormState,
    getAllTickets,
    getSingleTicket,
    updateSingleTicket,
    deleteSingleTicket,
  };
}
