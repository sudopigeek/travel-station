import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";

export const Register = ({ setAuthUser, destination = "/" }) => {
    const [registerUser, setRegisterUser] = useState({name: "", password: "", confirmPassword: "", email: ""});
    const [conflictDialog, setConflictDialog] = useState(false);
    const [passwordDialog, setPasswordDialog] = useState(false);
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
        if (registerUser.password === registerUser.confirmPassword) {
            existingUserCheck().then((userExists) => {
                if (!userExists) {
                    fetch("http://localhost:8088/users", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email: registerUser.email,
                            name: registerUser.name,
                            password: registerUser.password,
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
        } else {
            setPasswordDialog(true);
        }
    };
    return (
        <main className="registerForm">
            <dialog className="dialog dialog--password" open={conflictDialog}>
                <div>Account with that email address already exists</div>
                <button className="button--close" onClick={(e) => setConflictDialog(false)}>Close</button>
            </dialog>
            <dialog className="dialog dialog--password" open={passwordDialog}>
                <div>Passwords have to match!</div>
                <button className="button--close" onClick={(e) => setPasswordDialog(false)}>OK</button>
            </dialog>
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
                    <label htmlFor="password"> Password </label>
                    <input type="password" name="password" id="password" className="form-control" placeholder="Password" required value={registerUser.password} onChange={handleInputChange}/>
                </section>
                <section>
                    <label htmlFor="password_confirm"> Confirm Password </label>
                    <input type="password" name="password_confirm" id="confirmPassword" className="form-control" placeholder="Confirm Password" required value={registerUser.confirmPassword} onChange={handleInputChange}/>
                </section>
                <section>
                    <button type="submit">Register</button>
                </section>
            </form>
            <section className="link--login">
                <Link to="/signin">Sign In</Link>
            </section>
        </main>
    );
};