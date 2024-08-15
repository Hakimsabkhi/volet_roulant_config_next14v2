import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void; // Correctly defined as 'onPageChange'
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange, // Ensure the correct prop name is used here
}) => {
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    onPageChange(newPage); // Use the correct prop name here
  };

  return (
    <div className="flex justify-center items-center gap-x-4 my-6">
      <div
        className={`flex items-center gap-1 cursor-pointer ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <FaArrowLeft className="cursor-pointer" />
        <p className="text-sm font-semibold">PREVIOUS</p>
      </div>
      {Array.from({ length: totalPages }, (_, i) => (
        <p
          key={i + 1}
          onClick={() => handlePageChange(i + 1)}
          className={`cursor-pointer text-xl rounded py-3 px-5 ${
            currentPage === i + 1 ? "bg-secondary text-white" : ""
          }`}
        >
          {i + 1}
        </p>
      ))}
      <div
        className={`flex items-center gap-1 cursor-pointer ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <p className="text-sm font-semibold">NEXT</p>
        <FaArrowRight className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Pagination;
