// NavBar.js 
// Referring to Activity 24 -> src -> components -> NavTabs.js
import React from 'react';
import AuthService from '../utils/auth';
import { Nav, Navbar } from 'react-bootstrap';
import '../styles/Navbar.css'

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
function NavBar({ currentPage, handlePageChange }) {

    const isLoggedIn = AuthService.loggedIn();
    const logout = (event) => {
        event.preventDefault()
        AuthService.logout()
    } 

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
                    <div>
                        {AuthService.loggedIn() ? (
                            <Nav.Link onClick={logout} style={styles.navLink}>Logout</Nav.Link>
                        ) : (
                            <Nav.Link onClick={() => handlePageChange('Login')} style={styles.navLink}>Login</Nav.Link>
                        )}
                    </div>
                  
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;

   
{/* <Navbar variant="dark" expand="lg" fixed="top" style={styles.nav}>
    <div className="d-flex align-items-center">
        <Navbar.Brand style={styles.brand} onClick={() => handlePageChange('Home')}>
            JamVault
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
    </div>
    <Navbar.Collapse id="navbar-nav">
        <Nav className="custom-link" style={{ marginLeft: 'auto' }}>
            <div className="d-flex">
                <div style={{ flex: 1 }}>
                    <Nav.Link onClick={() => handlePageChange('Home')} style={styles.navLink}>Home</Nav.Link>
                </div>
                <div style={{ flex: 1 }}>
                    <Nav.Link onClick={handleClick} style={styles.navLink}>Concert</Nav.Link>
                </div>
                <div style={{ flex: 1 }}>
                    <Nav.Link onClick={handleClick} style={styles.navLink}>Timeline</Nav.Link>
                </div>
                <div style={{ flex: 1 }}>
                    {AuthService.loggedIn() ? (
                        <Nav.Link onClick={logout} style={styles.navLink}>Logout</Nav.Link>
                    ) : (
                        <Nav.Link onClick={() => handlePageChange('Login')} style={styles.navLink}>Login</Nav.Link>
                    )}
                </div>
            </div>
        </Nav>
    </Navbar.Collapse>
</Navbar> */}