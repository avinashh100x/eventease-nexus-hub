
import React from "react";
import { useNavigate } from "react-router-dom";
import EventForm from "@/components/events/EventForm";

const AdminNewEvent: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/admin/events");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Event</h1>
      <EventForm onSuccess={handleSuccess} />
    </div>
  );
};

export default AdminNewEvent;
