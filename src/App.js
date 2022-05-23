import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Wallet from './pages/Wallet';

function App() {
  return (
    <Switch>
      <Route path="/trybewallet" component={ Login } />
      <Route path="/carteira" component={ Wallet } />
      <Route path="/404" component={ NotFound } />
      <Redirect to="/404" />
    </Switch>
  );
}

export default App;
