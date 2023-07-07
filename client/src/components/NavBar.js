// NavBar.js 
// Referring to Activity 24 -> src -> components -> NavTabs.js
import React from 'react';
import AuthService from '../utils/auth';
import { Nav, Navbar } from 'react-bootstrap';
import '../styles/Navbar.css'

const styles = {
    nav: {
        padding: '40px',
        marginBottom: '25px',
        background: 'linear-gradient(to bottom, #BF3480, #A62991, #F26666, rgba(0, 0, 0, 0) 100%)'
    },
    brand: {
        fontSize: '35px',
        fontWeight: 'bold',
        color: 'black',
        marginRight: '10px',
        fontFamily: 'Raleway, sans-serif',
    },
    navLink: {
        fontSize: '20px', 
        color: 'black',
        // marginRight: '10px',
    },
}


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
        <Navbar variant="dark" expand="lg" fixed="top" style={styles.nav}>
            <div className="d-flex align-items-center">
                <Navbar.Brand style={styles.brand} onClick={() => handlePageChange('Home')}>
                    JamVault
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
            </div>
            <Navbar.Collapse id="navbar-nav">
                <Nav className="ml-auto custom-link">
                    <Nav.Link onClick={() => handlePageChange('Home')} style={styles.navLink}>Home</Nav.Link>
                    <Nav.Link onClick={handleClick} style={styles.navLink}>Concert</Nav.Link>
                    <Nav.Link onClick={handleClick} style={styles.navLink}>Timeline</Nav.Link>
                    <Nav.Link onClick={() => handlePageChange('Login')} style={styles.navLink}>Login</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;

//         <ul className='nav nav-tabs'>
//             <li className='nav-item'>
//                 <a
//                     href='#home'
//                     onClick={() => handlePageChange('Home')}
//                     className={currentPage === 'About' ? 'nav-link active' : 'nav-link'}
//                 >
//                     Home
//                 </a>
//             </li>
//             <li className='nav-item'>
//                 <a
//                     href='#concert'
//                     onClick={handleClick}
//                     className={currentPage === 'Concert' ? 'nav-link active' : 'nav-link'}
//                 >
//                     Concert 
//                 </a>
//             </li>
//             <li className='nav-item'>
//                 <a
//                     href='#timeline'
//                     onClick={handleClick}
//                     className={currentPage === 'UserTimeline' ? 'nav-link active' : 'nav-link'}
//                 >
//                     Timeline
//                 </a>
//             </li>
//             <li className='nav-item'>
//                 <a
//                     href='#login'
//                     onClick={() => handlePageChange('Login')}
//                     className={currentPage === 'Login' ? 'nav-link active' : 'nav-link'}
//                 >
//                     Login
//                 </a>
//             </li>
//         </ul>
