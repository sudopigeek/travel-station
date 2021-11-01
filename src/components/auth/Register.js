import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";

export const Register = ({ setAuthUser, destination = "/" }) => {
    const [registerUser, setRegisterUser] = useState({name: "", email: ""});
    const [conflictDialog, setConflictDialog] = useState(false);
    const history = useHistory();
    const handleInputChange = (event) => {
        const newUser = { ...registerUser };
        newUser[event.target.id] = event.target.value;
        setRegisterUser(newUser);
    };
    const existingUserCheck = () => {
        // If your json-server URL is different, please change it below!
        return fetch(`http://localhost:8088/users?email=${registerUser.email}`)
            .then((res) => res.json())
            .then((user) => !!user.length);
    };
    const handleRegister = (e) => {
        e.preventDefault();
        existingUserCheck().then((userExists) => {
            if (!userExists) {
                fetch("http://localhost:8088/users", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: registerUser.email,
                        name: registerUser.name,
                        isAdmin: false
                    }),
                }).then((res) => res.json()).then((createdUser) => {
                    if (createdUser.hasOwnProperty("id")) {
                        setAuthUser(createdUser.name, createdUser.id, createdUser.isAdmin);
                        history.push(destination);
                    }
                });
            } else {
                setConflictDialog(true);
            }
        });
    };
    return (
        <main className="registerForm">
            <dialog className="dialog dialog--password" open={conflictDialog}>
                <div>Account with that email address already exists.</div>
                <button className="button--close" onClick={(e) => setConflictDialog(false)}>Close</button>
            </dialog>
            <section className="form">
                <form className="form--login" onSubmit={handleRegister}>
                    <h2 className="form--header">Register at Paradise Campgrounds</h2>
                    <section>
                        <label htmlFor="name"> Full Name </label>
                        <input type="text" name="name" id="name" className="form-control" placeholder="Full Name" required autoFocus value={registerUser.name} onChange={handleInputChange} />
                    </section>
                    <section>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email" name="email" id="email" className="form-control" placeholder="Email address" required value={registerUser.email} onChange={handleInputChange}/>
                    </section>
                    <section>
                        <button type="submit">Register</button>
                    </section>
                </form>
                <section className="link--login">
                    <p>Already have an account? <Link to="/signin">Sign In</Link></p>
                </section>
            </section>
        </main>
    );
};