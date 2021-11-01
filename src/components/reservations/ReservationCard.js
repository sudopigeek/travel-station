import React from 'react';
import { ConvertDate, daydiff, parseDate } from "../../modules/Dates";
import './Reservations.css'

export const ReservationCard = ({ admin, spotType, cancel, handleEdit, reservation }) => {
    const foundType = spotType.find((type) => type.id === reservation.campingSpot.spotTypeId)
    return (
        <fieldset className="reservation--card">
            {admin === true ? <h2>Name: {reservation.user.name}</h2> : null}
            <section className="card--dates">
                <h5>Placed: {ConvertDate(reservation.datePlaced)}</h5>
                <h5>Start: {ConvertDate(reservation.dateFrom)}</h5>
                <h5>End: {ConvertDate(reservation.dateTo)}</h5>
            </section>
            <section className="card--spotInfo">
                <p>Spot Name: {reservation.campingSpot.name}</p>
                <p>Spot Type: {foundType?.type}</p>
            </section>
            <section className="card--reservation">
                <p>Price: ${daydiff(parseDate(reservation.dateFrom), parseDate(reservation.dateTo)) * parseInt(reservation.campingSpot.pricePerNight)}</p>
            </section>
            <section className="card--modifiers">
                <button id="edit" type="button" onClick={() => handleEdit(reservation.id)}>Edit Date</button>
                <button id="cancel" type="button" onClick={() => cancel(reservation.id)}>Cancel Reservation</button>  
            </section>
        </fieldset>
    );
}