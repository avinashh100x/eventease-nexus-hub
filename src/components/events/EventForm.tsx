
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useEvents, Event } from "@/contexts/EventContext";

// Event form schema
const eventSchema = z.object({
  name: z.string().min(5, {
    message: "Event name must be at least 5 characters.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  category: z.enum(["music", "tech", "workshop", "business", "fitness", "food", "art", "community"]),
  date: z.string().refine((date) => {
    return new Date(date) > new Date();
  }, {
    message: "Event date must be in the future",
  }),
  time: z.string(),
  location: z.string().min(5, {
    message: "Location must be at least 5 characters.",
  }),
  organizerName: z.string().min(3, {
    message: "Organizer name must be at least 3 characters.",
  }),
  price: z.coerce.number().min(0, {
    message: "Price cannot be negative.",
  }),
  image: z.string().url({
    message: "Please enter a valid image URL.",
  }),
  featured: z.boolean().optional(),
});

type EventFormValues = z.infer<typeof eventSchema>;

interface EventFormProps {
  event?: Event;
  onSuccess?: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ event, onSuccess }) => {
  const { addEvent, updateEvent } = useEvents();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = !!event;

  // Set default values based on whether we're editing or creating a new event
  const defaultValues: Partial<EventFormValues> = isEditMode
    ? {
        name: event.name,
        description: event.description,
        category: event.category,
        date: event.date,
        time: event.time,
        location: event.location,
        organizerName: event.organizerName,
        price: event.price,
        image: event.image,
        featured: event.featured || false,
      }
    : {
        name: "",
        description: "",
        category: "tech",
        date: "",
        time: "",
        location: "",
        organizerName: "",
        price: 0,
        image: "",
        featured: false,
      };

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues,
  });

  const onSubmit = (values: EventFormValues) => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      if (isEditMode && event) {
        // Ensure values has all required properties for Event type
        const updatedEvent = {
          name: values.name,
          description: values.description,
          category: values.category,
          date: values.date,
          time: values.time,
          location: values.location,
          organizerName: values.organizerName,
          price: values.price,
          image: values.image,
          featured: values.featured || false,
        };
        
        updateEvent(event.id, updatedEvent);
      } else {
        // Ensure values has all required properties for Event type
        const newEvent = {
          name: values.name,
          description: values.description,
          category: values.category,
          date: values.date,
          time: values.time,
          location: values.location,
          organizerName: values.organizerName,
          price: values.price,
          image: values.image,
          featured: values.featured || false,
        };
        
        addEvent(newEvent);
      }
      setIsSubmitting(false);
      
      if (onSuccess) {
        onSuccess();
      }
    }, 500); // Simulate API call
  };

  // Sample image URLs for quick selection
  const sampleImages = [
    "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop",
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{isEditMode ? "Edit Event" : "Create New Event"}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Tech Summit 2025" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="music">Music</SelectItem>
                        <SelectItem value="tech">Technology</SelectItem>
                        <SelectItem value="workshop">Workshop</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="fitness">Fitness</SelectItem>
                        <SelectItem value="food">Food & Drink</SelectItem>
                        <SelectItem value="art">Art</SelectItem>
                        <SelectItem value="community">Community</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your event in detail..."
                      className="min-h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Convention Center, San Francisco" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="organizerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organizer</FormLabel>
                    <FormControl>
                      <Input placeholder="Tech Innovators Association" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ticket Price ($)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" min="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image.jpg" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter a URL for the event image or choose from sample images below.
                  </FormDescription>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {sampleImages.map((image, index) => (
                      <div 
                        key={index} 
                        onClick={() => form.setValue("image", image)}
                        className={`cursor-pointer border-2 rounded-md overflow-hidden ${field.value === image ? 'border-eventease-500' : 'border-transparent'}`}
                      >
                        <img src={image} alt={`Sample ${index + 1}`} className="h-20 w-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="h-4 w-4 text-eventease-600 focus:ring-eventease-500 border-gray-300 rounded"
                    />
                  </FormControl>
                  <FormLabel className="mb-0">Feature this event on homepage</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CardFooter className="flex justify-end px-0">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    {isEditMode ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  isEditMode ? "Update Event" : "Create Event"
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EventForm;
