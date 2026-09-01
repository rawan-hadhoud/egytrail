import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "./AuthContext";

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  // Whenever the logged-in user changes, load their bookings from the server.
  useEffect(() => {
    if (!user) {
      setBookings([]);
      return;
    }

    setLoading(true);

    api
      .get(`/trips?userId=${user.id}`)
      .then((res) => setBookings(res.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [user]);

  // Returns { success: boolean, reason?: "no-user" }
  const addBooking = async (booking) => {
    if (!user) {
      return { success: false, reason: "no-user" };
    }

    try {
      const res = await api.post("/trips", {
        ...booking,
        userId: user.id,
        createdAt: new Date().toISOString()
      });

      setBookings((prev) => [...prev, res.data]);
      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false, reason: "error" };
    }
  };

  const removeBooking = async (id) => {
    try {
      await api.delete(`/trips/${id}`);
      setBookings((prev) => prev.filter((b) => b.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BookingContext.Provider
      value={{ bookings, loading, addBooking, removeBooking }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}
