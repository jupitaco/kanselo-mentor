import { cn } from '@/libs/utils';
import React, { Dispatch, SetStateAction } from 'react';
import { BsSearch } from 'react-icons/bs';

export const ClientSearch = ({
  query,
  setQuery,
  className,
  placeholder,
}: {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  className?: string;
  placeholder?: string;
}) => {
  return (
    <div
      className={cn(
        'bg-Alabaster my-2 hidden h-10 flex-1 items-center gap-2 overflow-hidden rounded-[64px] px-5 lg:inline-flex',
        className,
      )}
    >
      <BsSearch className='text-RangoonGreen w-20' />
      <input
        id='query'
        type='search'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder || 'Search markets or profiles'}
        className='bg-Alabaster placeholder:text-Thunder h-full flex-1 border-none focus:outline-none'
      />
    </div>
  );
};
