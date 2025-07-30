"use client";
import React from "react";
import { Hotel } from "../utils/bookingUtils";

export default function RoomGrid({ hotel }: { hotel: Hotel }) {
  return (
    <div className="space-y-4 mt-6">
      {Object.entries(hotel).map(([floor, rooms]) => (
        <div key={floor}>
          <h3 className="font-bold">Floor {floor}</h3>
          <div className="flex gap-2 mt-1">
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
