"use client";

import { usePaginationContext } from "@/context/paginateContext";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

export default function TablePagination() {
  const {
    currentPage,
    totalPages,
    handlePrev,
    handleNext,
    goToPageNumber,
    previousBtnState,
    nextBtnState,
    pageSize,
    totalCount,
  } = usePaginationContext();

  if (totalPages <= 0) {
    return null; // Don't render pagination if there are no pages
  }

  if (currentPage < 1 || currentPage > totalPages) {
    console.error("Invalid currentPage value");
    return null;
  }

  return (
    <div className="border-grey-50 border-t">
      <section className="container flex flex-wrap items-center justify-between gap-3 py-2 text-sm">
        <p className="text-Grey1 text-sm font-medium">
          Page {pageSize} of {totalCount}
        </p>
        <nav aria-label="Pagination" className="w-full max-w-sm">
          <article className="text-Grey1 flex items-center justify-between gap-2">
            {/* Previous Button */}
            <button
              disabled={previousBtnState}
              onClick={handlePrev}
              aria-label="Previous Page"
              className="hover:text-primary card flex cursor-pointer items-center gap-2 p-3 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FaArrowLeft size={14} />
            </button>

            <div className="bg-grey-50 flex flex-1 items-center justify-center gap-2 rounded-md p-2">
              {/* Page Numbers */}
              {renderPageNumbers(currentPage, totalPages, goToPageNumber)}
            </div>

            {/* Next Button */}
            <button
              disabled={nextBtnState}
              onClick={handleNext}
              aria-label="Next Page"
              className="hover:text-primary card flex cursor-pointer items-center gap-2 p-3 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FaArrowRight size={14} />
            </button>
          </article>
        </nav>
      </section>
    </div>
  );
}

export function PageNumber({
  currentPage,
  index,
  goToPageNumber,
}: {
  currentPage: number;
  index: number;
  goToPageNumber: (pageNumber: number) => void;
}) {
  return (
    <button
      onClick={() => goToPageNumber(index)}
      className={`flex size-7 cursor-pointer items-center justify-center rounded-md font-semibold transition-colors ${
        currentPage === index ? "text-grey-800 bg-white shadow-md" : ""
      }`}
    >
      {index}
    </button>
  );
}

export const renderPageNumbers = (
  currentPage: number,
  totalPages: number,
  goToPageNumber: (pageNumber: number) => void,
  maxVisiblePages: number = 5, // Configurable number of visible pages
) => {
  const pageNumbers = [];

  if (totalPages <= maxVisiblePages) {
    // Show all pages if total pages are less than or equal to maxVisiblePages
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <PageNumber
          key={i}
          currentPage={currentPage}
          index={i}
          goToPageNumber={goToPageNumber}
        />,
      );
    }
  } else {
    // Always show the first page
    pageNumbers.push(
      <PageNumber
        key={1}
        currentPage={currentPage}
        index={1}
        goToPageNumber={goToPageNumber}
      />,
    );

    // Calculate the range of pages to show around the current page
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    // Add ellipsis if the current page is not near the start
    if (currentPage > 3) {
      pageNumbers.push(
        <span
          key="ellipsis-start"
          className="flex size-6 items-center justify-center"
        >
          ...
        </span>,
      );
    }

    // Add the range of pages around the current page
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <PageNumber
          key={i}
          currentPage={currentPage}
          index={i}
          goToPageNumber={goToPageNumber}
        />,
      );
    }

    // Add ellipsis if the current page is not near the end
    if (currentPage < totalPages - 2) {
      pageNumbers.push(
        <span
          key="ellipsis-end"
          className="flex size-6 items-center justify-center"
        >
          ...
        </span>,
      );
    }

    // Always show the last page
    pageNumbers.push(
      <PageNumber
        key={totalPages}
        currentPage={currentPage}
        index={totalPages}
        goToPageNumber={goToPageNumber}
      />,
    );
  }

  return pageNumbers;
};
