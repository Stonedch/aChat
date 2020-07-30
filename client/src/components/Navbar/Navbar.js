import React from "react"

import styles from './Navbar.module.css'


export const Navbar = () => {
    return (
        <header>
            <section  className={styles.navbar_container}>
                <img src={process.env.PUBLIC_URL + '/achat.png'} alt="logo" className={styles.logo} />
            </section>
        </header>
    )
}