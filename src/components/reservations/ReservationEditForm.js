import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getReservationById, updateReservation } from "../../modules/APIManager";

export const ReservationEditForm = () => {
    const [reservation, setReservation] = useState({id: 0, datePlaced: "", dateFrom: "", dateTo: "", campingSpotId: 0});
    const [isLoading, setIsLoading] = useState(false);
    const {reservationId} = useParams();
    const history = useHistory();
    const handleFieldChange = event => {
        const stateToChange = { ...reservation };
        stateToChange[0][event.target.id] = event.target.value;
        setReservation(stateToChange);
    };
    const updateRes = event => {
        event.preventDefault();
        setIsLoading(true);
        const editedReservation = {id: reservation[0].id, datePlaced: reservation[0].datePlaced, dateFrom: reservation[0].dateFrom, dateTo: reservation[0].dateTo, campingSpotId: reservation[0].campingSpotId};
        updateReservation(editedReservation).then(() => {
            history.push("/reservations");
        })
    }
    useEffect(() => {
        getReservationById(reservationId).then(res => {
            setReservation(res);
            setIsLoading(false);
        })
    }, [])
    return (
        <main className="editForm--container">
            <section className="form--dates">
                <h4>Edit Reservation Date:</h4>
                <p>Reservation placed on {reservation[0] !== undefined ? reservation[0].datePlaced : ""}</p>
                <label htmlFor="from">Starting Date:</label>
                <input type="date" value={reservation[0] !== undefined ? reservation[0].dateFrom : ""} required id="dateFrom" name="from" onChange={handleFieldChange} /> <br />
                <label htmlFor="to">Ending Date:</label>
                <input type="date" value={reservation[0] !== undefined ? reservation[0].dateTo : ""} required id="dateTo" name="to" onChange={handleFieldChange} />
            </section>
            <section className="form--submit">
                <button onClick={updateRes} disabled={isLoading} type="submit">Submit Changes</button>
            </section>
        </main>
    );
}