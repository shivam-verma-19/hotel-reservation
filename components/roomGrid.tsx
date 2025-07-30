"use client";
import React from "react";
import { Hotel } from "../utils/bookingUtils";

export default function RoomGrid({ hotel }: { hotel: Hotel }) {
  return (
    <div className="flex flex-col-reverse gap-2">
      {Object.entries(hotel)
        .sort((a, b) => Number(b[0]) - Number(a[0]))
        .map(([floor, rooms]) => (
          <div key={floor} className="flex items-center gap-2 h-16">
            <h3 className="w-20 text-sm font-bold">Floor {floor}</h3>
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
