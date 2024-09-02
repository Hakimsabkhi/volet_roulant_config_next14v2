"use client";

import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from "@/components/LoadingSpinner";
import { useSession } from "next-auth/react";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const Users: React.FC = () => {
  const { data: session } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const isSuperAdmin = session?.user?.role === "SuperAdmin";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`/api/users/getallusers`);
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (id: string) => {
    setActionLoading(id);
    console.log("Deleting user with ID:", id);

    try {
      const response = await fetch(`/api/users/deleteuserbyid`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Error deleting data");
      }

      setUsers((prevUsers) => prevUsers.filter(user => user._id !== id));
      toast.success('User deleted successfully.');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setActionLoading(null);
    }
  };

  const changeUserRole = async (userId: string, newRole: string) => {
    setActionLoading(userId);

    try {
      const response = await fetch(`/api/users/changeUserRole`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, newRole }),
      });

      if (!response.ok) {
        throw new Error('Failed to change user role');
      }

      setUsers(users => users.map(user => 
        user._id === userId ? { ...user, role: newRole } : user
      ));
      toast.success('User role updated successfully.');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="h-full">
      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td className="border px-2 py-2">{user.email}</td>
              <td className="border px-2 py-2">
                <select
                  value={user.role}
                  onChange={(e) => changeUserRole(user._id, e.target.value)}
                  className="bg-white border px-2 py-1 w-full max-w-[150px]"
                  disabled={actionLoading === user._id} // Disable only during the action for this user
                >
                  {isSuperAdmin && <option value="Admin">Admin</option>}
                  <option value="Consulter">Consulter</option>
                  <option value="Visiteur">Visiteur</option>
                </select>
              </td>
              <td className="border px-2 py-2 text-center">
                <button
                  onClick={() => deleteUser(user._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded w-full max-w-[120px]"
                  disabled={actionLoading === user._id} // Disable only during the action for this user
                  style={{ minWidth: '120px' }} // Ensure fixed width
                >
                  {actionLoading === user._id ? 'Processing...' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default Users;