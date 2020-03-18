
import * as Actions from "../actions/virusActions"

import {  put ,takeLatest} from "redux-saga/effects"
import moment from "moment";


/**
 * Get raw csv data and treat it to a more friendly format
 * @param action
 */
function* processRawData(action) {


    const payload = action.payload;
    try{

            //we need to compile report for countries since some are by region
            const rawData = payload.records.data;

            let header = [...rawData[0]];

            header.shift();
            header.splice(1,1);
             header.splice(1,1);
             //change to nice date format
        for(let r = 1;r<header.length;r++){
            const poorDate = header[r];
            const realDate = moment(poorDate,'MM/DD/YY');
            header[r] = realDate.format('YYYY-MM-DD')
        }



            let newRawData = [];
            let indexByCountryName = {};

            for(let r = 1;r<rawData.length;r++){
                const row = rawData[r];
                //check if there is already a country defined
                const countryName = row[1];

                if(typeof indexByCountryName[countryName] !== 'undefined'){
                    //exists update
                    const index = indexByCountryName[countryName].index;
                    const compileCountryRow = newRawData[index];
                    for(let d = 4;d<compileCountryRow.length;d++){
                        //add
                        compileCountryRow[d]=compileCountryRow[d]+row[d];
                    }
                    newRawData[index] = compileCountryRow


                }else{
                    //create
                    const currentIndex = newRawData.length;
                    newRawData.push([...row]) ;
                    indexByCountryName[countryName]={index:currentIndex};
                }
            }

            //remove all the first column that is the territory
        for(let r=0;r<newRawData.length;r++){
                newRawData[r].shift();
                //remove the 2 and 3 geo coordinates
                 newRawData[r].splice(1,1);
                 newRawData[r].splice(1,1);

        }


            yield put(Actions.processRawData.success({data:newRawData,header}));

    }catch (e){
        yield put(Actions.processRawData.failure(e.message))
    }finally {
        yield put(Actions.processRawData.fulfill());

    }
}



export function* watchProcessRawData() {
    yield takeLatest(Actions.processRawData.TRIGGER,processRawData)
}


