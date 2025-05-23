
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Calendar, 
  Edit, 
  Trash2, 
  Plus, 
  Search, 
  Check,
  Loader
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useEvents } from "@/contexts/EventContext";
import { formatDate } from "@/lib/formatters";

const AdminEvents: React.FC = () => {
  const { events, deleteEvent, getEventBookings } = useEvents();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Filter events based on search term
  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Check if an event has bookings
  const hasBookings = (eventId: string) => {
    return getEventBookings(eventId).length > 0;
  };

  // Format date display
  const displayDate = (dateString: string) => {
    return formatDate(dateString);
  };

  // Confirm event deletion
  const handleDeleteEvent = () => {
    if (!eventToDelete) return;
    
    setIsDeleting(true);
    
    setTimeout(() => {
      deleteEvent(eventToDelete);
      setEventToDelete(null);
      setIsDeleting(false);
    }, 800); // Simulate API call
  };

  // Get badge color for category
  const getCategoryBadge = (category: string) => {
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
      <Badge className={categoryColors[category] || "bg-gray-100 text-gray-800"}>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Events</h1>
        <Button onClick={() => navigate("/admin/events/new")} className="mt-4 md:mt-0">
          <Plus className="h-4 w-4 mr-2" /> Add New Event
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">All Events</h2>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-full md:w-[300px]"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Event Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Bookings</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => {
                  const bookingsCount = getEventBookings(event.id).length;
                  return (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">
                        <Link
                          to={`/events/${event.id}`}
                          className="hover:text-eventease-600 transition-colors inline-flex items-center"
                        >
                          <span className="truncate max-w-[250px] inline-block">{event.name}</span>
                          {event.featured && (
                            <Badge variant="outline" className="ml-2 border-eventease-500 text-eventease-600 text-xs">
                              Featured
                            </Badge>
                          )}
                        </Link>
                      </TableCell>
                      <TableCell>{getCategoryBadge(event.category)}</TableCell>
                      <TableCell>{displayDate(event.date)}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="secondary">{bookingsCount}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/admin/events/edit/${event.id}`)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4 text-gray-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEventToDelete(event.id)}
                            className="h-8 w-8 p-0 text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <Calendar className="h-10 w-10 mb-2 text-gray-400" />
                      <div className="text-lg font-medium">No events found</div>
                      <p className="text-sm">
                        {searchTerm
                          ? `No events match "${searchTerm}"`
                          : "No events have been created yet"}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!eventToDelete} onOpenChange={() => setEventToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this event? 
              {eventToDelete && hasBookings(eventToDelete) && (
                <span className="text-red-500 block mt-2">
                  Warning: This event has active bookings that will be cancelled.
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEventToDelete(null)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteEvent}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Event
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminEvents;
