import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getAllCampingSpots, getAllReservations, createReservation, getAllSpotTypes } from "../../modules/APIManager";
import { validateDate } from "../../modules/Dates";

export const ReserveSite = () => {
    const [spotTypes, setSpotTypes] = useState([]);
    const history = useHistory();
    const getTimes = (elements) => {
        const date = new Date()
        return { placed: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(), from: elements[0].value, to: elements[1].value }
    }
    const getAmenities = (elements) => {
        const obj = { electric: null, water: null, septic: null }
        elements.forEach(elem => {
            switch (elem.id) {
                case "electric":
                    obj.electric = elem.checked;
                    break;
                case "water":
                    obj.water = elem.checked;
                    break;
                case "septic":
                    obj.septic = elem.checked;
                    break;
                default:
                    break;
            }
        })
        return obj;
    }
    const containsId = (reservationArray, id) => {
        reservationArray.forEach(res => {
            if (res.campingSpot.id === id) {
                return true;
            }
        })
        return false;
    }
    const handleReservation = (e) => {
        e.preventDefault();
        const elements = Array.from(e.target);
        const spotType = elements.filter((elem) => { return elem.type === "radio" && elem.checked })[0].value;
        const times = getTimes(elements.filter((elem) => { return elem.type === "date" && (elem.id === "from" || elem.id === "to")}));
        const matchingSpots = []
        // First, define the return object with the current userId and entered dates:
        const resObj = { userId: parseInt(sessionStorage.getItem("userId")), datePlaced: times.placed, dateFrom: times.from, dateTo: times.to, campingSpotId: null }
        getAllCampingSpots().then(spots => {
            // Then, filter through all camping spots, get the ones that have the selected amenities, and push them to matchingSpots:
            const amenities = getAmenities(elements.filter((elem) => { return elem.type === "checkbox" }));
            Array.from(spots).filter((spot) => { return spot.spotType.type === spotType && spot.hasElectric === amenities.electric && spot.hasSeptic === amenities.septic && spot.hasWater === amenities.water }).forEach(s => {
                matchingSpots.push(s);
            })
        })
        getAllReservations().then(reservations => {
            // Next, filter through all reservations and ensure the entered time frame doesn't collide with the iterated reservation,
            // and then filter through the returned reservations and set resArray with the spots that don't contain spot ids from resArr:
            if (reservations.length > 0) {
                const resArr = Array.from(reservations).filter((reservation) => { return validateDate(reservation.dateFrom, reservation.dateTo, resObj.dateFrom, resObj.dateTo) === true })
                const resArray = matchingSpots.filter(spot => { return containsId(resArr, spot.id) === false })
                if (resArray.length === 0) {
                    window.alert("There aren't any available camping spots with the selected date and amenities.")
                } else {
                    resObj.campingSpotId = resArray[0].id;
                    createReservation(resObj).then(() => {
                        history.push("/reservations");
                    })
                }
            } else {
                resObj.campingSpotId = matchingSpots[0].id;
                createReservation(resObj).then(() => {
                    history.push("/reservations");
                })
            }
        })
    }
    const getSpotTypes = () => {
        getAllSpotTypes().then(types => {
            setSpotTypes(types);
        })
    }
    useEffect(() => {
        getSpotTypes();
    }, [])

    return (
        <main className="container--reserveSite">
            <section>
                <form className="form--reserveSite" onSubmit={handleReservation}>
                    <h1>Reserve a Campsite</h1>
                    <h4>Camping Spot Type:</h4>
                    <section className="form--spotType"> 
                        {spotTypes.length > 0 ? spotTypes.map((spot, index) => 
                        <>
                            <label key={index + spot.id} htmlFor={spot.type.toLowerCase()}>{spot.type}</label>
                            <input type="radio" id={spot.type.toLowerCase()} required name="spotType" value={spot.type} /><br />
                        </>
                        ):null}
                    </section>
                    <section className="form--amenities">
                        <h4>Amenities:</h4>
                        <label htmlFor="electric">Electric</label>
                        <input type="checkbox" id="electric" name="electric" value="Electric" /><br />
                        <label htmlFor="water">Water</label>
                        <input type="checkbox" id="water" name="water" value="Water" /><br />
                        <label htmlFor="septic">Septic</label>
                        <input type="checkbox" id="septic" name="septic" value="Septic" /><br />
                    </section>
                    <section className="form--dates">
                        <h4>Reservation Date:</h4>
                        <label htmlFor="from">Starting Date:</label>
                        <input type="date" required id="from" name="from" /> <br />
                        <label htmlFor="to">Ending Date:</label>
                        <input type="date" required id="to" name="to" />
                    </section>
                    <section className="form--submit">
                        <button type="submit">Make Reservation</button>
                    </section>
                </form>
            </section>
        </main>
    );
}