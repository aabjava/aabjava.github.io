import "babel-polyfill";
import React from 'react';
import ReactDom from 'react-dom';
//import flatten from "flat";
//langs
//import { addLocaleData} from 'react-intl';


//TODO: add here the langs we want this as nothing to do with the translations files but the treatment of the languages
//as some difer

//import pt from "react-intl/locale-data/pt";

// Our translated strings
//defined the localData url form use in the general reducer lang
import servicesData from './emailTempatesSupportedLangs';
/*import errorsLangs from "../errorsSupportedLangs";*/
import * as Utils from "../../common/utils/Util"

//LANG ARRAY WITH TRANSLACTION FROM VARIABLE PLACES
const langArray = [servicesData];
//console.debug("Service datas = "+JSON.stringify(servicesData))

import VirusApp from "./components/VirusAppComponent";


//addLocaleData([...pt]);
//defined the global variable localdata to be used by lang reducer
//window.localDataGlobal = localeData;

//build a supper component so we can change the langs
/**
 * Create the store
 */
import { Provider } from 'react-redux'
import {store} from './stores/virusStore';

//https://stackoverflow.com/questions/28067455/printing-html5-canvas-in-the-correct-size

/**
 * Init fabri
 */



ReactDom.render(
    <Provider store={store}>


            <div className="contentMainBlock">

                <VirusApp/>

            </div>


    </Provider>
    ,
    document.getElementById('root')
);



