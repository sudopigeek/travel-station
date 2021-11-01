import React from "react";
import './Home.css'
import { Link } from "react-router-dom";

export const Home = () => {
    return (
        <main className="home">
            <h1>Welcome to Paradise Campgrounds!</h1>
            <section className="bookReservation">
                <h3>Book your reservation today!</h3>
                <Link to="/reserveSite">
                    <button className="reservationBtn">Book Reservation</button>
                </Link>
            </section>
        </main>        
    );
}