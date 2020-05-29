import React from "react"
import './Navbar.css';


export const Navbar = () => {
    return (
        <header>
            <section  className="navbar-container">
                <img src={process.env.PUBLIC_URL + '/achat.png'} alt="" />
            </section>
        </header>
    )
}