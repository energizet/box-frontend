import React from 'react';
import {NavLink} from "react-router-dom";

const Nav = () => {
    let navStyle = ({isActive}) => ({
        color: isActive ? 'red' : 'black',
    });
    
    return (
        <nav>
            <NavLink to="/" style={navStyle}>Upload</NavLink>
            <NavLink to="/file/838c98d1-4564-4bf8-91f2-26e0ef3ed2a4" style={navStyle}>Photo</NavLink>
        </nav>
    );
};

export default Nav;