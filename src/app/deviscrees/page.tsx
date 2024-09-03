"use client"; // Mark this file as a client component

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useSession } from "next-auth/react";
import DevisTable from "@/components/DevisTable";
import LoadingSpinner from "@/components/LoadingSpinner";
import FilterBar from "@/components/FilterBar";
import Pagination from "@/components/Pagination";
import { Devis } from "../../interfaces";
import { Session } from "next-auth";
// Constants
const ITEMS_PER_PAGE = 3;

// Custom hook for fetching devis
const useFetchDevis = (session: Session | null, status: "loading" | "authenticated" | "unauthenticated") => {
  const [devis, setDevis] = useState<Devis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/devis/getdevis`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error("Failed to fetch devis. Please try again later.");

        const data: Devis[] = await response.json();
        setDevis(data);
      } catch (error) {
        setError("Error fetching devis. Please check your connection.");
        console.error("Error fetching devis:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session && status === "authenticated") {
      fetchData();
    }
  }, [session, status]);

  return { devis, loading, error, setDevis };
};

const DevisCrees: React.FC = () => {
  const { data: session, status } = useSession();
  const { devis, loading, error, setDevis } = useFetchDevis(session, status);

  const [filter, setFilter] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<{
    day: number;
    month: number;
    year: number;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (
    selectedFilter: string,
    date?: { day: number; month: number; year: number }
  ) => {
    setFilter(selectedFilter);
    setSelectedDate(date || null);
    setCurrentPage(1); // Reset to the first page when filters are applied
  };

  const filteredAndPaginatedDevis = useMemo(() => {
    let filtered = [...devis];

    if (filter === "recent") {
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (filter === "oldest") {
      filtered.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    } else if (filter === "specificDate" && selectedDate) {
      filtered = filtered.filter((devisItem) => {
        const devisDate = new Date(devisItem.createdAt);
        return (
          devisDate.getDate() === selectedDate.day &&
          devisDate.getMonth() + 1 === selectedDate.month &&
          devisDate.getFullYear() === selectedDate.year
        );
      });
    }

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filtered.slice(start, end);
  }, [filter, devis, selectedDate, currentPage]);

  const handleDelete = useCallback(async (id: string) => {
    try {
      const response = await fetch('/api/devis/deleteDevis', {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
  
      if (!response.ok) throw new Error("Error deleting data");
  
      setDevis((prevDevis) => prevDevis.filter((devisItem) => devisItem._id !== id));
  
      // Recalculate pagination if necessary
      if ((currentPage - 1) * ITEMS_PER_PAGE >= filteredAndPaginatedDevis.length - 1) {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
      }
    } catch (error) {
      console.error("Failed to delete devis:", error);
    }
  }, [currentPage, filteredAndPaginatedDevis.length, setDevis]);
  
  if (status === "loading" || loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <main className="flex justify-center h-full">
      <div className="w-[95%] h-full flex flex-col gap-8 justify-between items-center">
        <FilterBar onFilterChange={handleFilterChange} />
        <DevisTable devis={filteredAndPaginatedDevis} handleDelete={handleDelete} />
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(devis.length / ITEMS_PER_PAGE)}
          onPageChange={setCurrentPage}
        />
      </div>
    </main>
  );
};

export default DevisCrees;
