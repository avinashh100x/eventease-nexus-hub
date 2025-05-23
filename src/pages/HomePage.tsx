
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import EventCard from "@/components/events/EventCard";
import { useEvents } from "@/contexts/EventContext";
import { Calendar } from "lucide-react";

const HomePage: React.FC = () => {
  const { events } = useEvents();
  const navigate = useNavigate();
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    // Filter featured events
    const featured = events
      .filter(event => event.featured)
      .slice(0, 3);
    
    // Filter upcoming events (events with future dates)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const upcoming = events
      .filter(event => {
        const eventDate = new Date(event.date);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate >= today;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 6);
    
    setFeaturedEvents(featured);
    setUpcomingEvents(upcoming);
  }, [events]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover Amazing Events Near You
            </h1>
            <p className="text-xl mb-8">
              Find and book tickets for concerts, workshops, conferences, and more.
              Your next unforgettable experience starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-eventease-600 hover:bg-gray-100"
                onClick={() => navigate("/events")}
              >
                Browse Events
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Events</h2>
            <Link to="/events" className="text-eventease-600 hover:text-eventease-700">
              View all events →
            </Link>
          </div>
          {featuredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium">No featured events</h3>
              <p className="text-gray-500">
                Check back later for featured events or browse all events.
              </p>
            </div>
          )}
        </div>
      </section>

      <Separator />

      {/* Upcoming Events Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Upcoming Events</h2>
            <Link to="/events" className="text-eventease-600 hover:text-eventease-700">
              View all events →
            </Link>
          </div>
          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium">No upcoming events</h3>
              <p className="text-gray-500">
                Check back later for upcoming events.
              </p>
            </div>
          )}
          {upcomingEvents.length > 0 && (
            <div className="mt-8 text-center">
              <Button onClick={() => navigate("/events")}>
                View All Events
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["music", "tech", "workshop", "business", "fitness", "food", "art", "community"].map(
              (category) => (
                <Link
                  key={category}
                  to={`/events?category=${category}`}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 text-center"
                >
                  <h3 className="font-medium text-lg capitalize">{category}</h3>
                  <p className="text-gray-500 text-sm">
                    Explore {category} events
                  </p>
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-eventease-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Experience Amazing Events?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Sign up today and never miss out on the best events in your area.
          </p>
          <Button
            size="lg"
            className="bg-white text-eventease-600 hover:bg-gray-100"
            onClick={() => navigate("/login")}
          >
            Get Started
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
