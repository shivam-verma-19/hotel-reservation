"use client";
import { useState } from "react";
import { bookRooms, generateHotel, Hotel } from "../../utils/bookingUtils";
import RoomGrid from "../../components/roomGrid";

export default function Home() {
  const [hotel, setHotel] = useState<Hotel>(() => generateHotel());
  const [rooms, setRooms] = useState(1);
  const [result, setResult] = useState<{ booked: number[]; travelTime: number } | null>(null);

  const handleBook = () => {
    if (rooms < 1 || rooms > 5) return alert("Book 1 to 5 rooms");
    const updated = structuredClone(hotel);
    const res = bookRooms(updated, rooms);
    setHotel(updated);
    setResult(res);
  };

  const randomizeOccupancy = () => {
    const updated = generateHotel();
    Object.values(updated).forEach((floor) =>
      (floor as { booked: boolean }[]).forEach((r) => (r.booked = Math.random() < 0.3))
    );
    setHotel(updated);
    setResult(null);
  };

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">🏨 Hotel Room Reservation</h1>

      <div className="mt-4 space-x-2">
        <input
          type="number"
          min="1"
          max="5"
          value={rooms}
          onChange={(e) => setRooms(+e.target.value)}
          className="border p-1 rounded w-20"
        />
        <button onClick={handleBook} className="bg-blue-600 text-white px-3 py-1 rounded">
          Book
        </button>
        <button onClick={randomizeOccupancy} className="bg-gray-600 text-white px-3 py-1 rounded">
          Randomize
        </button>
      </div>

      {result && (
        <div className="mt-4">
          {result.booked.length ? (
            <p>
              ✅ Booked: {result.booked.join(", ")} <br />
              🕒 Travel Time: {result.travelTime} min
            </p>
          ) : (
            <p>No rooms available for this request.</p>
          )}
        </div>
      )}

      <RoomGrid hotel={hotel} />
    </main>
  );
}
