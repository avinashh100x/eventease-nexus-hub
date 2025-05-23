
import React, { useState, useEffect } from "react";
import { User, Search, Users, Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useEvents } from "@/contexts/EventContext";

// Sample users data for demo (in a real app, this would come from an API)
const sampleUsers = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@eventease.com",
    role: "admin",
  },
  {
    id: "2",
    name: "John Doe",
    email: "user@eventease.com",
    role: "user",
  },
  {
    id: "3",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "user",
  },
  {
    id: "4",
    name: "Mike Johnson",
    email: "mike.j@example.com",
    role: "user",
  },
];

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState(sampleUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  const { getUserBookings } = useEvents();

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Filter users based on search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get booking count for a user
  const getUserBookingCount = (userId: string) => {
    return getUserBookings(userId).length;
  };

  // Get role badge
  const getRoleBadge = (role: string) => {
    return role === "admin" ? (
      <Badge className="bg-purple-100 text-purple-800">Admin</Badge>
    ) : (
      <Badge className="bg-blue-100 text-blue-800">User</Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-eventease-600" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">All Users</h2>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-full md:w-[250px]"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Bookings</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary">
                        {getUserBookingCount(user.id)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <Users className="h-10 w-10 mb-2 text-gray-400" />
                      <div className="text-lg font-medium">No users found</div>
                      <p className="text-sm">
                        {searchTerm
                          ? `No users match "${searchTerm}"`
                          : "No users have been created yet"}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
