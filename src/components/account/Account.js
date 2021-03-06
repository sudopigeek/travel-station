import React, { useState, useEffect } from "react"
import { getUserByName } from "../../modules/APIManager"
import './Account.css';

export const Account = () => {
    const [account, setAccount] = useState({name: "", email: "", isAdmin: false});
    const getAccount = userName => {
        getUserByName(userName).then(data => { 
            setAccount({
                name: data[0].name,
                email: data[0].email,
                isAdmin: data[0].isAdmin
            }) 
        });
    }

    useEffect(() => {
        getAccount(sessionStorage.getItem("user"))
    }, [])

    return (
        <main className="account--container">
            <section className="account">
                {account.name !== "" ? 
                    <section>
                        <h3>Name: {account.name}</h3>
                        <p>Email: {account.email}</p>
                        <p>Account Type: {account.isAdmin ? <strong>Administrator</strong> : <strong>Visitor</strong>}</p>
                    </section> 
                : null}
            </section>
        </main>
    );
}