// Footer.jsx
import React from 'react';

const Footer = () => {
    return (
        <footer style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px', backgroundColor: '#003366', color: 'white' }}>
            <p>Copyright © 2024 Gamester</p>
            <p>
                <a href="mailto:gamesteranswers@gmail.com" style={{ color: 'white', textDecoration: 'none' }}>Contact Us</a>
            </p>
        </footer>
    );
};

export default Footer;
