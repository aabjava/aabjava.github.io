

import createSagaMiddleware from 'redux-saga';
import { routinePromiseWatcherSaga } from 'redux-saga-routines';

import {createStore,applyMiddleware,compose} from 'redux';

import {rootReducer} from '../reducers/reducer';

import * as VirusSagas from "../sagas/virusSagas"

import { persistReducer,persistStore } from 'redux-persist';


const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export let store = createStore(rootReducer,composeEnhancers(
    applyMiddleware(sagaMiddleware,
       /* loggerMiddleware*/),

));

export const persistor = persistStore(store);

const sagas = [

                VirusSagas.watchProcessRawData,

                routinePromiseWatcherSaga];

sagas.forEach(sagaMiddleware.run);




