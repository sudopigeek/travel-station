import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";

export const Login = ({ setAuthUser, destination }) => {
    const [loginUser, setLoginUser] = useState("");
    const [existDialog, setExistDialog] = useState(false);
    const history = useHistory();
    const handleInputChange = (event) => {
        const newUser = { ...loginUser };
        newUser[event.target.id] = event.target.value;
        setLoginUser(newUser);
    };
    const existingUserCheck = () => {
        // If your json-server URL is different, please change it below!
        return fetch(`http://localhost:8088/users?email=${loginUser.email}`)
            .then((res) => res.json())
            .then((user) => (user.length ? user[0] : false));
    };
    const handleLogin = (e) => {
        e.preventDefault();
        existingUserCheck().then((exists) => {
            if (exists) {
                setAuthUser(exists.name, exists.id, exists.isAdmin)
                history.push(destination);
            } else {
                setExistDialog(true);
            }
        });
    };
    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" open={existDialog}>
                <div>{"User does not exist"}</div>
                <button className="button--close" onClick={(e) => setExistDialog(false)}>Close</button>
            </dialog>
            <section className="form">
                <form className="form--login" onSubmit={handleLogin}>
                    <h2>{"Sign In"}</h2>
                    <section className="form--input">
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email" id="email" className="form-control" placeholder="Email address" required autoFocus value={loginUser} onChange={handleInputChange}/>
                    </section>
                    <section className="form--input">
                        <button type="submit">Sign in</button>
                    </section>
                </form>
                <section className="link--register">
                    <Link to="/register">{"Register for an account"}</Link>
                </section>
            </section>
        </main>
    );
};