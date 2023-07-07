// Header.js
import React from 'react';
import NavBar from './NavBar'

const styles = {
    headerStyle: {
        // background: 'linear-gradient(45deg, #F23D5E, #BF3480, #A62991, #F26666)',
        padding: '25px'
    },
    headingStyle: {
        fontSize: '50px',
        // color: 'white',
        color: 'black',
        textAlign: 'center'
    },
}

export default function Header({ currentPage, handlePageChange }) {
    return (
        <div>
            <NavBar currentPage={currentPage} handlePageChange={handlePageChange} />
            {/* <header style={styles.headerStyle}>
                <h1 style={styles.headingStyle} >JamVault</h1>
            </header> */}
        </div>
    );
}