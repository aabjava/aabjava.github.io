/**
 * Created by Monster on 2020-03-16.
 */



import { createAction,handleActions } from 'redux-actions';
import {combineReducers} from 'redux';
import * as Actions from "../actions/virusActions"




const simulationState = {

    rawData:[],
    primaryCountry:null,
    secondaryCountry:null,


    graphType:'totalGraph',
    primaryCountryDataSet:null,
    secondaryCountryDataSet:null,
    onlyLastXDays:false,
    lastXDays:20,

    simulate:true,
    useRegressionTypeIndex:1,
    simulationAddDays:5,
    useModelFromOtherCountry:null,
    fromDayWithGreaterThan:1,

    usePredictionFromDates:false,
    predictionFromDates:null





};

export const simulationReducer = handleActions({




    [Actions.changeSimulation]: (state, action) => {

        const {name,value} = action.payload;


        let obj = {};
        obj[name]=value;

        //get data for primary



        return {
            ...state,
            ...obj


        }

    },
    [Actions.processRawData.SUCCESS]: (state, action) => {

        const {data} = action.payload;



        return {
            ...state,
            rawData:data
        }


    }

},simulationState);


