import { Pagination } from 'antd';
import React, { useMemo, useState } from 'react';

function Table({ dataSource, onEdit, onDelete, handlePageChange }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const tableData = dataSource || [];
    const keysToExclude = ["id", "userId", "createdAt", "updatedAt"];

    const headerKeys = useMemo(() => {
        if (tableData.length === 0) {
            return [];
        }
        return Object.keys(tableData[0]).filter(key => !keysToExclude.includes(key));
    }, [tableData]);

    const processedRows = useMemo(() => {
        return tableData.map(row => {
            const newRow = {};
            for (const key of Object.keys(row)) {
                if (!keysToExclude.includes(key)) {
                    newRow[key] = row[key];
                }
            }
            return { ...newRow, _id: row.id || JSON.stringify(row) };
        });
    }, [tableData]);

    const formatHeaderKey = (key) => {
        return key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
    };

    const onPageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
        handlePageChange(page, pageSize)
    };

    return (
        <div className='container-fluid'>
            <div className='table-responsive'>
                <table className='table table-borderless'>
                    <thead>
                        <tr>
                            <th>Sl No</th>
                            {headerKeys.map(key => (
                                <th className='text-nowrap' key={key}>
                                    {formatHeaderKey(key)}
                                </th>
                            ))}
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {processedRows.length === 0 ? (
                            <tr>
                                <td className='text-nowrap w-100' colSpan={headerKeys.length + 1}>
                                    No bank accounts found.
                                </td>
                            </tr>
                        ) : (
                            processedRows.map((row, index) => (
                                <tr key={row._id}>
                                    <td>{index + 1}</td>
                                    {headerKeys.map((key) => (
                                        <td className='text-nowrap' key={`${row._id}-${key}`}>
                                            {row[key]}
                                        </td>
                                    ))}
                                    <td className='d-flex justify-content-center'>
                                        <button className='btn btn-warning btn-sm me-3' onClick={() => onEdit(row._id)}>Edit</button>
                                        <button className='btn btn-danger btn-sm' onClick={() => onDelete(row._id)}>Delete</button>
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
                    style={{ textAlign: 'right', marginTop: '20px' }}
                />
            )}
        </div>
    );
}

export default Table;