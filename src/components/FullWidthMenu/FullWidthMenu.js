import React from "react";
import LogInForm from "../Auth/Login";
import "./fullWidthMenu.scss";

const FullWidthMenu = (props) =>{
    return (
    <div
        id="menu"
        className={`menu ${props.className}`}>
            <LogInForm/>
    </div>
) };

export default FullWidthMenu;
