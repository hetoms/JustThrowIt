import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './js/app/App';
import registerServiceWorker from './registerServiceWorker';
import BrowserRouter from "react-router-dom/es/BrowserRouter";
import 'bootstrap/dist/css/bootstrap.css';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createStore} from 'redux';
import Provider from "react-redux/es/components/Provider";
import AppReducer from "./js/app/AppReducer";
import {saveState} from "./js/localstorage/SaveToLocalStorage";
import {loadState} from "./js/localstorage/LoadFromLocalStorage";

const preSavedState = loadState();
const store = createStore(AppReducer, preSavedState, composeWithDevTools());

store.subscribe(() => {
    console.log(store.getState());
    saveState(store.getState())
});

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();
