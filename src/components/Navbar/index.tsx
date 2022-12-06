import contactLogo from "../../assets/dashboard/contact.png";
import homeLogo from "../../assets/dashboard/home.png";
import groupsLogo from "../../assets/dashboard/groups.png";
import todoLogo from "../../assets/dashboard/todo.png";
import React from "react";
import { User } from "../../utils/interfaces";
import { VIEW } from "../../utils/enum";

interface NavbarOptions {
    user: User;
    setView: React.Dispatch<React.SetStateAction<VIEW>>;
}

export function Navbar(navbarOptions: NavbarOptions) {
    require("./index.css");
    return <div className="navbar">
        <div className="header">
            <div className="user" onClick={() => navbarOptions.setView(VIEW.PROFILE)}>
                <img></img>
                <span>{navbarOptions.user.username}</span>
            </div>
        </div>
        <hr></hr>
        <div className="sections">
            <div className="section" onClick={() => navbarOptions.setView(VIEW.DASHBOARD)}>
                <img src={homeLogo}></img>
                <span>Dashboard</span>
            </div>
            <div className="section" onClick={() => navbarOptions.setView(VIEW.GROUPS)}>
                <img src={groupsLogo}></img>
                <span>Groups</span>
            </div>
            <div className="section" onClick={() => navbarOptions.setView(VIEW.TODOS)}>
                <img src={todoLogo}></img>
                <span>Todo</span>
            </div>
        </div>
        <div className="footer">
            <div className="contact" onClick={() => navbarOptions.setView(VIEW.CONTACT)}>
                <img src={contactLogo}></img>
                <span>Contact</span>
            </div>
        </div>
    </div>;
}