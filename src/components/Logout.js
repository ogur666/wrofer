import React from 'react';
import { Link } from 'react-router-dom';

const Logout = () => {

    return (
        <main className="main-container">
            <section>
                <h1>Wylogowano!</h1>
                <Link to="/">Zaloguj się ponownie.</Link>
            </section>

        </main>
    )
};

export default Logout;