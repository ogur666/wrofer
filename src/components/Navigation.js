import React from 'react';
import { Link } from 'react-router-dom';
// import SignOutButton from '../SignOut';
// import * as ROUTES from '../../constants/routes';
// import { AuthUserContext } from './Session';

const Navigation = () => (
    <header>
        {/*<AuthUserContext.Consumer>*/}
        {/*    {authUser =>*/}
        {/*        authUser ? */}
                    <NavigationAuth />
                    {/*: <NavigationNonAuth />*/}
            {/*}*/}
        {/*</AuthUserContext.Consumer>*/}
    </header>
);

const NavigationAuth = () => (
    <ul className="top-menu">
        <li className="li-logo">
            <Link className="main-logo" to="/">WroFER </Link>
        </li>
        <li>
            <Link to="/">Landing </Link>
        </li>
        <li>
            <Link to="/sale">Sprzedaż</Link>
        </li>
        <li>
            <Link to="/stock">Magazyn</Link>
        </li>
        <li>
            <Link to="/sellers">Handlowcy</Link>
        </li>
        <li>
            <Link to="/clients">Klienci</Link>
        </li>
        <li>
            <Link to="/statistics">Statystyki</Link>
        </li>
        <li>
            <Link to="/settings">Ustawienia</Link>
        </li>
        <li>
            <span >Login</span>
        </li>
    </ul>
);

// const NavigationNonAuth = () => (
//     <ul>
//         <li>
//             <Link to="/">Landing</Link>
//         </li>
//         {/*<li>*/}
//         {/*    <Link to={ROUTES.SIGN_IN}>Sign In</Link>*/}
//         {/*</li>*/}
//     </ul>
// );

export default Navigation;