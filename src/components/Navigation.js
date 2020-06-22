import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
// import SignOutButton from '../SignOut';
// import * as ROUTES from '../../constants/routes';
// import { AuthUserContext } from './Session';
import firebase from 'firebase/app';
import 'firebase/auth';
const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};
firebase.initializeApp(config);

const showLogin = () => {
    firebase.auth().onAuthStateChanged((e)=>console.log(e))
};


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

const NavigationAuth = () => {
   const [user, setUser] = useState("");

   useEffect(()=>{
       firebase.auth().onAuthStateChanged((user)=>{
           user? setUser(user.email): setUser("zaloguj")
       })
   },[]);

    return (
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
                <span>{user}</span>
            </li>
        </ul>
    );
}
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