import React from 'react'
import {Switch, Route} from 'react-router-dom'
import PickFieldContainer from "../field/PickFieldContainer";
import SetName from "../setname/SetName";

const Router = () => (
    <main>
        <Switch>
            <Route exact path='/' component={SetName}/>
            <Route exact path='/pickField' component={PickFieldContainer}/>
		</Switch>
    </main>
);

export default Router;
