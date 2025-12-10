import React, { createContext, useContext, useState, useEffect } from "react";
import { format, addDays, startOfHour, addHours } from "date-fns";

// Types
export interface Doctor {
  id: number;
  name: string;
  specialization: string;
  region: string;
  verified: boolean;
  imageUrl: string;
  rating: number;
  availableSlots: number;
}

export interface Slot {
  id: number;
  doctorId: number;
  startTime: string; // ISO string
  endTime: string;   // ISO string
  status: "AVAILABLE" | "PENDING" | "CONFIRMED" | "FAILED";
}

export interface Booking {
  id: number;
  slotId: number;
  userId: number;
  status: "PENDING" | "CONFIRMED" | "FAILED";
  timestamp: string;
}

// Mock Data
const MOCK_DOCTORS: Doctor[] = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    specialization: "General Physician",
    region: "New York, NY",
    verified: true,
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300",
    rating: 4.9,
    availableSlots: 12
  },
  {
    id: 2,
    name: "Dr. James Wilson",
    specialization: "Cardiologist",
    region: "Chicago, IL",
    verified: true,
    imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300",
    rating: 4.8,
    availableSlots: 8
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialization: "Dermatologist",
    region: "Los Angeles, CA",
    verified: true,
    imageUrl: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300",
    rating: 4.9,
    availableSlots: 15
  },
  {
    id: 4,
    name: "Dr. Michael Chang",
    specialization: "Pediatrician",
    region: "Seattle, WA",
    verified: true,
    imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300",
    rating: 4.7,
    availableSlots: 5
  }
];

// Generate mock slots for the next 3 days
const generateMockSlots = (): Slot[] => {
  const slots: Slot[] = [];
  const today = new Date();
  let slotIdCounter = 1;

  MOCK_DOCTORS.forEach(doc => {
    for (let i = 0; i < 3; i++) {
      const day = addDays(today, i);
      // 9 AM to 5 PM
      for (let hour = 9; hour < 17; hour++) {
        if (Math.random() > 0.3) { // 70% availability
          const start = addHours(startOfHour(day), hour);
          const end = addHours(start, 1);
          slots.push({
            id: slotIdCounter++,
            doctorId: doc.id,
            startTime: start.toISOString(),
            endTime: end.toISOString(),
            status: Math.random() > 0.8 ? "CONFIRMED" : "AVAILABLE" // Some pre-booked
          });
        }
      }
    }
  });
  return slots;
};

// Context
interface AppContextType {
  doctors: Doctor[];
  slots: Slot[];
  bookings: Booking[];
  bookSlot: (slotId: number) => Promise<boolean>;
  currentUser: { id: number; name: string };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [doctors] = useState<Doctor[]>(MOCK_DOCTORS);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const currentUser = { id: 101, name: "Guest User" };

  useEffect(() => {
    setSlots(generateMockSlots());
  }, []);

  const bookSlot = async (slotId: number): Promise<boolean> => {
    // Simulate API latency
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Optimistic update
    const slotIndex = slots.findIndex(s => s.id === slotId);
    if (slotIndex === -1 || slots[slotIndex].status !== "AVAILABLE") {
      return false;
    }

    const updatedSlots = [...slots];
    updatedSlots[slotIndex].status = "CONFIRMED";
    setSlots(updatedSlots);

    const newBooking: Booking = {
      id: Date.now(),
      slotId,
      userId: currentUser.id,
      status: "CONFIRMED",
      timestamp: new Date().toISOString()
    };
    setBookings([...bookings, newBooking]);
    
    return true;
  };

  return (
    <AppContext.Provider value={{ doctors, slots, bookings, bookSlot, currentUser }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
