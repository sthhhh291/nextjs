interface PaginationProps {
    total: number;
    currentPage: number;
    pageSize: number;
    onPageChange: (page: number) => void;
}

const Pagination = (props: PaginationProps) => {
    const { total, currentPage, pageSize, onPageChange } = props;
    const totalPages = Math.ceil(total / pageSize);
    
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <div className="flex items-center justify-center gap-4">
            <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
                Previous
            </button>
            <span>
                Page {currentPage} of {totalPages}
            </span>
            <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};
export default Pagination;