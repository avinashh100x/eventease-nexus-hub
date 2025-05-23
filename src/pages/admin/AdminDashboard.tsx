
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Users, CalendarCheck, Loader } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEvents, Event, Booking } from "@/contexts/EventContext";
import { Bar } from "recharts";
import { Chart } from "@/components/ui/chart";

const AdminDashboard: React.FC = () => {
  const { events, bookings } = useEvents();
  const [isLoading, setIsLoading] = useState(true);

  // Simulating data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Count upcoming events
  const upcomingEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventDate >= today;
  }).length;

  // Organize bookings by event
  const bookingsByEvent = bookings.reduce((acc, booking) => {
    if (!acc[booking.eventId]) {
      acc[booking.eventId] = 0;
    }
    acc[booking.eventId]++;
    return acc;
  }, {} as Record<string, number>);

  // Get top events by bookings
  const topEvents = Object.entries(bookingsByEvent)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([eventId, count]) => {
      const event = events.find((e) => e.id === eventId);
      return {
        name: event ? event.name : "Unknown Event",
        bookings: count,
      };
    });

  // Prepare chart data for bookings by category
  const bookingsByCategory = events.reduce((acc, event) => {
    const categoryBookings = bookings.filter((b) => b.eventId === event.id).length;
    if (!acc[event.category]) {
      acc[event.category] = 0;
    }
    acc[event.category] += categoryBookings;
    return acc;
  }, {} as Record<string, number>);

  const categoryChartData = Object.entries(bookingsByCategory)
    .map(([category, count]) => ({
      name: category.charAt(0).toUpperCase() + category.slice(1),
      value: count,
    }));

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-eventease-600" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div>
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle className="text-sm font-medium">
                  Total Events
                </CardTitle>
                <CardDescription>
                  All events in the system
                </CardDescription>
              </div>
              <Calendar className="h-5 w-5 text-eventease-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{events.length}</div>
            </CardContent>
            <CardFooter>
              <Link to="/admin/events">
                <Button variant="link" className="p-0 h-auto text-eventease-600">
                  View all events
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle className="text-sm font-medium">
                  Upcoming Events
                </CardTitle>
                <CardDescription>
                  Events yet to take place
                </CardDescription>
              </div>
              <CalendarCheck className="h-5 w-5 text-eventease-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{upcomingEvents}</div>
            </CardContent>
            <CardFooter>
              <Link to="/admin/events">
                <Button variant="link" className="p-0 h-auto text-eventease-600">
                  Manage events
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle className="text-sm font-medium">
                  Total Bookings
                </CardTitle>
                <CardDescription>
                  All event bookings
                </CardDescription>
              </div>
              <Users className="h-5 w-5 text-eventease-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{bookings.length}</div>
            </CardContent>
            <CardFooter>
              <Link to="/admin/bookings">
                <Button variant="link" className="p-0 h-auto text-eventease-600">
                  View all bookings
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Top Events */}
          <Card>
            <CardHeader>
              <CardTitle>Top Events</CardTitle>
              <CardDescription>Events with most bookings</CardDescription>
            </CardHeader>
            <CardContent>
              {topEvents.length > 0 ? (
                <Chart
                  type="bar"
                  data={topEvents}
                  index="name"
                  categories={["bookings"]}
                  colors={["#6A3DE8"]}
                  valueFormatter={(value) => `${value} bookings`}
                  className="h-64"
                />
              ) : (
                <div className="flex items-center justify-center h-64 text-gray-500">
                  No bookings data available
                </div>
              )}
            </CardContent>
          </Card>

          {/* Bookings by Category */}
          <Card>
            <CardHeader>
              <CardTitle>Bookings by Category</CardTitle>
              <CardDescription>Distribution across event types</CardDescription>
            </CardHeader>
            <CardContent>
              {categoryChartData.length > 0 ? (
                <Chart
                  type="pie"
                  data={categoryChartData}
                  index="name"
                  categories={["value"]}
                  colors={["#6A3DE8", "#9A7AF3", "#B9A7F8", "#D5CCFB", "#E9E4FD"]}
                  valueFormatter={(value) => `${value} bookings`}
                  className="h-64"
                />
              ) : (
                <div className="flex items-center justify-center h-64 text-gray-500">
                  No category data available
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common management tasks</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Link to="/admin/events/new">
              <Button>Add New Event</Button>
            </Link>
            <Link to="/admin/events">
              <Button variant="outline">Manage Events</Button>
            </Link>
            <Link to="/admin/bookings">
              <Button variant="outline">View Bookings</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
