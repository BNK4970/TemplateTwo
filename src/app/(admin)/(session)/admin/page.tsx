"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { User } from "../../../../types/types";

const AdminPage: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user?.role !== "admin") {
      router.push("/dashboard");
    }
  }, [status, session, router]);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "admin") {
      const fetchUsers = async () => {
        try {
          const response = await fetch("/api/users", {
            method: 'GET',
          });
          if (!response.ok) {
            throw new Error("Erreur lors du chargement des utilisateurs");
          }
          const data: User[] = await response.json();
          setUsers(data);
        } catch (error: any) {
          setError(error.message);
        }
      };

      fetchUsers();
    }
  }, [status, session]);

  if (status === "loading") return <div>Loading...</div>;

  if (error) return <div>Erreur : {error}</div>;

  return (
    <>
      {status === "authenticated" && session?.user?.role === "admin" ? (
        <div className="w-full row-span-1 mt-16 px-[10%] pt-16 h-dashboard">
          <h1 className="bg-danger">User List</h1>
          <section>
            <table className="w-full text-left p-4">
              <thead className="p-4">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody className="p-4">
                {users.map((user) => (
                  <tr key={user.id} className="odd:bg-[rgb(var(--color-secondary),0.2)] p-4">
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      ) : null}
    </>
  );
};

export default AdminPage;
