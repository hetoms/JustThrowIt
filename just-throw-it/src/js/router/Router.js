import React from 'react'
import {Switch, Route} from 'react-router-dom'
import PickFieldContainer from "../field/PickFieldContainer";
import SetPlayerNames from "../home/SetPlayerNames";
import FieldScoretable from "../field/FieldScoretableContainer";
import HomePage from "../home/HomePage";


const Router = () => (
    <main>
        <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route exact path='/addplayers' component={SetPlayerNames}/>
            <Route exact path='/pickField' component={PickFieldContainer}/>
			<Route exact path='/fieldScoretable' component={FieldScoretable}/>
		</Switch>
    </main>
);

export default Router;
