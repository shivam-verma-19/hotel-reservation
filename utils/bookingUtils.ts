export type Room = {
  number: number;
  booked: boolean;
  index: number;
};

export type Hotel = Record<number, Room[]>;

export function generateHotel(): Hotel {
  const hotel: Hotel = {};
  for (let floor = 1; floor <= 10; floor++) {
    const count = floor === 10 ? 7 : 10;
    hotel[floor] = Array.from({ length: count }, (_, i) => ({
      number: floor === 10 ? 1000 + i + 1 : floor * 100 + i + 1,
      booked: false,
      index: i,
    }));
  }
  return hotel;
}

function getCombinations<T>(arr: T[], k: number): T[][] {
  const res: T[][] = [];
  const recur = (start: number, combo: T[]) => {
    if (combo.length === k) {
      res.push([...combo]);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      combo.push(arr[i]);
      recur(i + 1, combo);
      combo.pop();
    }
  };
  recur(0, []);
  return res;
}

export function bookRooms(hotel: Hotel, count: number) {
  const allAvailable: { floor: number; room: Room }[] = [];

  for (const floor in hotel) {
    hotel[+floor].forEach((room) => {
      if (!room.booked) allAvailable.push({ floor: +floor, room });
    });
  }

  // Try same floor
  let bestSame = null;
  for (const [floorStr, rooms] of Object.entries(hotel)) {
    const available = rooms.filter((r) => !r.booked);
    for (let i = 0; i <= available.length - count; i++) {
      const group = available.slice(i, i + count);
      const time = group[count - 1].index - group[0].index;
      if (!bestSame || time < bestSame.time) {
        bestSame = { floor: +floorStr, rooms: group, time };
      }
    }
  }

  if (bestSame) {
    bestSame.rooms.forEach((r) => (r.booked = true));
    return {
      booked: bestSame.rooms.map((r) => r.number),
      travelTime: bestSame.time,
    };
  }

  // Try multi-floor
  if (allAvailable.length >= count) {
    const combinations = getCombinations(allAvailable, count);
    let bestCombo = null;
    for (const combo of combinations) {
      const floors = combo.map((r) => r.floor);
      const idx = combo.map((r) => r.room.index);
      const time =
        Math.max(...idx) - Math.min(...idx) +
        (Math.max(...floors) - Math.min(...floors)) * 2;

      if (!bestCombo || time < bestCombo.time) {
        bestCombo = { combo, time };
      }
    }

    if (bestCombo) {
      bestCombo.combo.forEach(({ floor, room }) => {
        const target = hotel[floor].find((r) => r.number === room.number);
        if (target) target.booked = true;
      });
      return {
        booked: bestCombo.combo.map((r) => r.room.number),
        travelTime: bestCombo.time,
      };
    }
  }

  return { booked: [], travelTime: 0 };
}
