// NavBar.js 
// Referring to Activity 24 -> src -> components -> NavTabs.js
import React from 'react';
import AuthService from '../utils/auth';
import { Nav, Navbar } from 'react-bootstrap';
import '../styles/Navbar.css'
import Concert from '../pages/Concert';
import Timeline from '../pages/UserTimeline';
import Home from '../pages/Home';

const styles = {
    nav: {
        padding: '30px',
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
    },
}


// renders navigation tabs for different pages
function NavBar({ handlePageChange }) {

    const isLoggedIn = AuthService.loggedIn();
    const logout = (event) => {
        event.preventDefault()
        AuthService.logout()
    } 

        const handleConcertClick = () => {
            if (isLoggedIn) {
                handlePageChange('Concert');
            } else {
                handlePageChange('Login');
            }
        };
        
        const handleTimelineClick = () => {
            if (isLoggedIn) {
                handlePageChange('Timeline');
            } else {
                handlePageChange('Login');
            }
        };
    
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
                    <Nav.Link onClick={() => handlePageChange('Home')} style={styles.navLink} href='#home'>Home</Nav.Link>
                    <Nav.Link onClick={handleConcertClick} style={styles.navLink} href='#concert'>Concert</Nav.Link>
                    <Nav.Link onClick={handleTimelineClick} style={styles.navLink} href='#timeline'>Timeline</Nav.Link>
                    <div>
                        {AuthService.loggedIn() ? (
                            <Nav.Link onClick={(event)=> { logout(event) }} style={styles.navLink}>Logout</Nav.Link>
                        ) : (
                                <Nav.Link onClick={() => handlePageChange('Login')} style={styles.navLink} href='#login'>Login</Nav.Link>
                        )}
                    </div>
                  
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;