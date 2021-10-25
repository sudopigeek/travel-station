import React, { useState } from "react"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { useHistory } from "react-router-dom";

export const TravelStation = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem("user") !== null)

    const history = useHistory();

    const setAuthUser = (user, id) => {
        sessionStorage.setItem("user", user);
        sessionStorage.setItem("userId", id);
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