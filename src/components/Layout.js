import React from 'react';
import {Outlet} from "react-router-dom";
import Auth from "./Auth";
import Nav from "./Nav";

const Layout = () => {
    return (
        <div id="wrapper">
            <Auth/>
            <Nav/>
            <Outlet/>
        </div>
    );
};

export default Layout;