
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

// Event category types
export type EventCategory = 
  "music" | 
  "tech" | 
  "workshop" | 
  "business" | 
  "fitness" | 
  "food" |
  "art" |
  "community";

// Booking status
export type BookingStatus = "confirmed" | "upcoming" | "attended" | "cancelled";

// Event interface
export interface Event {
  id: string;
  name: string;
  description: string;
  category: EventCategory;
  date: string;
  time: string;
  location: string;
  organizerName: string;
  price: number;
  image: string;
  featured?: boolean;
}

// Booking interface
export interface Booking {
  id: string;
  eventId: string;
  userId: string;
  userName: string;
  userEmail: string;
  date: string;
  status: BookingStatus;
}

// Context interface
interface EventContextType {
  events: Event[];
  bookings: Booking[];
  addEvent: (event: Omit<Event, "id">) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  bookEvent: (eventId: string, userId: string, userName: string, userEmail: string) => void;
  updateBookingStatus: (bookingId: string, status: BookingStatus) => void;
  getUserBookings: (userId: string) => Booking[];
  getEventBookings: (eventId: string) => Booking[];
  getEventById: (id: string) => Event | undefined;
}

// Create context
const EventContext = createContext<EventContextType | undefined>(undefined);

// Sample data for events
const sampleEvents: Event[] = [
  {
    id: "1",
    name: "Tech Summit 2025",
    description: "Join us for the biggest tech summit of the year featuring keynotes from industry leaders and hands-on workshops.",
    category: "tech",
    date: "2025-07-15",
    time: "09:00 AM",
    location: "Convention Center, San Francisco",
    organizerName: "Tech Innovators Association",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&auto=format&fit=crop",
    featured: true
  },
  {
    id: "2",
    name: "Music Festival Weekend",
    description: "Three days of amazing performances from top artists across multiple stages in a beautiful outdoor setting.",
    category: "music",
    date: "2025-06-10",
    time: "04:00 PM",
    location: "Central Park, New York",
    organizerName: "Harmony Productions",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&auto=format&fit=crop"
  },
  {
    id: "3",
    name: "Startup Workshop",
    description: "Learn essential skills for launching your startup from successful entrepreneurs and venture capitalists.",
    category: "workshop",
    date: "2025-08-20",
    time: "10:00 AM",
    location: "Innovation Hub, Austin",
    organizerName: "Entrepreneur Network",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop",
    featured: true
  },
  {
    id: "4",
    name: "Business Conference",
    description: "Connect with industry leaders and peers at this premier business networking event.",
    category: "business",
    date: "2025-09-05",
    time: "08:00 AM",
    location: "Grand Hotel, Chicago",
    organizerName: "Business Leadership Council",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop"
  },
  {
    id: "5",
    name: "Fitness Expo",
    description: "Discover the latest fitness trends, products, and techniques with demonstrations from fitness experts.",
    category: "fitness",
    date: "2025-05-30",
    time: "09:00 AM",
    location: "Sports Complex, Miami",
    organizerName: "Health & Fitness Association",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop"
  },
  {
    id: "6",
    name: "Culinary Festival",
    description: "Taste extraordinary dishes prepared by renowned chefs and discover new culinary trends.",
    category: "food",
    date: "2025-10-10",
    time: "11:00 AM",
    location: "Waterfront Plaza, Seattle",
    organizerName: "Gourmet Guild",
    price: 75.00,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop"
  }
];

// Sample bookings
const sampleBookings: Booking[] = [
  {
    id: "1",
    eventId: "1",
    userId: "2",
    userName: "John Doe",
    userEmail: "user@eventease.com",
    date: "2025-05-20",
    status: "upcoming"
  },
  {
    id: "2",
    eventId: "3",
    userId: "2",
    userName: "John Doe",
    userEmail: "user@eventease.com",
    date: "2025-05-19",
    status: "confirmed"
  }
];

// Provider component
export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { toast } = useToast();

  // Load initial data
  useEffect(() => {
    // In a real app, this would be an API call
    const savedEvents = localStorage.getItem("events");
    const savedBookings = localStorage.getItem("bookings");
    
    setEvents(savedEvents ? JSON.parse(savedEvents) : sampleEvents);
    setBookings(savedBookings ? JSON.parse(savedBookings) : sampleBookings);
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem("events", JSON.stringify(events));
    }
  }, [events]);

  useEffect(() => {
    if (bookings.length > 0) {
      localStorage.setItem("bookings", JSON.stringify(bookings));
    }
  }, [bookings]);

  // Add a new event
  const addEvent = (event: Omit<Event, "id">) => {
    const newEvent = {
      ...event,
      id: Date.now().toString(),
    };
    setEvents([...events, newEvent]);
    toast({
      title: "Event Added",
      description: `${newEvent.name} has been successfully added.`,
    });
  };

  // Update an event
  const updateEvent = (id: string, updatedEventData: Partial<Event>) => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, ...updatedEventData } : event
    ));
    toast({
      title: "Event Updated",
      description: "The event has been successfully updated.",
    });
  };

  // Delete an event
  const deleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
    // Also remove any bookings for this event
    setBookings(bookings.filter(booking => booking.eventId !== id));
    toast({
      title: "Event Deleted",
      description: "The event has been successfully deleted.",
    });
  };

  // Book an event
  const bookEvent = (eventId: string, userId: string, userName: string, userEmail: string) => {
    const event = events.find(e => e.id === eventId);
    if (!event) {
      toast({
        title: "Booking Failed",
        description: "Event not found.",
        variant: "destructive",
      });
      return;
    }
    
    // Check if user has already booked this event
    const existingBooking = bookings.find(b => b.eventId === eventId && b.userId === userId);
    if (existingBooking) {
      toast({
        title: "Already Booked",
        description: "You have already booked this event.",
        variant: "destructive",
      });
      return;
    }

    const newBooking: Booking = {
      id: Date.now().toString(),
      eventId,
      userId,
      userName,
      userEmail,
      date: new Date().toISOString().split('T')[0],
      status: "confirmed",
    };
    
    setBookings([...bookings, newBooking]);
    toast({
      title: "Booking Confirmed",
      description: `You have successfully booked ${event.name}.`,
    });
  };

  // Update booking status
  const updateBookingStatus = (bookingId: string, status: BookingStatus) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status } : booking
    ));
    toast({
      title: "Booking Updated",
      description: `Booking status changed to ${status}.`,
    });
  };

  // Get bookings for a specific user
  const getUserBookings = (userId: string) => {
    return bookings.filter(booking => booking.userId === userId);
  };

  // Get bookings for a specific event
  const getEventBookings = (eventId: string) => {
    return bookings.filter(booking => booking.eventId === eventId);
  };

  // Get event by ID
  const getEventById = (id: string) => {
    return events.find(event => event.id === id);
  };

  // Context value
  const value = {
    events,
    bookings,
    addEvent,
    updateEvent,
    deleteEvent,
    bookEvent,
    updateBookingStatus,
    getUserBookings,
    getEventBookings,
    getEventById,
  };

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
};

// Hook to use the event context
export const useEvents = () => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error("useEvents must be used within an EventProvider");
  }
  return context;
};
