export interface Booking {
    id: number;
    employeeName: string;
    expId: number;
    seatNumber: string;
    office: string;
    dateOfBooking: string;
    loginStatus: string; // New property added
    status: 'Open' | 'Closed';
    startDate: string;
    endDate: string;
    emailId: string;
    role: 'user' | 'admin';
  }
  