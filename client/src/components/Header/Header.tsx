import Navbar from "./Navbar.tsx";
import Infobar from "./Infobar.tsx";
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