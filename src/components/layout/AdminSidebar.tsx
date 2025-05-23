
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Sidebar, 
  SidebarContent,
  SidebarFooter, 
  SidebarHeader 
} from "@/components/ui/sidebar";
import { 
  Calendar, 
  Home, 
  Users,
  Calendar as CalendarIcon,
  Check,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const links = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/admin",
    },
    {
      title: "Events",
      icon: Calendar,
      href: "/admin/events",
    },
    {
      title: "Bookings",
      icon: Check,
      href: "/admin/bookings",
    },
    {
      title: "Users",
      icon: Users,
      href: "/admin/users",
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Sidebar className="border-r bg-eventease-50">
      <SidebarHeader className="px-6 py-3">
        <Link to="/" className="flex items-center space-x-2">
          <CalendarIcon className="h-6 w-6 text-eventease-600" />
          <span className="font-bold text-lg text-eventease-600">EventEase</span>
        </Link>
        <p className="text-xs text-gray-500 mt-1">Admin Dashboard</p>
      </SidebarHeader>
      <SidebarContent className="px-4 py-4">
        <div className="space-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "flex items-center py-2 px-3 text-sm rounded-md transition-colors",
                location.pathname === link.href
                  ? "bg-eventease-100 text-eventease-600 font-medium"
                  : "text-gray-600 hover:bg-eventease-100 hover:text-eventease-600"
              )}
            >
              <link.icon className="h-4 w-4 mr-3" />
              {link.title}
            </Link>
          ))}
        </div>
      </SidebarContent>
      <SidebarFooter className="px-4 py-4 mt-auto border-t">
        <Button
          variant="ghost"
          className="flex w-full items-center text-gray-600 hover:text-eventease-600 hover:bg-eventease-100 px-3 py-2"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-3" />
          <span>Logout</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
