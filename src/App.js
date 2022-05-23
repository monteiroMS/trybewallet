import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Wallet from './pages/Wallet';

function App() {
  return (
    <Switch>
      <Route path="/trybewallet" component={ Login } />
      <Route path="/trybewallet/carteira" component={ Wallet } />
      <Route path="/trybewallet/404" component={ NotFound } />
      <Redirect to="/trybewallet/404" />
    </Switch>
  );
}

export default App;
