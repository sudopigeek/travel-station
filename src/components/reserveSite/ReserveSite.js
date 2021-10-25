import React, { useState } from "react";

export const ReserveSite = ({}) => {
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

    const handleReservation = (e) => {
        e.preventDefault();
        let times = getTimes(e.target);
        let resObj = {
            userId: sessionStorage.getItem("userId"),
            datePlaced: times.placed,
            dateFrom: times.from,
            dateTo: times.to,
            campingSpotId: null
        }
        let spotType = getSpotType(e.target)
        console.log(resObj);
    }

    return (
        <main className="container--reserveSite">
            <section>
                <form className="form--reserveSite" onSubmit={handleReservation}>
                    <h1>Reserve a Campsite</h1>
                    <section className="form--spotType">
                        <h4>Camping Spot Type:</h4>
                        <label for="tent">Tent</label>
                        <input type="radio" id="tent" required name="spotType" value="Tent" /><br />
                        <label for="l_tent">Large Tent</label>
                        <input type="radio" id="l_tent" required name="spotType" value="Large Tent" /><br />
                        <label for="rv">RV</label>
                        <input type="radio" id="rv" required name="spotType" value="RV" /><br />
                        <label for="l_rv">Large RV</label>
                        <input type="radio" id="l_rv" required name="spotType" value="Large RV" /><br />
                        <label for="5th_wheel">5th Wheel</label>
                        <input type="radio" id="5th_wheel" required name="spotType" value="5th Wheel" /><br />
                    </section>
                    <section className="form--amenities">
                        <h4>Amenities:</h4>
                        <label for="electric">Electric</label>
                        <input type="checkbox" id="electric" name="electric" value="Electric" /><br />
                        <label for="water">Water</label>
                        <input type="checkbox" id="water" name="water" value="Water" /><br />
                        <label for="septic">Septic</label>
                        <input type="checkbox" id="septic" name="septic" value="Septic" /><br />
                    </section>
                    <section className="form--dates">
                        <h4>Reservation Date:</h4>
                        <label for="from">Starting Date:</label>
                        <input type="datetime-local" required id="from" name="from" /> <br />
                        <label for="to">Ending Date:</label>
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