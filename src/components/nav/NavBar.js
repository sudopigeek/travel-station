import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Home</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/reserveSite">Reserve a Site</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/reservations">Your Reservations</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/signin">Sign In</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/register">Register</Link>
            </li>
        </ul>
    )
}