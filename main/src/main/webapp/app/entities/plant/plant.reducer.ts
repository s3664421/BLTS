import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPlant, defaultValue } from 'app/shared/model/plant.model';
import { IDataReading } from 'app/shared/model/data-reading.model'; // Import: The data reading model into plant reducer

export const ACTION_TYPES = {
  FETCH_PLANT_LIST: 'plant/FETCH_PLANT_LIST',
  FETCH_PLANT: 'plant/FETCH_PLANT',
  CREATE_PLANT: 'plant/CREATE_PLANT',
  UPDATE_PLANT: 'plant/UPDATE_PLANT',
  DELETE_PLANT: 'plant/DELETE_PLANT',
  RESET: 'plant/RESET',
  FETCH_DATA_READINGS: 'plant/FETCH_DATA_READINGS' // Have to create a new action type
};

// This state is all the variables we have on a plant page
const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPlant>,
  entity: defaultValue,
  dataReadings: [] as ReadonlyArray<IDataReading>,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PlantState = Readonly<typeof initialState>;

// Reducer

// Indication to whether specific action (from ACTION_TYPES) succeed's or fail's
export default (state: PlantState = initialState, action): PlantState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PLANT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PLANT):
    case REQUEST(ACTION_TYPES.FETCH_DATA_READINGS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PLANT):
    case REQUEST(ACTION_TYPES.UPDATE_PLANT):
    case REQUEST(ACTION_TYPES.DELETE_PLANT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PLANT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PLANT):
    case FAILURE(ACTION_TYPES.CREATE_PLANT):
    case FAILURE(ACTION_TYPES.UPDATE_PLANT):
    case FAILURE(ACTION_TYPES.DELETE_PLANT):
    case FAILURE(ACTION_TYPES.FETCH_DATA_READINGS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PLANT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PLANT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PLANT):
    case SUCCESS(ACTION_TYPES.UPDATE_PLANT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PLANT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case SUCCESS(ACTION_TYPES.FETCH_DATA_READINGS): // Success case is what actually gives you the data (this will modify state variable)
      return {
        ...state,
        loading: false,
        dataReadings: action.payload.data
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/plants';
const dataReadingApiUrl = 'api/data-readings'; // Hardcoded 'dataReadingApiUrl' here

// Actions

// Obtain list of all plants
export const getEntities: ICrudGetAllAction<IPlant> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PLANT_LIST,
    payload: axios.get<IPlant>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

// 'View' specific plant
export const getEntity: ICrudGetAction<IPlant> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PLANT,
    payload: axios.get<IPlant>(requestUrl)
  };
};

// Obtain list of dataReadings for specific plant
export const getAllDataReading = (plantID, fromDate, toDate) => {
  let requestUrl = `${dataReadingApiUrl}/sensor/${plantID}`;
  if (fromDate && toDate) {
    requestUrl += `/between/${fromDate}/${toDate}`;
  }
  return {
    type: ACTION_TYPES.FETCH_DATA_READINGS,
    payload: axios.get<IDataReading>(requestUrl)
  };
};

// Action to create a plant
export const createEntity: ICrudPutAction<IPlant> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PLANT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

// Action to update the plant
export const updateEntity: ICrudPutAction<IPlant> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PLANT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

// Action to delete a specific plant
export const deleteEntity: ICrudDeleteAction<IPlant> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PLANT,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
