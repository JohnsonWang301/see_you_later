import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
// import loggerMiddleware from 'redux-logger';
import {Provider} from 'react-redux';

import Main from 'components/Main.jsx';
import {unit, weather, weatherForm, forecast} from 'states/weather-reducers.js';
import {searchText, post, postForm, postItem} from 'states/post-reducers.js';
import {todoForm, todo} from 'states/todo-reducers.js';
import {main} from 'states/main-reducers.js';

import 'bootstrap/dist/css/bootstrap.css';

import Amplify from "aws-amplify";
import config from "./aws-exports";
Amplify.configure(config);

const federated = {
    googleClientId : "914920553832-fnvalgmpoc4hot0q9r70hpf720sn4cvk.apps.googleusercontent.com"
}
window.onload = function() {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(combineReducers({
        unit, weather, weatherForm, forecast,
        searchText, post, postForm, postItem,
        todoForm, todo,
        main,
    }), composeEnhancers(applyMiddleware(thunkMiddleware/*, loggerMiddleware*/)));

    
    ReactDOM.render(
        <Provider store={store}>
            <Main federated={federated}/>
        </Provider>,
        document.getElementById('root')
    );
};
