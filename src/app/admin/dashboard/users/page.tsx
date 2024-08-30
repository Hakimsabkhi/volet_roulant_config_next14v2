"use client";

import React, { useEffect, useState } from 'react';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<boolean>(false); // New state for action loading
  const [actionError, setActionError] = useState<string | null>(null); // New state for action errors
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // New state for success messages

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setError(null);
        const response = await fetch(`${process.env.NEXTAUTH_URL}/api/users/getallusers`);
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (id: string) => {
    setActionLoading(true);
    setActionError(null);
    setSuccessMessage(null);
    console.log("Deleting user with ID:", id);

    try {
      const response = await fetch(`${process.env.NEXTAUTH_URL}/api/users/deleteuserbyid`, {
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
      setSuccessMessage('User deleted successfully.');
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setActionLoading(false);
    }
  };

  const changeUserRole = async (userId: string, newRole: string) => {
    setActionLoading(true);
    setActionError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(`${process.env.NEXTAUTH_URL}/api/users/changeUserRole`, {
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
      setSuccessMessage('User role updated successfully.');
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4">
      {error && <div className="text-red-500">Error: {error}</div>}
      {actionError && <div className="text-red-500">Action Error: {actionError}</div>}
      {successMessage && <div className="text-green-500">{successMessage}</div>}
      
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
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">
                <select
                  value={user.role}
                  onChange={(e) => changeUserRole(user._id, e.target.value)}
                  className="bg-white border px-2 py-1"
                  disabled={actionLoading} // Disable during action
                >
                  <option value="Admin">Admin</option>
                  <option value="Consulter">Consulter</option>
                  <option value="Visiteur">Visiteur</option>
                </select>
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => deleteUser(user._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  disabled={actionLoading} // Disable during action
                >
                  {actionLoading ? 'Processing...' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
