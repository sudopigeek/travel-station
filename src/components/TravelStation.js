import React, { useState } from "react"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"

export const TravelStation = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem("user") !== null)

    const setAuthUser = (user) => {
        sessionStorage.setItem("user", user)
        setIsAuthenticated(sessionStorage.getItem("user") !== null)
    }

    const handleLogout = e => {
        e.preventDefault();
        sessionStorage.clear();
        setIsAuthenticated(false);
    }

    return (
        <>
            <NavBar handleLogout={handleLogout} isAuthenticated={isAuthenticated} user={sessionStorage.getItem("user")} />
            <ApplicationViews isAuthenticated={isAuthenticated} setAuthUser={setAuthUser} />     
        </>
    );
}