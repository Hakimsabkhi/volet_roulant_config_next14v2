"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import DevisTable from "@/components/DevisTable";
import LoadingSpinner from "@/components/LoadingSpinner";
import FilterBar from "@/components/FilterBar";
import Pagination from "@/components/Pagination"; // Import Pagination
import { Devis } from "@/interfaces"; // Import the Devis interface



const ITEMS_PER_PAGE = 3; // Define how many items you want per page

const DevisCrees: React.FC = () => {
  const { data: session, status } = useSession();
  const [devis, setDevis] = useState<Devis[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<{
    day: number;
    month: number;
    year: number;
  }>();
  const [currentPage, setCurrentPage] = useState(1); // State to track current page

  const fetchData = async () => {
    try {
      const response = await fetch("/api/devis/getdevis");
      const data = await response.json();
      setDevis(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [session]);

  const handleFilterChange = (
    selectedFilter: string,
    date?: { day: number; month: number; year: number }
  ) => {
    setFilter(selectedFilter);
    setSelectedDate(date);
    setCurrentPage(1); // Reset to the first page when filters are applied
  };

  const filteredDevis = useMemo(() => {
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

    return filtered;
  }, [filter, devis, selectedDate]);

  const paginatedDevis = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredDevis.slice(start, end);
  }, [filteredDevis, currentPage]);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch("/api/deleteDevis", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Error deleting data");
      }

      // Remove the deleted item from the state
      setDevis(devis.filter((devisItem) => devisItem._id !== id));
    } catch (error) {
      console.error("Failed to delete data:", error);
    }
  };

  if (status === "loading" || loading) {
    return <LoadingSpinner />; // Show a loading state while the session or data is being fetched
  }

  return (
    <main className="flex justify-center h-full">
        <div className=" w-[95%] h-full flex flex-col gap-8 justify-between items-center">
          <FilterBar onFilterChange={handleFilterChange} />
          <DevisTable devis={paginatedDevis} handleDelete={handleDelete} />
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredDevis.length / ITEMS_PER_PAGE)}
            onPageChange={setCurrentPage}
          />      
      </div>
    </main>
  );
};

export default DevisCrees;