import React from 'react'
import {Switch, Route} from 'react-router-dom'
import PickFieldContainer from "../field/PickFieldContainer";
import SetPlayerNames from "../home/SetPlayerNames";
import FieldScoretable from "../field/FieldScoretableContainer";
import HomePage from "../home/HomePage";
import Login from "../auth/Login";
import Register from "../auth/Register";
import AccountPage from "../home/AccountPage";
import GameTypeSelection from "../home/GameTypeSelection";

const Router = () => (
  <main>
    <Switch>
      <Route exact path='/' component={HomePage}/>
      <Route exact path='/login' component={Login}/>
      <Route exact path='/register' component={Register}/>
      <Route exact path='/addplayers' component={SetPlayerNames}/>
      <Route exact path='/pickField' component={PickFieldContainer}/>
      <Route exact path='/fieldScoretable' component={FieldScoretable}/>
      <Route exact path='/user' component={AccountPage}/>
      <Route exact path='/gametype' component={GameTypeSelection}/>
    </Switch>
  </main>
);

export default Router;
