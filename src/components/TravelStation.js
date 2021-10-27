import React, { useState } from "react"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { useHistory } from "react-router-dom";

export const TravelStation = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem("user") !== null);

    const history = useHistory();

    const setAuthUser = (user, id, admin) => {
        sessionStorage.setItem("user", user);
        sessionStorage.setItem("userId", id);
        sessionStorage.setItem("isAdmin", admin)
        setIsAuthenticated(sessionStorage.getItem("user") !== null);
    }

    const handleLogout = e => {
        e.preventDefault();
        sessionStorage.clear();
        setIsAuthenticated(false);
        history.push("/");
    }

    return (
        <>
            <NavBar handleLogout={handleLogout} isAuthenticated={isAuthenticated} user={sessionStorage.getItem("user")} />
            <ApplicationViews isAuthenticated={isAuthenticated} setAuthUser={setAuthUser} />     
        </>
    );
}