import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { getReservationById, updateReservation } from "../../modules/APIManager";
import { ConvertDate } from "../../modules/Dates";
import './ReservationEditForm.css';

export const ReservationEditForm = () => {
    const [reservation, setReservation] = useState({id: 0, datePlaced: "", dateFrom: "", dateTo: "", userId: 0, campingSpotId: 0});
    const [isLoading, setIsLoading] = useState(false);
    const [hasChanged, setHasChanged] = useState(false);
    const [changedDialog, setChangedDialog] = useState(false);
    
    const {reservationId} = useParams();
    const history = useHistory();
    const handleFieldChange = event => {
        const stateToChange = { ...reservation };
        stateToChange[0][event.target.id] = event.target.value;
        setReservation(stateToChange);
        setHasChanged(true);
    };
    const updateRes = event => {
        event.preventDefault();
        if (hasChanged) {
            setIsLoading(true);
            const editedReservation = {id: reservation[0].id, datePlaced: reservation[0].datePlaced, dateFrom: reservation[0].dateFrom, dateTo: reservation[0].dateTo, userId: parseInt(sessionStorage.getItem("userId")), campingSpotId: reservation[0].campingSpotId};
            updateReservation(editedReservation).then(() => {
                history.push("/reservations");
            })
        } else {
            setChangedDialog(true);
        }
    }
    useEffect(() => {
        getReservationById(reservationId).then(res => {
            setReservation(res);
            setIsLoading(false);
        })
    // eslint-disable-next-line
    }, [])
    return (
        <main className="editForm--container">
            <dialog className="dialog dialog--changes" open={changedDialog}>
                <div>{"There are no changes to submit"}</div>
                <button className="button--close" onClick={(e) => setChangedDialog(false)}>Close</button>
            </dialog>
            <section className="editForm">
                <section className="form--dates">
                    <h4>Edit Reservation Date:</h4>
                    <p>(Reservation placed on {reservation[0] !== undefined ? ConvertDate(reservation[0].datePlaced) : ""})</p>
                    <label htmlFor="from">Starting Date:</label>
                    <input type="date" value={reservation[0] !== undefined ? reservation[0].dateFrom : ""} required id="dateFrom" name="from" onChange={handleFieldChange} /> <br />
                    <label htmlFor="to">Ending Date:</label>
                    <input type="date" value={reservation[0] !== undefined ? reservation[0].dateTo : ""} required id="dateTo" name="to" onChange={handleFieldChange} />
                </section>
                <section className="form--submit">
                    <Link to="/reservations">
                        <button id="return">Return to Reservations</button>
                    </Link>
                    <button id="submit" onClick={updateRes} disabled={isLoading} type="submit">Submit Changes</button>
                </section>
            </section>
        </main>
    );
}