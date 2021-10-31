import React, { useState, useEffect } from 'react';
import { getUserReservations, getAllReservations, deleteReservation, getAllSpotTypes } from "../../modules/APIManager";
import { ReservationCard } from './ReservationCard';

export const Reservations = ({ handleEdit }) => {
    const [reservations, setReservations] = useState([]);
    const [spotTypes, setSpotTypes] = useState([]);
    const admin = sessionStorage.getItem("isAdmin");
    const getReservations = () => {
        if (admin === "true") {
            return getAllReservations().then(reservation => {
                setReservations(reservation);
            })
        } else {
            return getUserReservations(sessionStorage.getItem("userId")).then(reservation => {
                setReservations(reservation);
            })
        }
    }
    const cancelReservation = id => {
        if (window.confirm("Are you sure you want to cancel?")) {
            deleteReservation(id).then(() => getReservations());
        }
    }
    const populateSpotTypes = () => {
        getAllSpotTypes().then(type => {
            setSpotTypes(type);
        })      
    }
    useEffect(() => {
        getReservations();
    }, []);
    useEffect(() => {
        populateSpotTypes();
    }, [reservations])
    return (
        <main className="reservations--container">
            {admin === "undefined" || admin === "false" ? <h2>Your Reservations:</h2> : <h2>Campsite Reservations:</h2>}
            {reservations.length > 0 ? reservations.reverse().map(reservation => <ReservationCard spotType={spotTypes} key={reservation.id + reservation.userId} handleEdit={handleEdit} cancel={cancelReservation} admin={admin === "undefined" || admin === "false" ? false : true} reservation={reservation} />) : <p>There aren't any reservations!</p>}
        </main>
    );
}