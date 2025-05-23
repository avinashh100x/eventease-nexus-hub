
import { EventCategory } from "@/contexts/EventContext";

// Function to format date in a user-friendly way
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Function to format price
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

// Get human-readable category name
export function getCategoryName(category: EventCategory): string {
  const categoryMap: Record<EventCategory, string> = {
    music: "Music",
    tech: "Technology",
    workshop: "Workshop",
    business: "Business",
    fitness: "Fitness",
    food: "Food & Drink",
    art: "Arts",
    community: "Community",
  };
  
  return categoryMap[category] || category.charAt(0).toUpperCase() + category.slice(1);
}

// Format date range for display
export function formatDateRange(startDate: string, endDate?: string): string {
  if (!endDate) return formatDate(startDate);
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    // Same month and year
    return `${start.toLocaleDateString("en-US", { month: "long", day: "numeric" })} - ${end.getDate()}, ${end.getFullYear()}`;
  }
  
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}
