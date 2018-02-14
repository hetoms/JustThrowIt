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

const store = createStore(AppReducer, composeWithDevTools());

store.subscribe(() => {
    console.log(store.getState());
});

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();
