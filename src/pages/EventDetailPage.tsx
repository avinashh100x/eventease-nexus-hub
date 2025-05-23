
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Tag, 
  Loader, 
  AlertTriangle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/ui/alert";
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { formatPrice, formatDate } from "@/lib/formatters";
import { useEvents } from "@/contexts/EventContext";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEventById, bookEvent, getUserBookings } = useEvents();
  const { isAuthenticated, user } = useAuth();
  const [isBooking, setIsBooking] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Get event details
  const event = id ? getEventById(id) : undefined;

  // Get user bookings if authenticated
  const userBookings = user ? getUserBookings(user.id) : [];
  
  // Check if user already booked this event
  const isAlreadyBooked = userBookings.some(booking => booking.eventId === id);

  // Format event date
  const formattedDate = event ? formatDate(event.date) : "";
  
  // Handle booking
  const handleBookEvent = () => {
    if (!isAuthenticated || !user || !event) return;
    
    setIsBooking(true);
    
    setTimeout(() => {
      bookEvent(event.id, user.id, user.name, user.email);
      setIsBooking(false);
      setIsDialogOpen(false);
    }, 1000);
  };

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <AlertTriangle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-4">Event Not Found</h1>
        <p className="text-gray-600 mb-8">
          The event you are looking for does not exist or has been removed.
        </p>
        <Button onClick={() => navigate("/events")}>Browse All Events</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Event Image */}
        <div className="rounded-lg overflow-hidden h-80 mb-8">
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Event Details */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-eventease-100 text-eventease-800 hover:bg-eventease-200">
                  {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                </Badge>
                {event.featured && (
                  <Badge variant="outline" className="border-eventease-500 text-eventease-600">
                    Featured
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold mb-2">{event.name}</h1>
              <p className="text-gray-600">
                Organized by <span className="font-medium">{event.organizerName}</span>
              </p>
            </div>

            <div className="space-y-4 text-gray-700">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-3 text-eventease-500" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-3 text-eventease-500" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-3 text-eventease-500" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center">
                <User className="h-5 w-5 mr-3 text-eventease-500" />
                <span>{event.organizerName}</span>
              </div>
              <div className="flex items-center">
                <Tag className="h-5 w-5 mr-3 text-eventease-500" />
                <span>
                  {formatPrice(event.price)}
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">About This Event</h2>
              <p className="text-gray-700 whitespace-pre-line">
                {event.description}
              </p>
            </div>
          </div>

          {/* Booking Card */}
          <div className="md:col-span-1 bg-white rounded-lg border p-6 h-fit sticky top-24">
            <h3 className="text-xl font-semibold mb-4">Event Details</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Date</span>
                <span>{formattedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time</span>
                <span>{event.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Location</span>
                <span className="text-right">{event.location}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Price</span>
                <span>{formatPrice(event.price)}</span>
              </div>
            </div>

            {isAuthenticated ? (
              isAlreadyBooked ? (
                <Alert className="bg-green-50 border-green-200 mb-4">
                  <AlertTitle className="font-medium text-green-800">
                    Already Booked
                  </AlertTitle>
                  <AlertDescription className="text-green-700">
                    You have already booked this event. Check your profile for details.
                  </AlertDescription>
                </Alert>
              ) : (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full">Book Now</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm Booking</DialogTitle>
                      <DialogDescription>
                        You are about to book the following event:
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <h4 className="font-medium mb-2">{event.name}</h4>
                      <div className="text-sm text-gray-600">
                        <div className="flex items-center mb-1">
                          <Calendar className="h-4 w-4 mr-2" />
                          {formattedDate} • {event.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {event.location}
                        </div>
                      </div>
                      <div className="mt-4 bg-gray-50 p-3 rounded-md">
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">Price</span>
                          <span>{formatPrice(event.price)}</span>
                        </div>
                        <div className="flex justify-between font-bold">
                          <span>Total</span>
                          <span>{formatPrice(event.price)}</span>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleBookEvent} disabled={isBooking}>
                        {isBooking ? (
                          <>
                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          "Confirm Booking"
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )
            ) : (
              <div className="space-y-4">
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Authentication Required</AlertTitle>
                  <AlertDescription>
                    Please log in to book this event.
                  </AlertDescription>
                </Alert>
                <Button onClick={() => navigate("/login")} className="w-full">
                  Log In to Book
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
