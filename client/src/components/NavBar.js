// NavBar.js 
// Referring to Activity 24 -> src -> components -> NavTabs.js
import React from 'react';
import AuthService from '../utils/auth';

// renders navigation tabs for different pages
function NavBar({ currentPage, handlePageChange }) {

    const isLoggedIn = AuthService.loggedIn();

    const handleClick = (tab) => {
        if (currentPage !== 'tab' && !isLoggedIn) {
            handlePageChange('Login');
        } else {
            handlePageChange(tab);
        }
    }
    return (
        <ul className='nav nav-tabs'>
            <li className='nav-item'>
                <a
                    href='#home'
                    onClick={() => handlePageChange('Home')}
                    className={currentPage === 'About' ? 'nav-link active' : 'nav-link'}
                >
                    Home
                </a>
            </li>
            <li className='nav-item'>
                <a
                    href='#concert'
                    onClick={handleClick}
                    className={currentPage === 'Concert' ? 'nav-link active' : 'nav-link'}
                >
                    Concert 
                </a>
            </li>
            <li className='nav-item'>
                <a
                    href='#timeline'
                    onClick={handleClick}
                    className={currentPage === 'UserTimeline' ? 'nav-link active' : 'nav-link'}
                >
                    Timeline
                </a>
            </li>
            <li className='nav-item'>
                <a
                    href='#login'
                    onClick={() => handlePageChange('Login')}
                    className={currentPage === 'Login' ? 'nav-link active' : 'nav-link'}
                >
                    Login
                </a>
            </li>
        </ul>
    );
}

export default NavBar;