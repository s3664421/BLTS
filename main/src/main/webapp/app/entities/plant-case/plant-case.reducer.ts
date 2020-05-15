import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPlantCase, defaultValue } from 'app/shared/model/plant-case.model';

export const ACTION_TYPES = {
  FETCH_PLANTCASE_LIST: 'plantCase/FETCH_PLANTCASE_LIST',
  FETCH_PLANTCASE: 'plantCase/FETCH_PLANTCASE',
  CREATE_PLANTCASE: 'plantCase/CREATE_PLANTCASE',
  UPDATE_PLANTCASE: 'plantCase/UPDATE_PLANTCASE',
  DELETE_PLANTCASE: 'plantCase/DELETE_PLANTCASE',
  FETCH_STATS: 'plantCase/FETCH_STATS',
  RESET: 'plantCase/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPlantCase>,
  statentity: {},
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PlantCaseState = Readonly<typeof initialState>;

// Reducer

export default (state: PlantCaseState = initialState, action): PlantCaseState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PLANTCASE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_STATS):
    case REQUEST(ACTION_TYPES.FETCH_PLANTCASE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PLANTCASE):
    case REQUEST(ACTION_TYPES.UPDATE_PLANTCASE):
    case REQUEST(ACTION_TYPES.DELETE_PLANTCASE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PLANTCASE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PLANTCASE):
    case FAILURE(ACTION_TYPES.CREATE_PLANTCASE):
    case FAILURE(ACTION_TYPES.UPDATE_PLANTCASE):
    case FAILURE(ACTION_TYPES.DELETE_PLANTCASE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PLANTCASE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PLANTCASE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };

      case SUCCESS(ACTION_TYPES.FETCH_STATS):
    
      return {
        ...state,
        loading: false,
        statentity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PLANTCASE):
    case SUCCESS(ACTION_TYPES.UPDATE_PLANTCASE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PLANTCASE):
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
      case FAILURE(ACTION_TYPES.FETCH_STATS):
      
        break;
    default:
      return state;
  }
};

const apiUrl = 'api/plant-cases';

// Actions

export const getEntities: ICrudGetAllAction<IPlantCase> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PLANTCASE_LIST,
    payload: axios.get<IPlantCase>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getStats : ICrudGetAllAction<string> = () => {
  const requestUrl = `${apiUrl}/stats/getstats`;

  return {
    type: ACTION_TYPES.FETCH_STATS,
    payload: axios.get(requestUrl)
  };
};

export const getEntity: ICrudGetAction<IPlantCase> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PLANTCASE,
    payload: axios.get<IPlantCase>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPlantCase> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PLANTCASE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPlantCase> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PLANTCASE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPlantCase> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PLANTCASE,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
