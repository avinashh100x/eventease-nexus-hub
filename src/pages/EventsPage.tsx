
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useEvents, Event } from "@/contexts/EventContext";
import EventCard from "@/components/events/EventCard";
import EventFilters from "@/components/events/EventFilters";
import { Calendar } from "lucide-react";

const EventsPage: React.FC = () => {
  const { events } = useEvents();
  const [searchParams] = useSearchParams();
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Get filter parameters from URL
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const sortBy = searchParams.get("sortBy");

    // Filter events based on URL parameters
    let result = [...events];

    // Apply category filter
    if (category) {
      result = result.filter((event) => event.category === category);
    }

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (event) =>
          event.name.toLowerCase().includes(searchLower) ||
          event.description.toLowerCase().includes(searchLower) ||
          event.location.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    if (sortBy) {
      switch (sortBy) {
        case "date-asc":
          result.sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          );
          break;
        case "date-desc":
          result.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          break;
        case "price-asc":
          result.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          result.sort((a, b) => b.price - a.price);
          break;
        default:
          break;
      }
    }

    setFilteredEvents(result);
  }, [events, searchParams]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Events</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters column */}
        <div className="lg:col-span-1">
          <EventFilters />
        </div>

        {/* Events grid */}
        <div className="lg:col-span-3">
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg border">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium">No events found</h3>
              <p className="text-gray-500">
                Try changing your search filters or check back later.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
