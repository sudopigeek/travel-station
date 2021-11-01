import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"
import logo from '../../images/logo.jpeg'

export const NavBar = ({ handleLogout, isAuthenticated, user }) => {
    if (!isAuthenticated) {
        return (
            <>
                <ul className="navbar">
                <img className="navbar__img" src={logo} alt="Logo" />
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
            </>
        )
    } else {
        return (
            <>
                <ul className="navbar">
                <img className="navbar__img" src={logo} alt="Logo" />
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
                    <Link className="navbar__link" user={user} to="/account">Your Account</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" onClick={handleLogout} to="/">Sign Out</Link>
                </li>
                </ul>
            </>
        )
    }
}