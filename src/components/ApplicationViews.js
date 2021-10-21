import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"

export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/reserveSite">
              
            </Route>
            <Route path="/reservations">
              
            </Route>
            <Route path="/signin">
              
            </Route>
            <Route path="/register">
              
            </Route>
        </>
    )
}