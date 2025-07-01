import { Pagination } from 'antd';
import React, { useMemo, useState } from 'react';

function Table({ dataSource = [], customKeysToExclude = [], onEdit, onDelete, handlePageChange, onView, viewEdit = false, viewDelete = false, viewView = false }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const tableData = useMemo(() => (Array.isArray(dataSource) ? dataSource : []), [dataSource]);
    const exclusions = useMemo(() => ['id', 'userId', 'createdAt', 'updatedAt', ...customKeysToExclude], [customKeysToExclude]);

    const headerKeys = useMemo(() => {
        if (tableData.length === 0) return [];
        return Object.keys(tableData[0]).filter((key) => !exclusions.includes(key));
    }, [tableData, exclusions]);

    const processedRows = useMemo(() => {
        return tableData.map((row) => {
            const newRow = {};
            headerKeys.forEach((key) => {
                newRow[key] = row[key];
            });
            return { ...newRow, _id: row.id ?? JSON.stringify(row) };
        });
    }, [tableData, headerKeys]);

    const formatHeaderKey = (key) => key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');

    const onPageChange = (page, newPageSize) => {
        setCurrentPage(page);
        setPageSize(newPageSize);
        handlePageChange?.(page, newPageSize);
    };

    const paginatedRows = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return processedRows.slice(start, start + pageSize);
    }, [processedRows, currentPage, pageSize]);

    return (
        <div className="container-fluid">
            <div className="table-responsive">
                <table className="table table-borderless">
                    <thead>
                        <tr>
                            <th className="text-nowrap">Sl No</th>
                            {headerKeys.map((key) => (
                                <th className="text-nowrap" key={key}>
                                    {formatHeaderKey(key)}
                                </th>
                            ))}
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedRows.length === 0 ? (
                            <tr>
                                <td className="text-nowrap w-100" colSpan={headerKeys.length + 2}>
                                    No records found.
                                </td>
                            </tr>
                        ) : (
                            paginatedRows.map((row, index) => (
                                <tr key={row._id}>
                                    <td>{(currentPage - 1) * pageSize + index + 1}</td>
                                    {headerKeys.map((key) => (
                                        <td className="text-nowrap" key={`${row._id}-${key}`}>
                                            {row[key]}
                                        </td>
                                    ))}
                                    <td className="d-flex justify-content-center">
                                        {viewView && (
                                            <button className="btn btn-warning btn-sm me-3" onClick={() => onView?.(row._id)}>View</button>
                                        )}
                                        {viewEdit && (
                                            <button className="btn btn-warning btn-sm me-3" onClick={() => onEdit?.(row._id)}>Edit</button>
                                        )}
                                        {viewDelete && (
                                            <button className="btn btn-danger btn-sm" onClick={() => onDelete?.(row._id)}>Delete</button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {tableData.length > 0 && (
                <Pagination
                    total={tableData.length}
                    current={currentPage}
                    pageSize={pageSize}
                    onChange={onPageChange}
                    showSizeChanger
                    showQuickJumper
                    showTotal={(total) => `Total ${total} items`}
                    style={{ textAlign: 'right', marginTop: 20 }}
                />
            )}
        </div>
    );
}

export default Table;
