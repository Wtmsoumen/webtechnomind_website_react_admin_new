"use client";

import { useState, useMemo } from "react";
import {
  HiOutlineSearch,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineSortAscending,
  HiOutlineSortDescending,
} from "react-icons/hi";

interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  pageSize?: number;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  actions?: boolean;
}

export default function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  pageSize = 10,
  onEdit,
  onDelete,
  actions = true,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const filtered = useMemo(() => {
    if (!search) return data;
    const q = search.toLowerCase();
    return data.filter((row) =>
      columns.some((col) =>
        String(row[col.key] ?? "")
          .toLowerCase()
          .includes(q)
      )
    );
  }, [data, search, columns]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const aVal = String(a[sortKey] ?? "");
      const bVal = String(b[sortKey] ?? "");
      return sortDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    });
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paged = sorted.slice(page * pageSize, (page + 1) * pageSize);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="text-sm text-gray-500">
          <span className="font-medium text-gray-900">{sorted.length}</span> total records
        </div>
        <div className="relative">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            className="pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg w-64 focus:ring-2 focus:ring-primary-500 focus:bg-white focus:border-primary-300 outline-none transition-all"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-6 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider w-12">
                #
              </th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable !== false && handleSort(col.key)}
                  className={`text-left px-6 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider ${
                    col.sortable !== false ? "cursor-pointer hover:text-gray-900 select-none group" : ""
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {col.label}
                    {col.sortable !== false && (
                      sortKey === col.key ? (
                        sortDir === "asc" ? (
                          <HiOutlineSortAscending className="w-4 h-4 text-primary-500" />
                        ) : (
                          <HiOutlineSortDescending className="w-4 h-4 text-primary-500" />
                        )
                      ) : (
                        <HiOutlineSortAscending className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )
                    )}
                  </span>
                </th>
              ))}
              {actions && (
                <th className="text-left px-6 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paged.map((row, i) => (
              <tr
                key={i}
                className="hover:bg-gray-50/80 transition-colors"
              >
                <td className="px-6 py-4 text-gray-400 text-xs font-medium">
                  {page * pageSize + i + 1}
                </td>
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4 text-gray-700">
                    {col.render ? col.render(row) : String(row[col.key] ?? "")}
                  </td>
                ))}
                {actions && (
                  <td className="px-6 py-4">
                    <div className="flex gap-1.5">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(row)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-accent-600 bg-accent-50 border border-accent-200 rounded-lg hover:bg-accent-100 transition-colors"
                        >
                          <HiOutlinePencil className="w-3.5 h-3.5" />
                          Edit
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(row)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                        >
                          <HiOutlineTrash className="w-3.5 h-3.5" />
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
            {paged.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0) + 1}
                  className="px-6 py-12 text-center"
                >
                  <div className="text-gray-400">
                    <HiOutlineSearch className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm font-medium">No records found</p>
                    <p className="text-xs mt-1">Try adjusting your search criteria</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/50">
        <span className="text-sm text-gray-500">
          Showing <span className="font-medium text-gray-700">{sorted.length === 0 ? 0 : page * pageSize + 1}</span> to{" "}
          <span className="font-medium text-gray-700">{Math.min((page + 1) * pageSize, sorted.length)}</span> of{" "}
          <span className="font-medium text-gray-700">{sorted.length}</span> entries
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="p-2 rounded-lg hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:shadow-none disabled:hover:border-transparent transition-all"
          >
            <HiOutlineChevronLeft className="w-4 h-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
                page === i
                  ? "bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-sm"
                  : "hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200 text-gray-600"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="p-2 rounded-lg hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:shadow-none disabled:hover:border-transparent transition-all"
          >
            <HiOutlineChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
