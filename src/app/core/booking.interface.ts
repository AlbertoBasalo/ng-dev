export interface Booking {
  id: number | string;
  activityId: number | string;
  userId: number | string;
  date: string;
  participants: number;
  state: BookingState;
}

export type BookingState = 'pending' | 'booked' | 'cancelled';

export const DEFAULT_BOOKING: Booking = {
  id: 0,
  activityId: 0,
  userId: 0,
  date: '',
  participants: 0,
  state: 'pending',
};
