
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import EventForm from "@/components/events/EventForm";
import { useEvents } from "@/contexts/EventContext";
import { AlertTriangle } from "lucide-react";

const AdminEditEvent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEventById } = useEvents();
  
  // Get event details
  const event = id ? getEventById(id) : undefined;

  const handleSuccess = () => {
    navigate("/admin/events");
  };

  if (!event) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Event not found</AlertTitle>
          <AlertDescription>
            The event you are trying to edit could not be found.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Event</h1>
      <EventForm event={event} onSuccess={handleSuccess} />
    </div>
  );
};

export default AdminEditEvent;
