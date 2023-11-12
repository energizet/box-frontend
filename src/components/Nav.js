import React from 'react';
import {NavLink} from "react-router-dom";

const Nav = () => {
    let navStyle = ({isActive}) => ({
        color: isActive ? 'red' : 'black',
    });
    
    return (
        <nav>
            <NavLink to="/upload" style={navStyle}>Upload</NavLink>
        </nav>
    );
};

export default Nav;