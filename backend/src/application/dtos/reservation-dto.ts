export interface CreateReservationDto {
  customerName: string;
  customerPhone: string;
  partySize: number;
  date: string;
  time: string;
  notes?: string;
}
