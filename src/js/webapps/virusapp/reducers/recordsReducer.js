/**
 * Created by Monster on 2020-03-16.
 */



import { createAction,handleActions } from 'redux-actions';
import {combineReducers} from 'redux';
import * as Actions from "../actions/virusActions"




const recordsState = {

    initRecords:false,


    availableCountries:{},
    availableDates:[],




};

export const recordsStateReducer = handleActions({


/*
    [Actions.initAppState.SUCCESS]: (state, action) => {

        const {country,dayRecords} = action.payload;
        let totalRecordsCompileDaysOrder=[];
        //like date ,newCases,newDeaths,totalCases,totalDeaths
        let totalRecordsCompileDaysMap=new Map();

        let totalCases = 0;
        let totalDeaths = 0;
        let regionsList = dayRecords.map(record=>{
            if(totalRecordsCompileDaysOrder.indexOf(record.date)===-1){
                totalRecordsCompileDaysOrder.push(record.date)
            }

            totalCases+=record.newCases;
            totalDeaths+=record.newDeaths;
            let savedRecord = totalRecordsCompileDaysMap.get(record.date);
            if(typeof savedRecord ==="undefined"){
                savedRecord = {date:record.date,region:false,newCases:record.newCases,newDeaths:record.newDeaths};
            }else{
                savedRecord.newCases +=record.newCases;
                savedRecord.newDeaths+=record.newDeaths
            }
            savedRecord.totalCases=totalCases;
            savedRecord.totalDeaths=totalDeaths;

            totalRecordsCompileDaysMap.set(record.date,savedRecord);

            return record.region
        });

        regionsList = regionsList.filter((elem, index, self)=>{
            return index === self.indexOf(elem);
        });






        //count for day and total country
        let regionRecordsCompile=[];




        return {
            ...state,
            initRecords:true,
            country,
            rawDayRecords:dayRecords,
            regionsList,

            totalRecordsCompileDaysOrder,
            totalRecordsCompileDaysMap


        }

    },*/

    [Actions.processRawData.SUCCESS]: (state, action) => {

        const {data,header} = action.payload;

        let availableDates = [];
        let availableCountries = {};
        //countries that have engought data to generate a regretions
        let availableCountriesForCompareRegretion = [];

        header.forEach((col,index)=>{

            if(index>0){

                availableDates.push({date:col,index:index});
            }



        });

        data.forEach((row,index)=>{
         //   console.debug("ROW = ",row);

                const countryName= row[0];
                availableCountries[countryName]= {label:countryName,value:countryName,index:index};

               // availableCountries.push({name:row[1],index});
                //count the leading number of zeros
                let numberNotZeros = 0;

                for(let d = 1;d < row.length;d++){
                    const value =  Number.parseInt(row[d]);
                    if(value>0){
                        numberNotZeros++
                    }

                }
                if(numberNotZeros>30){
                        //its ok add
                    availableCountriesForCompareRegretion.push(index);
                }



        });

     //   console.debug("Countries = ",availableCountries)

       // console.debug("Valid comp = ",availableCountriesForCompareRegretion.length)


        return {
            ...state,
            initRecords:true,

            availableDates,
            availableCountries,
            availableCountriesForCompareRegretion,


        }

    }

},recordsState);

