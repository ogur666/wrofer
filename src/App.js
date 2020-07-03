import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Clients from "./components/Clients";
import Landing from "./components/Landing";
import Sale from "./components/Sale";
import Sellers from "./components/Sellers";
import Settings from "./components/Settings";
import Statistics from "./components/Statistics";
import Stock from "./components/Stock";
import NotFound from "./components/NotFound";
import Navigation from "./components/Navigation";
import PasswordForget from "./components/PasswordForget"
import Products from "./components/Products";
import Logout from "./components/Logout";
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


const App = () => {
    const [user, setUser] = useState("");

    useEffect(()=>{
        firebase.auth().onAuthStateChanged((user)=>{
            user? setUser(user.email): setUser(null)
        })
    },[]);


    const handleCheckLogin = () => {

        return (user != null) ?
            <Router>
                <Navigation user={user}/>
                <Switch>
                    <Route exact path="/" component={Sale} />
                    <Route path="/clients" component={Clients} />
                    <Route path="/sale" component={Sale} />
                    <Route path="/sellers" component={Sellers} />
                    <Route path="/products" component={Products} />
                    <Route path="/settings" component={Settings} />
                    <Route path="/statistics" component={Statistics} />
                    <Route path="/stock" component={Stock} />
                    <Route path="/pwd_forget" component={PasswordForget} />
                    <Route component={NotFound} />
                </Switch>
            </Router>
            : <Router>
                <Navigation user={user}/>
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route path="/settings" component={Logout} />
                    <Route path="/pwd_forget" component={PasswordForget} />
                    <Route component={NotFound} />
                </Switch>
            </Router>
        // )
    };

    return (
        <>
            {handleCheckLogin()}
        </>
    )
};

export default App;