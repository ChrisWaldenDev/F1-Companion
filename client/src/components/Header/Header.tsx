import Navbar from "./Navbar.js";
import Infobar from "./Infobar.js";
import React from "react";

//Default Header
const Header = () => {
    return (
        <div>
            <Navbar/>
            <Infobar/>
        </div>
    );
}

export default Header;