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
    const allRooms = Object.values(newHotel).flat();
    const shuffled = allRooms.sort(() => 0.5 - Math.random());
    shuffled.forEach((r, i) => {
      r.booked = i < roomCount;
    });
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
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Hotel Room Reservation</h1>

      <div className="flex gap-4 mb-6">
        <input
          type="number"
          value={roomCount}
          onChange={(e) => setRoomCount(Number(e.target.value))}
          min={1}
          max={5}
          className="border p-2 rounded w-32"
        />
        <button
          onClick={handleBooking}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Book
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
        <button
          onClick={handleRandomize}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
        >
          Random
        </button>
      </div>

      {lastBooking.length > 0 && (
        <div className="mb-4">
          <p className="text-green-700">
            Booked Rooms: {lastBooking.join(", ")}
          </p>
          <p className="text-sm text-gray-600">
            Total Travel Time: {travelTime}
          </p>
        </div>
      )}

      <div className="flex gap-6 items-start">
        {/* Elevator */}
        <div className="w-16 flex flex-col-reverse items-center">
          {Object.keys(hotel)
            .sort((a, b) => Number(a) - Number(b))
            .map((floor) => (
              <div
                key={floor}
                className="h-16 flex items-center justify-center border w-full text-sm font-bold"
              >
                {floor}
              </div>
            ))}
        </div>

        {/* Room Grid */}
        <RoomGrid hotel={hotel} />
      </div>
    </main>
  );
}
