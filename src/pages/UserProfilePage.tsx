
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEvents, Booking, Event } from "@/contexts/EventContext";
import { formatDate } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Check, Clock, MapPin, Calendar as CalendarIcon, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const UserProfilePage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { getUserBookings, getEventById } = useEvents();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (user) {
      const userBookings = getUserBookings(user.id);
      setBookings(userBookings);
    }
  }, [user, getUserBookings]);

  // Get event details for a booking
  const getEventDetails = (eventId: string): Event | undefined => {
    return getEventById(eventId);
  };

  // Redirect if user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Filter bookings by status
  const upcomingBookings = bookings.filter(
    (booking) => booking.status === "upcoming" || booking.status === "confirmed"
  );
  
  const pastBookings = bookings.filter(
    (booking) => booking.status === "attended" || booking.status === "cancelled"
  );

  // Status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>;
      case "upcoming":
        return <Badge className="bg-blue-100 text-blue-800">Upcoming</Badge>;
      case "attended":
        return <Badge className="bg-purple-100 text-purple-800">Attended</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Render booking card
  const renderBookingCard = (booking: Booking) => {
    const event = getEventDetails(booking.eventId);
    if (!event) return null;

    return (
      <Card key={booking.id} className="mb-4">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-36 h-24 rounded-md overflow-hidden flex-shrink-0">
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">{event.name}</h3>
                  <div className="text-sm text-gray-600 mt-1">
                    <div className="flex items-center mb-1">
                      <Calendar className="h-4 w-4 mr-2 text-eventease-500" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center mb-1">
                      <Clock className="h-4 w-4 mr-2 text-eventease-500" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center mb-1">
                      <MapPin className="h-4 w-4 mr-2 text-eventease-500" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  {getStatusBadge(booking.status)}
                  <div className="text-sm text-gray-500">
                    Booked on: {formatDate(booking.date)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="h-24 w-24 rounded-full bg-eventease-100 flex items-center justify-center text-eventease-600 text-2xl font-bold">
              {user?.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold">{user?.name}</h1>
              <p className="text-gray-600">{user?.email}</p>
              <p className="text-sm text-gray-500 mt-1">
                Account type: {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
              </p>
            </div>
          </div>
        </div>

        {/* Bookings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2 text-eventease-500" />
              My Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="upcoming">
              <TabsList className="mb-4">
                <TabsTrigger value="upcoming" className="flex items-center">
                  <Check className="h-4 w-4 mr-2" />
                  <span>Upcoming</span>
                  <span className="ml-2 bg-eventease-100 text-eventease-600 px-2 py-0.5 rounded-full text-xs">
                    {upcomingBookings.length}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="past" className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Past</span>
                  <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                    {pastBookings.length}
                  </span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="space-y-4">
                {upcomingBookings.length > 0 ? (
                  upcomingBookings.map(renderBookingCard)
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-1">No upcoming bookings</h3>
                    <p className="text-gray-500 mb-4">
                      You don't have any upcoming event bookings yet.
                    </p>
                    <Button variant="outline" onClick={() => window.location.href = "/events"}>
                      Browse Events
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="past" className="space-y-4">
                {pastBookings.length > 0 ? (
                  pastBookings.map(renderBookingCard)
                ) : (
                  <div className="text-center py-12">
                    <X className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-1">No past bookings</h3>
                    <p className="text-gray-500">
                      You don't have any past event bookings.
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfilePage;
