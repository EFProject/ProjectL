import React from 'react';
import { Container, Pagination as BootstrapPagination } from 'react-bootstrap';

function Pagination({ currentPage, totalPages, onPageChange }) {
    const renderPages = () => {
        const pages = [];

        const maxPagesToShow = 5; // Maximum number of pages to show
        const halfMax = Math.floor(maxPagesToShow / 2);

        let startPage = Math.max(currentPage - halfMax, 1);
        let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

        if (endPage - startPage + 1 < maxPagesToShow) {
            startPage = Math.max(endPage - maxPagesToShow + 1, 1);
        }

        // Add ellipsis for the start if necessary
        if (startPage > 2) {
            pages.push(
                <BootstrapPagination.Item
                    key="start-ellipsis"
                    disabled
                    onClick={() => { }}
                >
                    ...
                </BootstrapPagination.Item>
            );
        }

        // Add page numbers
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <BootstrapPagination.Item
                    key={i}
                    active={i === currentPage}
                    onClick={() => onPageChange(i)}
                >
                    {i}
                </BootstrapPagination.Item>
            );
        }

        // Add ellipsis for the end if necessary
        if (endPage < totalPages - 1) {
            pages.push(
                <BootstrapPagination.Item
                    key="end-ellipsis"
                    disabled
                    onClick={() => { }}
                >
                    ...
                </BootstrapPagination.Item>
            );
        }

        return pages;
    };

    return (
        <Container className="d-flex justify-content-center mt-4">
            <BootstrapPagination>
                <BootstrapPagination.Prev
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                />
                {renderPages()}
                <BootstrapPagination.Next
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                />
            </BootstrapPagination>
        </Container>
    );
}

export default Pagination;
