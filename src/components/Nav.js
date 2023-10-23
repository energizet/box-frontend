import React from 'react';
import {NavLink} from "react-router-dom";

const Nav = () => {
    let navStyle = ({isActive}) => ({
        color: isActive ? 'red' : 'black',
    });
    
    return (
        <nav>
            <NavLink to="/upload" style={navStyle}>Upload</NavLink>
            <NavLink to="/file/135ba2f2-03af-44b6-be44-e923d585b6d2" style={navStyle}>new3.png</NavLink>
        </nav>
    );
};

export default Nav;