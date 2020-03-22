import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IRequirments, defaultValue } from 'app/shared/model/requirments.model';

export const ACTION_TYPES = {
  FETCH_REQUIRMENTS_LIST: 'requirments/FETCH_REQUIRMENTS_LIST',
  FETCH_REQUIRMENTS: 'requirments/FETCH_REQUIRMENTS',
  CREATE_REQUIRMENTS: 'requirments/CREATE_REQUIRMENTS',
  UPDATE_REQUIRMENTS: 'requirments/UPDATE_REQUIRMENTS',
  DELETE_REQUIRMENTS: 'requirments/DELETE_REQUIRMENTS',
  RESET: 'requirments/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IRequirments>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type RequirmentsState = Readonly<typeof initialState>;

// Reducer

export default (state: RequirmentsState = initialState, action): RequirmentsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_REQUIRMENTS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_REQUIRMENTS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_REQUIRMENTS):
    case REQUEST(ACTION_TYPES.UPDATE_REQUIRMENTS):
    case REQUEST(ACTION_TYPES.DELETE_REQUIRMENTS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_REQUIRMENTS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_REQUIRMENTS):
    case FAILURE(ACTION_TYPES.CREATE_REQUIRMENTS):
    case FAILURE(ACTION_TYPES.UPDATE_REQUIRMENTS):
    case FAILURE(ACTION_TYPES.DELETE_REQUIRMENTS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_REQUIRMENTS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_REQUIRMENTS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_REQUIRMENTS):
    case SUCCESS(ACTION_TYPES.UPDATE_REQUIRMENTS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_REQUIRMENTS):
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

const apiUrl = 'api/requirments';

// Actions

export const getEntities: ICrudGetAllAction<IRequirments> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_REQUIRMENTS_LIST,
  payload: axios.get<IRequirments>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IRequirments> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_REQUIRMENTS,
    payload: axios.get<IRequirments>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IRequirments> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_REQUIRMENTS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IRequirments> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_REQUIRMENTS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IRequirments> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_REQUIRMENTS,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
