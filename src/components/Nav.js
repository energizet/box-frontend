import React from 'react';
import {Link} from "react-router-dom";

const Nav = () => {
    return (
        <nav>
            <Link to="/upload">Upload</Link>
            <Link to="/file/135ba2f2-03af-44b6-be44-e923d585b6d2">new3.png</Link>
        </nav>
    );
};

export default Nav;