import { combineReducers } from 'redux';

import storage from 'localforage';


import {simulationReducer} from "./simulationReducer";

import {recordsStateReducer} from "./recordsReducer"

import { persistReducer } from 'redux-persist';

const persistSimulationConfig={
    key: 'simulation',
    storage: storage,
   // blacklist: ['showProductGallery','showProductImage','currentImage']
};


export const rootReducer = combineReducers({


    records:recordsStateReducer,
    simulation:persistReducer(persistSimulationConfig,simulationReducer),

   // notifications:notifications

});
