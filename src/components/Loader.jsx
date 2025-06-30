import React from 'react'

export default function Loader() {
    return (
        <div className="bg-body-secondary opacity-75 vh-100 position-fixed top-0 start-0 w-100 d-flex align-items-center justify-content-center" style={{ zIndex: 1050 }}>
            <div className="text-primary spinner-grow" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}
