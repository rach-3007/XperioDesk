
export interface Booking {
    id: number;
    employeeName: string;
    expId: number;
    seatNumber: string;
    office: string;
    dateOfBooking: string;
    status: 'Open' | 'Closed';
    startDate: string;
    endDate: string;
  }
  
  export let bookings: Booking[] = [
    {
      id: 1,
      employeeName: "Harry Potter",
      expId: 10001,
      seatNumber: "TW-001WZ001",
      office: "Module, 1, Gryffindor Tower",
      dateOfBooking: "2024-08-05",
      status: "Open",
      startDate: "2024-08-10",
      endDate: "2024-08-15"
    },
    {
      id: 2,
      employeeName: "Hermione Granger",
      expId: 10002,
      seatNumber: "TW-002WZ002",
      office: "Module, 1, Gryffindor Tower",
      dateOfBooking: "2024-08-06",
      status: "Closed",
      startDate: "2024-08-11",
      endDate: "2024-08-16"
    },
    {
      id: 3,
      employeeName: "Ron Weasley",
      expId: 10003,
      seatNumber: "TW-003WZ003",
      office: "Module, 2, Gryffindor Tower",
      dateOfBooking: "2024-08-07",
      status: "Open",
      startDate: "2024-08-12",
      endDate: "2024-08-17"
    },
    {
      id: 4,
      employeeName: "Albus Dumbledore",
      expId: 10004,
      seatNumber: "TW-004WZ004",
      office: "Module, 3, Headmaster's Office",
      dateOfBooking: "2024-08-08",
      status: "Closed",
      startDate: "2024-08-13",
      endDate: "2024-08-18"
    },
    {
      id: 5,
      employeeName: "Severus Snape",
      expId: 10005,
      seatNumber: "TW-005WZ005",
      office: "Module, 4, Slytherin Dungeon",
      dateOfBooking: "2024-08-09",
      status: "Open",
      startDate: "2024-08-14",
      endDate: "2024-08-19"
    },
    {
      id: 6,
      employeeName: "Rubeus Hagrid",
      expId: 10006,
      seatNumber: "TW-006WZ006",
      office: "Module, 5, Hagrid's Hut",
      dateOfBooking: "2024-08-10",
      status: "Closed",
      startDate: "2024-08-15",
      endDate: "2024-08-20"
    },
    {
      id: 7,
      employeeName: "Draco Malfoy",
      expId: 10007,
      seatNumber: "TW-007WZ007",
      office: "Module, 6, Slytherin Dungeon",
      dateOfBooking: "2024-08-11",
      status: "Open",
      startDate: "2024-08-16",
      endDate: "2024-08-21"
    },
    {
      id: 8,
      employeeName: "Ginny Weasley",
      expId: 10008,
      seatNumber: "TW-008WZ008",
      office: "Module, 7, Gryffindor Tower",
      dateOfBooking: "2024-08-12",
      status: "Closed",
      startDate: "2024-08-17",
      endDate: "2024-08-22"
    },
    {
      id: 9,
      employeeName: "Neville Longbottom",
      expId: 10009,
      seatNumber: "TW-009WZ009",
      office: "Module, 8, Herbology Greenhouse",
      dateOfBooking: "2024-08-13",
      status: "Open",
      startDate: "2024-08-18",
      endDate: "2024-08-23"
    },
    {
      id: 10,
      employeeName: "Luna Lovegood",
      expId: 10010,
      seatNumber: "TW-010WZ010",
      office: "Module, 9, Ravenclaw Tower",
      dateOfBooking: "2024-08-14",
      status: "Closed",
      startDate: "2024-08-19",
      endDate: "2024-08-24"
    },
    {
      id: 11,
      employeeName: "Sirius Black",
      expId: 10011,
      seatNumber: "TW-011WZ011",
      office: "Module, 10, Grimmauld Place",
      dateOfBooking: "2024-08-15",
      status: "Open",
      startDate: "2024-08-20",
      endDate: "2024-08-25"
    },
    {
      id: 12,
      employeeName: "Remus Lupin",
      expId: 10012,
      seatNumber: "TW-012WZ012",
      office: "Module, 11, Gryffindor Tower",
      dateOfBooking: "2024-08-16",
      status: "Closed",
      startDate: "2024-08-21",
      endDate: "2024-08-26"
    },
    {
      id: 13,
      employeeName: "Minerva McGonagall",
      expId: 10013,
      seatNumber: "TW-013WZ013",
      office: "Module, 12, Gryffindor Tower",
      dateOfBooking: "2024-08-17",
      status: "Open",
      startDate: "2024-08-22",
      endDate: "2024-08-27"
    },
    {
      id: 14,
      employeeName: "Gellert Grindelwald",
      expId: 10014,
      seatNumber: "TW-014WZ014",
      office: "Module, 13, Nurmengard",
      dateOfBooking: "2024-08-18",
      status: "Closed",
      startDate: "2024-08-23",
      endDate: "2024-08-28"
    },
    {
      id: 15,
      employeeName: "Bellatrix Lestrange",
      expId: 10015,
      seatNumber: "TW-015WZ015",
      office: "Module, 14, Malfoy Manor",
      dateOfBooking: "2024-08-19",
      status: "Open",
      startDate: "2024-08-24",
      endDate: "2024-08-29"
    }
  ];
  
export const updateBooking = (updatedBooking: any) => {
    const index = bookings.findIndex((booking) => booking.id === updatedBooking.id);
    if (index !== -1) {
      bookings[index] = updatedBooking;
    }
  };