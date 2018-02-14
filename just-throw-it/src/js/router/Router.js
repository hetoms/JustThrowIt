import React from 'react'
import {Switch, Route} from 'react-router-dom'
import PickFieldContainer from "../field/PickFieldContainer";

const Router = () => (
    <main>
        <Switch>
            <Route exact path='/' component={PickFieldContainer}/>
        </Switch>
    </main>
);

export default Router;
