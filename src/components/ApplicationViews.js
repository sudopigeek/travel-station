import React from "react"
import { Route } from "react-router-dom"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { Home } from "./Home"
import { Reservations } from "./reservations/ReservationList"
import { ReserveSite } from "./reserveSite/ReserveSite"
import { Account } from "./account/Account"
import { ReservationEditForm } from "./reservations/ReservationEditForm"

export const ApplicationViews = ({ isAuthenticated, setAuthUser, handleEdit }) => {
    return (
        <>
            <Route path="/reserveSite">
                {isAuthenticated ? <ReserveSite /> : <Login setAuthUser={setAuthUser} destination="/reserveSite" />}
            </Route>
            <Route exact path="/reservations">
                {isAuthenticated ? <Reservations handleEdit={handleEdit} /> : <Login setAuthUser={setAuthUser} destination="/reservations" />}
            </Route>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/reservations/:reservationId(\d+)/edit">
                {isAuthenticated ? <ReservationEditForm /> : <Login setAuthUser={setAuthUser} destination="/reservations" />}
            </Route>
            <Route path="/account">
                <Account />
            </Route>
            <Route path="/signin">
                <Login setAuthUser={setAuthUser} destination="/" />
            </Route>
            <Route path="/register">
                <Register setAuthUser={setAuthUser} destination="/" />
            </Route>
        </>
    )
}