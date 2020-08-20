import React from 'react';
import { Link, NavLink } from 'react-router-dom';
// import firebase from 'firebase/app';
// import 'firebase/auth';

const Navigation = ({user}) => {
    // const [user, setUser] = useState("");

    // useEffect(()=>{
    //     firebase.auth().onAuthStateChanged((user)=>{
    //         user? setUser(user.email): setUser(null)
    //     })
    // },[]);

    const handleCheckSignIn = () => {
           return (user != null) ? <NavigationAuth user={user} /> : <NavigationNonAuth />
    };

    return(
        <header>
            {handleCheckSignIn()}
        </header>
    )
};

const NavigationAuth = ({user}) => {

    return (
        <ul className="top-menu">
            <li className="li-logo">
                <Link className="main-logo" to="/sale">WroFER </Link>
            </li>
            <li>
                <NavLink activeClassName="active" exact to="/sale">Sprzedaż</NavLink>
            </li>
            <li>
                <NavLink activeClassName="active" to="/stock">Magazyn</NavLink>
            </li>
            <li>
                <NavLink activeClassName="active" to="/products">Produkty</NavLink>
            </li>
            <li>
                <NavLink activeClassName="active" to="/sellers">Przedstawiciele</NavLink>
            </li>
            <li>
                <NavLink activeClassName="active" to="/clients">Klienci</NavLink>
            </li>
            <li>
                <NavLink activeClassName="active" to="/statistics">Statystyki</NavLink>
            </li>
            <li>
                <NavLink activeClassName="active" to="/settings">Ustawienia</NavLink>
            </li>
            <li>
                <span>{user}</span>
            </li>
        </ul>
    );
};
const NavigationNonAuth = ({user}) => (
    <ul className="top-menu">
        <li className="li-logo">
            <Link className="main-logo" to="/">WroFER </Link>
        </li>
        <li>
            {/*<span>{"Zaloguj się"}</span>*/}
        </li>
    </ul>
);

export default Navigation;