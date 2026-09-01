// Two simple hotel options per destination, keyed by destinationId.
export const hotels = [
  // Dahab (1)
  { id: 101, destinationId: 1, name: "Dahab Lagoon Resort", stars: 4, pricePerNight: 40, amenities: ["Sea view", "Free WiFi", "Breakfast included"] },
  { id: 102, destinationId: 1, name: "Bedouin Camp Dahab", stars: 3, pricePerNight: 25, amenities: ["Beach access", "Bonfire nights"] },

  // Luxor (2)
  { id: 201, destinationId: 2, name: "Nile Palace Luxor", stars: 5, pricePerNight: 70, amenities: ["Nile view", "Pool", "Breakfast included"] },
  { id: 202, destinationId: 2, name: "Karnak Inn", stars: 3, pricePerNight: 35, amenities: ["Near temples", "Free WiFi"] },

  // Siwa Oasis (3)
  { id: 301, destinationId: 3, name: "Siwa Oasis Eco Lodge", stars: 4, pricePerNight: 45, amenities: ["Natural spring pool", "Desert view"] },
  { id: 302, destinationId: 3, name: "Shali Lodge", stars: 3, pricePerNight: 30, amenities: ["Traditional architecture", "Breakfast included"] },

  // Sharm El Sheikh (4)
  { id: 401, destinationId: 4, name: "Sharm Red Sea Resort", stars: 5, pricePerNight: 90, amenities: ["Private beach", "Diving center", "All-inclusive"] },
  { id: 402, destinationId: 4, name: "Naama Bay Inn", stars: 3, pricePerNight: 45, amenities: ["Near nightlife", "Free WiFi"] },

  // Aswan (5)
  { id: 501, destinationId: 5, name: "Aswan Nile View Hotel", stars: 4, pricePerNight: 55, amenities: ["Nile view", "Rooftop restaurant"] },
  { id: 502, destinationId: 5, name: "Nubian House", stars: 3, pricePerNight: 30, amenities: ["Nubian decor", "Breakfast included"] },

  // Cairo (6)
  { id: 601, destinationId: 6, name: "Giza Pyramids View Hotel", stars: 5, pricePerNight: 60, amenities: ["Pyramids view", "Pool", "Breakfast included"] },
  { id: 602, destinationId: 6, name: "Downtown Cairo Inn", stars: 3, pricePerNight: 30, amenities: ["Central location", "Free WiFi"] },

  // Alexandria (7)
  { id: 701, destinationId: 7, name: "Corniche Sea View Hotel", stars: 4, pricePerNight: 50, amenities: ["Sea view", "Breakfast included"] },
  { id: 702, destinationId: 7, name: "Alexandria Boutique Stay", stars: 3, pricePerNight: 35, amenities: ["Historic district", "Free WiFi"] },

  // Hurghada (8)
  { id: 801, destinationId: 8, name: "Hurghada Beach Resort", stars: 5, pricePerNight: 85, amenities: ["Private beach", "Diving center", "All-inclusive"] },
  { id: 802, destinationId: 8, name: "Red Sea Inn", stars: 3, pricePerNight: 40, amenities: ["Near marina", "Free WiFi"] }
];

export function getHotelsByDestination(destinationId) {
  return hotels.filter((h) => h.destinationId === destinationId);
}
