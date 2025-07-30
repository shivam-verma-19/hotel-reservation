"use client";

import { useState } from "react";
import RoomGrid from "../../components/roomGrid";
import {
  generateHotel,
  bookRooms,
  type Hotel,
} from "../../utils/bookingUtils";

export default function Home() {
  const [hotel, setHotel] = useState<Hotel>(generateHotel());
  const [roomCount, setRoomCount] = useState(1);
  const [lastBooking, setLastBooking] = useState<number[]>([]);
  const [travelTime, setTravelTime] = useState<number | null>(null);

  const handleBooking = () => {
    const updatedHotel = structuredClone(hotel);
    const result = bookRooms(updatedHotel, roomCount);
    setHotel(updatedHotel);
    setLastBooking(result.booked);
    setTravelTime(result.travelTime);
  };

  const handleRandomize = () => {
    const newHotel = generateHotel();
    for (const floor in newHotel) {
      newHotel[floor].forEach((r) => {
        r.booked = Math.random() > 0.7;
      });
    }
    setHotel(newHotel);
    setLastBooking([]);
    setTravelTime(null);
  };

  const handleReset = () => {
    setHotel(generateHotel());
    setLastBooking([]);
    setTravelTime(null);
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Hotel Room Reservation</h1>

      <div className="flex gap-4 mb-4">
        <input
          type="number"
          value={roomCount}
          onChange={(e) => setRoomCount(Number(e.target.value))}
          min={1}
          max={100}
          className="border p-2 rounded w-32"
        />
        <button
          onClick={handleBooking}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Book Rooms
        </button>
        <button
          onClick={handleRandomize}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
        >
          Random Occupancy
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>

      {lastBooking.length > 0 && (
        <div className="mb-4">
          <p className="text-green-700">Booked Rooms: {lastBooking.join(", ")}</p>
          <p className="text-sm text-gray-600">Total Travel Time: {travelTime}</p>
        </div>
      )}

      <RoomGrid hotel={hotel} />
    </main>
  );
}
