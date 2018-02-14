import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './js/app/App';
import registerServiceWorker from './registerServiceWorker';
import BrowserRouter from "react-router-dom/es/BrowserRouter";
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render((
    <BrowserRouter>
        <App/>
    </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
