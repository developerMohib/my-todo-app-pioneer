"use client";
import { ArrowDownUp, Search } from "lucide-react";
import { useEffect, useRef } from "react";

interface Filters {
  deadlineToday: boolean;
  expiresIn5: boolean;
  expiresIn10: boolean;
  expiresIn30: boolean;
}

interface SearchFilterSectionProps {
  openFilter: boolean;
  setOpenFilter: (open: boolean) => void;
  filters: Filters;
  setFilters: (filters: (prev: Filters) => Filters) => void;
}

const SearchFilterSection = ({
  openFilter,
  setOpenFilter,
  filters,
  setFilters,
}: SearchFilterSectionProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [setOpenFilter]);

  const handleFilterChange = (filterName: keyof Filters) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
      {/* Search Bar */}
      <div className="w-full lg:w-10/12 bg-white">
        <div className="relative rounded-lg w-full flex border-2 border-gray-300">
          <input
            type="text"
            name="q"
            id="query"
            placeholder="Search Your Task Here..."
            className="w-full p-2 md:p-3 placeholder-[#4B5563] focus:outline-none text-sm md:text-base"
          />
          <button className="inline-flex items-center gap-2 bg-[#5272FF] text-white px-3 md:px-4 rounded-lg hover:bg-[#5272FF] transition-colors">
            <Search size={20} className="md:w-6 md:h-6" />
          </button>
        </div>
      </div>

      {/* Filter Dropdown */}
      <div ref={dropdownRef} className="relative w-full lg:w-auto">
        <button
          onClick={() => setOpenFilter(!openFilter)}
          className="bg-blue-500 px-4 py-3 rounded-lg text-white flex items-center justify-center gap-1.5 hover:bg-[#5272FF] transition-colors w-full lg:w-auto text-sm md:text-base"
        >
          Filter By
          <ArrowDownUp size={16} className="md:w-5 md:h-5" />
        </button>

        {openFilter && (
          <div className="absolute mt-2 left-0 lg:left-auto lg:right-0 bg-white w-full lg:w-64 rounded-lg shadow-lg p-4 border border-gray-200 z-50">
            <h3 className="font-semibold text-[#4B5563] mb-3 border-b-2 border-gray-300 text-xl">
              Date
            </h3>
            <div className="space-y-2">
              {[
                { key: "deadlineToday", label: "Deadline Today" },
                { key: "expiresIn5", label: "Expires in 5 days" },
                { key: "expiresIn10", label: "Expires in 10 days" },
                { key: "expiresIn30", label: "Expires in 30 days" },
              ].map((filter) => (
                <label
                  key={filter.key}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters[filter.key as keyof Filters]}
                    onChange={() =>
                      handleFilterChange(filter.key as keyof Filters)
                    }
                    className="w-4 h-4 text-[#5272FF] rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-[#4B5563] group-hover:text-[#0C0C0C]">
                    {filter.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilterSection;
