import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { withAuthentication } from './components/Session';

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

const App = () => (
    <Router>
        <Navigation />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/clients" component={Clients} />
        <Route path="/sale" component={Sale} />
        <Route path="/sellers" component={Sellers} />
        <Route path="/settings" component={Settings} />
        <Route path="/statistics" component={Statistics} />
        <Route path="/stock" component={Stock} />
        <Route path="/pwd_forget" component={PasswordForget} />
        <Route component={NotFound} />
      </Switch>
    </Router>
);

// export default withAuthentication(App);

export default App;