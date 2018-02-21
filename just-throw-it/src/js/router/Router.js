import React from 'react'
import {Switch, Route} from 'react-router-dom'
import PickFieldContainer from "../field/PickFieldContainer";
import SetName from "../setname/SetName";
import FieldScoretable from "../field/FieldScoretableContainer";


const Router = () => (
    <main>
        <Switch>
            <Route exact path='/' component={SetName}/>
            <Route exact path='/pickField' component={PickFieldContainer}/>
			<Route exact path='/fieldScoretable' component={FieldScoretable}/>
		</Switch>
    </main>
);

export default Router;
