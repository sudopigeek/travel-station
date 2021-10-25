import React, { useState } from "react";

export const ReserveSite = ({}) => {
    const handleReservation = (e) => {
        e.preventDefault();
        
    }

    return (
        <main className="container--reserveSite">
            <section>
                <form className="form--reserveSite" onSubmit={handleReservation}>

                </form>
            </section>
        </main>
    );
}