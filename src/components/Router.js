import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import App from './App';
import Form from './Form';
import Dashboard from './Dashboard';
import Login from './Login';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path ="/" component={App}/>
      <Route path ="/home" component={Form}/>
      <Route path ="/dashboard" component={Dashboard}/>
      <Route path ="/login" component={Login}/>
    </Switch>
  </BrowserRouter>
);

export default Router;