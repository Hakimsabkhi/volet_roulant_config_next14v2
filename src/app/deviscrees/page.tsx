"use client"; // Mark this file as a client component

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useSession } from "next-auth/react";
import DevisTable from "@/components/DevisTable";
import LoadingSpinner from "@/components/LoadingSpinner";
import FilterBar from "@/components/FilterBar";
import Pagination from "@/components/Pagination";
import { Devis } from "../../interfaces";

const ITEMS_PER_PAGE = 3;

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
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/devis/getDevis`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data: Devis[] = await response.json();
          setDevis(data);
        } else {
          console.error("Failed to fetch devis");
        }
      } catch (error) {
        console.error("Error fetching devis:", error);
      } finally {
        setLoading(false);
      }
    };
  
    if (session && status === "authenticated") {
      fetchData();
    }
  }, [session, status]);
  

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

  const handleDelete = useCallback(async (id: string) => {
    try {
      const response = await fetch('/api/devis/deleteDevis', {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Error deleting data");
      }

      // Optimistically update the local state
      setDevis((prevDevis) => prevDevis.filter((devisItem) => devisItem._id !== id));
    } catch (error) {
      console.error("Failed to delete devis:", error);
    }
  }, []);

  if (status === "loading" || loading) {
    return <LoadingSpinner />;
  }

  return (
    <main className="flex justify-center h-full">
      <div className="w-[95%] h-full flex flex-col gap-8 justify-between items-center">
      
        <DevisTable devis={paginatedDevis} handleDelete={handleDelete} />
      
      </div>
    </main>
  );
};

export default DevisCrees;