import React from 'react';
import NavBar from './NavBar'

export default function Header({ currentPage, handlePageChange }) {
    return (
        <div>
            <NavBar currentPage={currentPage} handlePageChange={handlePageChange} />
        </div>
    );
}