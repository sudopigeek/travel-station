import React from "react";
import { ConvertDateTime } from "../../modules/Dates";

export const ReservationCard = ({ admin, cancel, reservation }) => {
    return (
        <fieldset className="reservation--card">
            {admin === true ? <h2>Name: {reservation.user.name}</h2> : null}
            <section className="card--dates">
                <h5>Placed: {ConvertDateTime(reservation.datePlaced, true)}</h5>
                <h5>Start: {ConvertDateTime(reservation.dateFrom, true)}</h5>
                <h5>End: {ConvertDateTime(reservation.dateTo, true)}</h5>
            </section>
            <section className="card--spotInfo">
                <p>Spot Name: {reservation.campingSpot.name}</p>
            </section>
            <section className="card--reservation">
                <p>Price Per Night: ${reservation.campingSpot.pricePerNight}</p>
            </section>
            <section className="card--modifiers">
                <button type="button" onClick={() => cancel(reservation.id)}>Cancel Reservation</button>
            </section>
        </fieldset>
    );
}