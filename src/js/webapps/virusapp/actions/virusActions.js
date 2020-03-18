import { createAction,handleAction } from 'redux-actions';
import { createRoutine } from 'redux-saga-routines';


/**
 * Services
 */





export const changeSimulation = createAction('CHANGE_SIMULATION');
export const processRawData = createRoutine('PROCESS_RAW_DATA');