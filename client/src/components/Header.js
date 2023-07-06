// Header.js
import React from 'react';
import NavBar from './NavBar'

const styles = {
    headerStyle: {
        backgroundColor: 'black',
        padding: '30px'
    },
    headingStyle: {
        fontSize: '50px',
        color: 'white',
        textAlign: 'center'
    },
}

export default function Header({ currentPage, handlePageChange }) {
    return (
        <header style={styles.headerStyle}>
            <h1 style={styles.headingStyle} >JamVault</h1>
            <NavBar currentPage={currentPage} handlePageChange={handlePageChange} />
        </header>
    );
}