import { createAction,handleAction,handleActions } from 'redux-actions';
import {combineReducers} from 'redux';

import * as LocalActions from "../actions/localstoreActions";


import {getBestMatchingSupportedLocalForLocale} from "../utils/productTranslationhelper";


/**
 * For this reducer to work is has to be present the localData map containing translactions in global variable
 */
//TODO: change this to save/load language from localstore
//load lang init state from cookies
//load from store




let lang = null;
let locale = null;
const defaultLang = 'pt-PT';
window.defaultInternationalLanguage=defaultLang;

//console.debug("Set language = "+lang)
const browserLanguageLocal = (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    navigator.userLanguage;


const currentLangsInit = {

    selectedLocale:defaultLang,
    actualLocale:defaultLang,
    loadedFromStore:false,
    loadedSpecificLanguageFile:false

};


const langReducer = handleActions({
   /* [GeneralActions.changeLang]:(state,action)=>{
        const chosenlocale = action.payload.locale;
        const actualLocale = getBestMatchingSupportedLocalForLocale(chosenlocale);
        return {
            ...state,
            selectedLocale:chosenlocale,
            actualLocale
        }

    },*/
   /* [LocalActions.loadItemLocalStore.SUCCESS]: (state, action) => {
     //check the type
     const payload = action.payload;

     if (payload.type === 'LANG') {
     if (payload.data !== null) {
     // console.debug("Loading lang from store to "+(payload.data));
     const loadedLocale = payload.data;

     //test local
     const actualLocale = getBestMatchingSupportedLocalForLocale(loadedLocale);

     return {
     ...state,
     selectedLocale:loadedLocale,
     actualLocale:actualLocale,
     loadedFromStore: true,
     }
     } else {
     const actualLocale = getBestMatchingSupportedLocalForLocale( browserLanguageLocal );
     return {
     ...state,
     selectedLocale:browserLanguageLocal,
     actualLocale:actualLocale,
     loadedFromStore: true,
     }
     }
     }
     return state
     },*/

   /* [GeneralActions.loadedSpecificLanguageFile]:(state,action)=>(


        {
            ...state,
            loadedSpecificLanguageFile:true

        }),*/

},currentLangsInit);






















const currentCurrencyInit = {
    currencyCode:'EUR',
    currencySymbol:'€',
    currencyConversion:false,
    loadedFromStore:false,
    convertToCurrency:{
        currencyCode:'USD',
        currencySymbol:'US$'
    }
};


const currentCurrencyReducer = handleActions({
    /*[GeneralActions.changeCurrency]: (state, action) => {

        const currencyConversion = action.payload.currencyConversion;
        console.debug("Currency conversion = "+currencyConversion)
        if (currencyConversion) {
            const currency = action.payload.currency;
            return {
                ...state,
                currencyConversion: action.payload.currencyConversion,
                convertToCurrency: {
                    currencyCode: currency.toCurrency,
                    currencySymbol: currency.toCurrencySymbol
                }
            }
        }


        return {
            ...state,
            currencyConversion: currencyConversion

        }
    },*/
    [LocalActions.loadItemLocalStore.SUCCESS]: (state, action) => {
        //check the type
        const payload = action.payload;

        if (payload.type === 'CURRENCY') {

            if (payload.data !== null) {

                const currentConversion = payload.data.currencyConversion;
                const currencyCode = payload.data.currencyCode;
                const currencySymbol = payload.data.currencySymbol;

                return {
                    ...state,
                    currencyConversion: currentConversion,
                    loadedFromStore:true,
                    convertToCurrency: {
                        currencyCode,
                        currencySymbol
                    }
                }
            }else{
                return {
                    ...state,
                    loadedFromStore:true,
                }
            }
        }
        return state
    },


},currentCurrencyInit);










/**
 * general reducers used in client and employee for controling lang and currency
 */


export const generalReducer = combineReducers({
    language:langReducer,
    currency:currentCurrencyReducer,

});