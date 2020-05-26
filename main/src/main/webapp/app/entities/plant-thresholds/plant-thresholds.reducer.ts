import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPlantThresholds, defaultValue } from 'app/shared/model/plant-thresholds.model';
import { IPlant, defaultValue as defaultPlantValue } from 'app/shared/model/plant.model';

export const ACTION_TYPES = {
  FETCH_PLANTTHRESHOLDS_LIST: 'plantThresholds/FETCH_PLANTTHRESHOLDS_LIST',
  FETCH_PLANTTHRESHOLDS: 'plantThresholds/FETCH_PLANTTHRESHOLDS',
  CREATE_PLANTTHRESHOLDS: 'plantThresholds/CREATE_PLANTTHRESHOLDS',
  UPDATE_PLANTTHRESHOLDS: 'plantThresholds/UPDATE_PLANTTHRESHOLDS',
  DELETE_PLANTTHRESHOLDS: 'plantThresholds/DELETE_PLANTTHRESHOLDS',
  RESET: 'plantThresholds/RESET',
  FETCH_PLANT_BY_THRESHOLDS: 'plantThresholds/FETCH_PLANT_BY_THRESHOLDS'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPlantThresholds>,
  entity: defaultValue,
  plant: defaultPlantValue,
  updating: false,
  updateSuccess: false
};

export type PlantThresholdsState = Readonly<typeof initialState>;

// Reducer

export default (state: PlantThresholdsState = initialState, action): PlantThresholdsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PLANTTHRESHOLDS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PLANTTHRESHOLDS):
    case REQUEST(ACTION_TYPES.FETCH_PLANT_BY_THRESHOLDS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PLANTTHRESHOLDS):
    case REQUEST(ACTION_TYPES.UPDATE_PLANTTHRESHOLDS):
    case REQUEST(ACTION_TYPES.DELETE_PLANTTHRESHOLDS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PLANTTHRESHOLDS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PLANTTHRESHOLDS):
    case FAILURE(ACTION_TYPES.CREATE_PLANTTHRESHOLDS):
    case FAILURE(ACTION_TYPES.UPDATE_PLANTTHRESHOLDS):
    case FAILURE(ACTION_TYPES.DELETE_PLANTTHRESHOLDS):
    case FAILURE(ACTION_TYPES.FETCH_PLANT_BY_THRESHOLDS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PLANTTHRESHOLDS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PLANTTHRESHOLDS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PLANT_BY_THRESHOLDS):
      return {
        ...state,
        loading: false,
        plant: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PLANTTHRESHOLDS):
    case SUCCESS(ACTION_TYPES.UPDATE_PLANTTHRESHOLDS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PLANTTHRESHOLDS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/plant-thresholds';
const plantApiUrl = 'api/plants';

// Actions

export const getEntities: ICrudGetAllAction<IPlantThresholds> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PLANTTHRESHOLDS_LIST,
  payload: axios.get<IPlantThresholds>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IPlantThresholds> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PLANTTHRESHOLDS,
    payload: axios.get<IPlantThresholds>(requestUrl)
  };
};

export const getPlant: ICrudGetAction<IPlant> = id => {
  const requestUrl = `${plantApiUrl}/thresholds/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PLANT_BY_THRESHOLDS,
    payload: axios.get<IPlant>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPlantThresholds> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PLANTTHRESHOLDS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPlantThresholds> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PLANTTHRESHOLDS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPlantThresholds> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PLANTTHRESHOLDS,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
