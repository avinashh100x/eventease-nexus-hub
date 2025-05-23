
import React from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";
import { Event } from "@/contexts/EventContext";
import { formatDate } from "@/lib/formatters";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const {
    id,
    name,
    category,
    date,
    time,
    location,
    price,
    image,
  } = event;

  // Category color mapping
  const categoryColors: Record<string, string> = {
    music: "bg-blue-100 text-blue-800",
    tech: "bg-purple-100 text-purple-800",
    workshop: "bg-green-100 text-green-800",
    business: "bg-amber-100 text-amber-800",
    fitness: "bg-red-100 text-red-800",
    food: "bg-orange-100 text-orange-800",
    art: "bg-pink-100 text-pink-800",
    community: "bg-teal-100 text-teal-800",
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <Link to={`/events/${id}`} className="h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </Link>
      <CardContent className="p-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <Badge
            className={`${
              categoryColors[category] || "bg-gray-100 text-gray-800"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Badge>
          <span className="font-bold text-lg">
            ${price.toFixed(2)}
          </span>
        </div>
        <Link to={`/events/${id}`}>
          <h3 className="font-bold text-lg mb-2 hover:text-eventease-600 transition-colors">
            {name}
          </h3>
        </Link>

        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-eventease-500" />
            <span>{formatDate(date)} • {time}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-eventease-500" />
            <span className="truncate">{location}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link
          to={`/events/${id}`}
          className="w-full inline-flex justify-center items-center rounded-md bg-eventease-600 px-4 py-2 text-sm font-medium text-white hover:bg-eventease-700 transition-colors"
        >
          View Details
        </Link>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
