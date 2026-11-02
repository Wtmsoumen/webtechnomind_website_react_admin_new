"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminLayout from "@/components/AdminLayout";
import PageHeader from "@/components/PageHeader";
import apiClient from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import toast from "react-hot-toast";

interface UserRecord {
  id: number | string;
  name?: string;
  email?: string;
  mobile?: string;
  role_id?: number | string;
  status?: number | string;
  profile_photo?: string | null;
}

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_Image_URL || "";

function getPhotoUrl(photo: string) {
  if (/^(https?:)?\/\//i.test(photo)) return photo;
  return `${IMAGE_BASE_URL}${photo.startsWith("/") ? "" : "/"}${photo}`;
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [search, setSearch] = useState("");
  const [roleId, setRoleId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const timer = window.setTimeout(async () => {
      setLoading(true);
      try {
        const params: Record<string, string> = {};
        if (search.trim()) params.search = search.trim();
        if (roleId.trim()) params.role_id = roleId.trim();
        const { data } = await apiClient.get(endpoints.admin_users, { params });
        const result = data.response_data?.data ?? data.response_data ?? data.data ?? [];
        if (active) setUsers(Array.isArray(result) ? result : []);
      } catch {
        if (active) toast.error("Failed to load users");
      } finally {
        if (active) setLoading(false);
      }
    }, 250);

    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [search, roleId]);

  return (
    <AdminLayout>
      <PageHeader title="Users" buttonLabel="Add User" buttonHref="/users/add" />

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-gray-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-500"><span className="font-medium text-gray-900">{users.length}</span> users</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="user-search">Search users</label>
            <input id="user-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by keyword..." className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-primary-500 sm:w-64" />
            <label className="sr-only" htmlFor="user-role-filter">Filter by role ID</label>
            <input id="user-role-filter" type="number" min="1" step="1" value={roleId} onChange={(event) => setRoleId(event.target.value)} placeholder="Role ID" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-primary-500 sm:w-32" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-6 py-3 font-semibold">User</th>
                <th className="px-6 py-3 font-semibold">Email</th>
                <th className="px-6 py-3 font-semibold">Mobile</th>
                <th className="px-6 py-3 font-semibold">Role ID</th>
                <th className="px-6 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-500">Loading users…</td></tr>
              ) : users.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-500">No users found.</td></tr>
              ) : users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/80">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {user.profile_photo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={getPhotoUrl(user.profile_photo)} alt="" className="h-9 w-9 rounded-full object-cover" />
                      ) : <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-50 font-semibold text-primary-600">{user.name?.charAt(0).toUpperCase() || "?"}</span>}
                      <span className="font-medium text-gray-900">{user.name || "—"}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{user.email || "—"}</td>
                  <td className="px-6 py-4 text-gray-600">{user.mobile || "—"}</td>
                  <td className="px-6 py-4 text-gray-600">{user.role_id ?? "—"}</td>
                  <td className="px-6 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${String(user.status) === "1" || String(user.status).toLowerCase() === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>{String(user.status) === "1" ? "Active" : String(user.status) === "0" ? "Inactive" : user.status || "—"}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-gray-100 px-6 py-3 text-xs text-gray-400">Need to add someone? <Link href="/users/add" className="font-medium text-primary-600 hover:underline">Add a user</Link></div>
      </section>
    </AdminLayout>
  );
}
