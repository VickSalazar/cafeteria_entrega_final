import '../../styles/components/layout/Header.css';
import React from 'react';

const Header = (props) => {
    return (
        <header>
            <div className="holder header_logo_nombre">
                <img className="imgLogo" src="/images/header/logo_cafeteria.jpg" alt="Cafetería Surch" />
                <h1>Surch Café</h1>
            </div>
        </header>
    )
}

export default Header;