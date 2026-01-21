import { useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type UsePaginateData = {
  total: number;
  limit: number;
  page: number;
  assets: [];
};

export default function usePagination(data?: UsePaginateData) {
  const pathName = usePathname();

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  const currentPage = Number(searchParams.get("page") || "1");
  const totalPages = Math.ceil(Number(data?.total) / Number(data?.limit));
  // const totalPages = data?.totalPages || 0;
  const pageSize = data?.limit || 0;
  const totalCount = data?.total || 0;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathName}?${params.toString()}`;
  };

  const createPageLimitURL = (pageLimit: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("limit", pageLimit.toString());
    return `${pathName}?${params.toString()}`;
  };

  const setPageLimit = (pageLimit: number | string) => {
    const pageUrl = createPageLimitURL(pageLimit);
    startTransition(() => {
      replace(pageUrl);
    });
  };

  const createSearchURL = (query: string) => {
    const params = new URLSearchParams(searchParams);

    if (query !== "") {
      params.set("search", query);
    } else {
      params.delete("search");
    }
    return `${pathName}?${params.toString()}`;
  };

  const handleSearchUrl = (query: string) => {
    const currentSearch = searchParams.get("search") || "";

    console.log("curr>>", currentSearch);
    console.log("q>>", query);
    if (query !== currentSearch) {
      // Only update if the query has changed
      const pageUrl = createSearchURL(query);
      startTransition(() => {
        replace(pageUrl);
      });
    }
  };

  const handlePageUrl = (pageNumber: number) => {
    const pageUrl = createPageURL(pageNumber);
    startTransition(() => {
      replace(pageUrl);
    });
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      const pageUrl = createPageURL(prevPage);
      startTransition(() => {
        replace(pageUrl);
      });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      const prevPage = currentPage + 1;
      const pageUrl = createPageURL(prevPage);
      startTransition(() => {
        replace(pageUrl);
      });
    }
  };

  const goToPageNumber = (pageNumber: number) => {
    if (pageNumber <= totalPages && currentPage !== pageNumber) {
      const pageURl = createPageURL(pageNumber);
      startTransition(() => {
        replace(pageURl);
      });
    }
  };

  const previousBtnState = currentPage === 1;
  const nextBtnState = currentPage === totalPages;

  return {
    currentPage,
    totalPages,
    pageSize,
    totalCount,
    handlePrev,
    handleNext,
    goToPageNumber,
    previousBtnState,
    nextBtnState,
    isPending,
    setPageLimit,
    handlePageUrl,
    handleSearchUrl,
    data,
  };
}
