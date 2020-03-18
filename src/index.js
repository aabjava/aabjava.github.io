
import "./stylesheets/styles.scss";

import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDom from 'react-dom';

import VirusApp from "./js/webapps/virusapp/components/VirusAppComponent";
import { PersistGate } from 'redux-persist/lib/integration/react';

import { Provider } from 'react-redux'
import {store,persistor} from './js/webapps/virusapp/stores/virusStore';

ReactDom.render(
    <Provider store={store}>

        <PersistGate loading={<div>Carregando Loja</div>} persistor={persistor}>
        <div className="contentMainBlock">

            <VirusApp/>

        </div>

        </PersistGate>


    </Provider>
    ,
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
