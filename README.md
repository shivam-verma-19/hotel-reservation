# 🏨 Hotel Room Reservation

A simple hotel room reservation demo built with [Next.js](https://nextjs.org) and React. Users can book rooms, view hotel occupancy, and randomize room bookings for testing.

---

## Features

- **Book Rooms:** Reserve 1–5 rooms at a time, with the system finding the best available grouping.
- **Visual Room Grid:** See each floor's room status (booked/available) in a color-coded grid.
- **Randomize Occupancy:** Instantly fill rooms at random to simulate real-world scenarios.
- **Travel Time Calculation:** Shows the "travel time" needed to reach all booked rooms (minimizing distance).

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/hotel-reservation.git
   cd hotel-reservation
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

---

## Project Structure

```
hotel-reservation/
├── components/
│   └── roomGrid.tsx         # Room grid display component
├── public/                  # Static assets (SVGs, etc.)
├── src/
│   └── app/
│       └── page.tsx         # Main application page
├── utils/
│   └── bookingUtils.ts      # Hotel logic and booking algorithms
├── package.json
├── tsconfig.json
└── README.md
```

---

## Usage

- **Book Rooms:**  
  Enter the number of rooms (1–5) and click "Book". The system will reserve the best available group of rooms.
- **Randomize:**  
  Click "Randomize" to fill rooms randomly and test booking logic.
- **Room Grid:**  
  Green = available, Red = booked.

---

## Customization

- **Hotel Size:**  
  Edit `generateHotel()` in [`utils/bookingUtils.ts`](utils/bookingUtils.ts) to change the number of floors or rooms per floor.
- **Booking Logic:**  
  The booking algorithm prioritizes grouping rooms on the same floor and minimizes travel time.

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)

---

## License

ISC

---
