"use client";
import React from "react";
import { Hotel } from "../utils/bookingUtils";

export default function RoomGrid({ hotel }: { hotel: Hotel }) {
  const sortedFloors = Object.entries(hotel).sort((a, b) => Number(b[0]) - Number(a[0]));

  return (
    <div className="flex flex-col mt-6 space-y-2">
      {sortedFloors.map(([floor, rooms]) => (
        <div key={floor} className="flex items-center gap-4">
          {/* Elevator */}
          <div className="w-12 h-12 bg-gray-700 text-white flex items-center justify-center rounded">
            {floor}
          </div>

          {/* Rooms on this floor */}
          <div className="flex gap-2">
            {rooms.map((r) => (
              <div
                key={r.number}
                className={`w-12 h-12 flex items-center justify-center rounded ${
                  r.booked ? "bg-red-500" : "bg-green-400"
                } text-white`}
              >
                {r.number}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
