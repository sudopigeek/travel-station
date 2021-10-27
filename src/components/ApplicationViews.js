import React from "react"
import { Route } from "react-router-dom"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { Home } from "./Home"
import { Reservations } from "./reservations/ReservationList"
import { ReserveSite } from "./reserveSite/ReserveSite"

export const ApplicationViews = ({ isAuthenticated, setAuthUser }) => {
    return (
        <>
            <Route path="/reserveSite">
                {isAuthenticated ? <ReserveSite /> : <Login setAuthUser={setAuthUser} destination="/reserveSite" />}
            </Route>
            <Route path="/reservations">
                {isAuthenticated ? <Reservations /> : <Login setAuthUser={setAuthUser} destination="/reservations" />}
            </Route>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/signin">
                <Login setAuthUser={setAuthUser} destination="/" />
            </Route>
            <Route path="/register">
                <Register />
            </Route>
        </>
    )
}