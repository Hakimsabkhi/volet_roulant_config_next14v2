import React, { useState } from "react";

interface FilterBarProps {
  onFilterChange: (
    filter: string,
    date?: { day: number; month: number; year: number }
  ) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const [filter, setFilter] = useState<string>("");
  const [day, setDay] = useState<number>(new Date().getDate());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [year, setYear] = useState<number>(new Date().getFullYear());

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter);
    onFilterChange(selectedFilter, { day, month, year });
  };

  const handleDateChange = () => {
    if (filter === "specificDate") {
      onFilterChange(filter, { day, month, year });
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <h2 className="w-fit">Filtrez votre devis selon la date de création</h2>
      <div className="flex gap-4">
        <select
          value={filter}
          onChange={handleFilterChange}
          className="p-2 border border-black rounded-md"
        >
          <option value="">Tous</option>
          <option value="recent">Les plus récents</option>
          <option value="oldest">Les plus anciens</option>
          <option value="specificDate">Date spécifique</option>
        </select>

        <div className="flex gap-4">
          <input
            type="number"
            value={day}
            onChange={(e) =>
              setDay(parseInt(e.target.value) || new Date().getDate())
            }
            className={`p-2 border rounded-md ${
              filter !== "specificDate" ? "bg-gray-200 text-gray-500" : ""
            }`}
            placeholder="Day"
            min="1"
            max="31"
            disabled={filter !== "specificDate"}
          />
          <input
            type="number"
            value={month}
            onChange={(e) =>
              setMonth(parseInt(e.target.value) || new Date().getMonth() + 1)
            }
            className={`p-2 border rounded-md ${
              filter !== "specificDate" ? "bg-gray-200 text-gray-500" : ""
            }`}
            placeholder="Month"
            min="1"
            max="12"
            disabled={filter !== "specificDate"}
          />
          <input
            type="number"
            value={year}
            onChange={(e) =>
              setYear(parseInt(e.target.value) || new Date().getFullYear())
            }
            className={`p-2 border rounded-md ${
              filter !== "specificDate" ? "bg-gray-200 text-gray-500" : ""
            }`}
            placeholder="Year"
            min="1900"
            max={new Date().getFullYear()}
            disabled={filter !== "specificDate"}
          />
          <button
            onClick={handleDateChange}
            className={`nav-btn hover:bg-NavbuttonH uppercase font-bold px-4 ${
              filter !== "specificDate" ? "bg-gray-200 text-gray-500" : ""
            }`}
            disabled={filter !== "specificDate"}
          >
            Appliquer
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
