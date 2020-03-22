import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDataReading, defaultValue } from 'app/shared/model/data-reading.model';

export const ACTION_TYPES = {
  FETCH_DATAREADING_LIST: 'dataReading/FETCH_DATAREADING_LIST',
  FETCH_DATAREADING: 'dataReading/FETCH_DATAREADING',
  CREATE_DATAREADING: 'dataReading/CREATE_DATAREADING',
  UPDATE_DATAREADING: 'dataReading/UPDATE_DATAREADING',
  DELETE_DATAREADING: 'dataReading/DELETE_DATAREADING',
  RESET: 'dataReading/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDataReading>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type DataReadingState = Readonly<typeof initialState>;

// Reducer

export default (state: DataReadingState = initialState, action): DataReadingState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DATAREADING_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DATAREADING):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DATAREADING):
    case REQUEST(ACTION_TYPES.UPDATE_DATAREADING):
    case REQUEST(ACTION_TYPES.DELETE_DATAREADING):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DATAREADING_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DATAREADING):
    case FAILURE(ACTION_TYPES.CREATE_DATAREADING):
    case FAILURE(ACTION_TYPES.UPDATE_DATAREADING):
    case FAILURE(ACTION_TYPES.DELETE_DATAREADING):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DATAREADING_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_DATAREADING):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DATAREADING):
    case SUCCESS(ACTION_TYPES.UPDATE_DATAREADING):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DATAREADING):
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

const apiUrl = 'api/data-readings';

// Actions

export const getEntities: ICrudGetAllAction<IDataReading> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_DATAREADING_LIST,
  payload: axios.get<IDataReading>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IDataReading> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DATAREADING,
    payload: axios.get<IDataReading>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IDataReading> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DATAREADING,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  console.error(entity);
  throw new Error(entity);
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDataReading> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DATAREADING,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDataReading> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DATAREADING,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
