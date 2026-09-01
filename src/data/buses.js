// One bus/transport option per destination from Cairo (the common hub).
// Cairo itself has no bus option since it's the starting point.
export const buses = [
  { id: 1, destinationId: 1, company: "GoBus", from: "Cairo", departure: "23:00", arrival: "07:00", price: 12 },
  { id: 2, destinationId: 2, company: "GoBus", from: "Cairo", departure: "22:00", arrival: "08:00", price: 15 },
  { id: 3, destinationId: 3, company: "West & Mid Delta Bus", from: "Cairo", departure: "20:00", arrival: "06:00", price: 10 },
  { id: 4, destinationId: 4, company: "GoBus", from: "Cairo", departure: "00:00", arrival: "07:00", price: 14 },
  { id: 5, destinationId: 5, company: "GoBus", from: "Cairo", departure: "21:00", arrival: "09:00", price: 18 },
  { id: 7, destinationId: 7, company: "West Delta Bus", from: "Cairo", departure: "09:00", arrival: "12:00", price: 6 },
  { id: 8, destinationId: 8, company: "GoBus", from: "Cairo", departure: "23:30", arrival: "06:30", price: 13 }
];

export function getBusByDestination(destinationId) {
  return buses.find((b) => b.destinationId === destinationId) || null;
}
