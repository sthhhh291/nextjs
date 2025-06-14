"use client";
import Button from "./Button";

type PaginationProps = {
  total: number;
  per_page: number;
  page: number;
  next_page: number;
  prev_page: number;
  pages: number;
  onPageChange?: (page: number) => void;
};

const Pagination = (props: PaginationProps) => {
  return (
    <div className='flex justify-center mt-4'>
      <nav className='flex space-x-2'>
        <Button onClick={() => props.onPageChange?.(1)}> 1</Button>
        <Button onClick={() => props.onPageChange?.(props.prev_page)}>
          {props.prev_page}
        </Button>
        <Button onClick={() => props.onPageChange?.(props.next_page)}>
          {props.next_page}
        </Button>
        <Button onClick={() => props.onPageChange?.(props.pages)}>
          {props.pages}
        </Button>
      </nav>
    </div>
  );
};
export default Pagination;
