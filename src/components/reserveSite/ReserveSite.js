import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { getAllCampingSpots, getAllReservations, createReservation } from "../../modules/APIManager";
import { validateDate } from "../../modules/Dates";

export const ReserveSite = () => {
    const history = useHistory();
    const getSpotType = (elements) => {
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].type === "radio" && elements[i].checked === true) {
                return elements[i].value;
            }
        }
    }
    const getTimes = (elements) => {
        let obj = {placed: null, from: null, to: null}
        const date = new Date()
        obj.placed = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + 'T' + date.getHours() + ':' + date.getMinutes();
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].type === "datetime-local") {
                if (elements[i].id === "from") {
                    obj.from = elements[i].value;
                } else {
                    obj.to = elements[i].value;
                }
            }
        }
        return obj;
    }
    const getAmenities = (elements) => {
        let obj = {electric: null, water: null, septic: null}
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].type === "checkbox") {
                switch (elements[i].id) {
                    case "electric":
                        obj.electric = elements[i].checked;
                        break;
                    case "water":
                        obj.water = elements[i].checked;
                        break;
                    case "septic":
                        obj.septic = elements[i].checked;
                        break;
                    default:
                        break;
                }
            }
        }
        return obj;
    }
    const handleReservation = (e) => {
        e.preventDefault();
        let times = getTimes(e.target);
        let spotType = getSpotType(e.target)
        let matchingSpots = []
        let resObj = {
            userId: parseInt(sessionStorage.getItem("userId")),
            datePlaced: times.placed,
            dateFrom: times.from,
            dateTo: times.to,
            campingSpotId: null
        }
        getAllCampingSpots().then(spots => {
            let amenities = getAmenities(e.target);   
            for (let i = 0; i < spots.length; i++) {
                if (spots[i].spotType.type === spotType && 
                    spots[i].hasElectric === amenities.electric && 
                    spots[i].hasSeptic === amenities.septic && 
                    spots[i].hasWater === amenities.water) {
                    matchingSpots.push(spots[i]);
                }
            }
        })
        getAllReservations().then(reservations => {            
            for (let i = 0; i < reservations.length; i++) {
                if (validateDate(reservations[i].dateFrom, reservations[i].dateTo, resObj.dateFrom, resObj.dateTo)) {
                    for (let i2 = 0; i2 < matchingSpots.length; i2++) {
                        if (matchingSpots[i2].id === reservations[i].campingSpot.id) {
                            matchingSpots = matchingSpots.splice(i2, 1);
                        }
                    }
                }
            }
            if (matchingSpots.length === 0) {window.alert("There aren't any available camping spots with the selected date and amenities.")}
            resObj.campingSpotId = matchingSpots[0].id;
            console.log(resObj);
            createReservation(resObj).then(res => {
                history.push("/");
                //<Redirect to="/" />
            })
        })        
    }

    return (
        <main className="container--reserveSite">
            <section>
                <form className="form--reserveSite" onSubmit={handleReservation}>
                    <h1>Reserve a Campsite</h1>
                    <section className="form--spotType">
                        <h4>Camping Spot Type:</h4>
                        <label htmlFor="tent">Tent</label>
                        <input type="radio" id="tent" required name="spotType" value="Tent" /><br />
                        <label htmlFor="l_tent">Large Tent</label>
                        <input type="radio" id="l_tent" required name="spotType" value="Large Tent" /><br />
                        <label htmlFor="rv">RV</label>
                        <input type="radio" id="rv" required name="spotType" value="RV" /><br />
                        <label htmlFor="l_rv">Large RV</label>
                        <input type="radio" id="l_rv" required name="spotType" value="Large RV" /><br />
                        <label htmlFor="5th_wheel">5th Wheel</label>
                        <input type="radio" id="5th_wheel" required name="spotType" value="5th Wheel" /><br />
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
                        <input type="datetime-local" required id="from" name="from" /> <br />
                        <label htmlFor="to">Ending Date:</label>
                        <input type="datetime-local" required id="to" name="to" />
                    </section>
                    <section className="form--submit">
                        <button type="submit">Make Reservation</button>
                    </section>                   
                </form>
            </section>
        </main>
    );
}