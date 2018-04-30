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
import LobbyActionView from "../gamelobby/LobbyActionView";
import LobbyCreation from "../gamelobby/LobbyCreation";
import LobbyJoin from "../gamelobby/LobbyJoin";

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
      <Route exact path='/lobby' component={LobbyActionView}/>
      <Route exact path='/create-lobby' component={LobbyCreation}/>
      <Route exact path='/join-lobby' component={LobbyJoin}/>
    </Switch>
  </main>
);

export default Router;
