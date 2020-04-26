import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDashboard, defaultValue } from 'app/shared/model/dashboard.model';
import { IPlantCase } from 'app/shared/model/plant-case.model';
import { IUser } from 'app/shared/model/user.model';

export const ACTION_TYPES = {
  FETCH_DASHBOARD_LIST: 'dashboard/FETCH_DASHBOARD_LIST',
  FETCH_DASHBOARD: 'dashboard/FETCH_DASHBOARD',
  CREATE_DASHBOARD: 'dashboard/CREATE_DASHBOARD',
  UPDATE_DASHBOARD: 'dashboard/UPDATE_DASHBOARD',
  DELETE_DASHBOARD: 'dashboard/DELETE_DASHBOARD',
  FETCH_UNASSIGNED_CASE: 'dashboard/FETCH_UNASSIGNED_CASE',
  FETCH_ACTIVE_CASE: 'dashboard/FETCH_ACTIVE_CASE',
  RESET: 'dashboard/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDashboard>,
  unassignedCases: [] as Array<IPlantCase>,
  employeeCases: [] as ReadonlyArray<IPlantCase>,
  getEmployees : [] as ReadonlyArray<IUser>,
  users : [] as ReadonlyArray<IUser>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type DashboardState = Readonly<typeof initialState>;

// Reducer

export default (state: DashboardState = initialState, action): DashboardState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DASHBOARD_LIST):
    case REQUEST(ACTION_TYPES.FETCH_UNASSIGNED_CASE):
    case REQUEST(ACTION_TYPES.FETCH_ACTIVE_CASE):
    case REQUEST(ACTION_TYPES.FETCH_DASHBOARD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DASHBOARD):
    case REQUEST(ACTION_TYPES.UPDATE_DASHBOARD):
    case REQUEST(ACTION_TYPES.DELETE_DASHBOARD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DASHBOARD_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DASHBOARD):
    case FAILURE(ACTION_TYPES.CREATE_DASHBOARD):
    case FAILURE(ACTION_TYPES.UPDATE_DASHBOARD):
    case FAILURE(ACTION_TYPES.DELETE_DASHBOARD):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DASHBOARD_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_DASHBOARD):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DASHBOARD):
    case SUCCESS(ACTION_TYPES.UPDATE_DASHBOARD):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DASHBOARD):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
      case SUCCESS(ACTION_TYPES.FETCH_UNASSIGNED_CASE):
      return {
        ...state,
        loading: false,
        unassignedCases: action.payload.data
      };

      case SUCCESS(ACTION_TYPES.FETCH_ACTIVE_CASE):
        return {
          ...state,
          loading: false,
          employeeCases: action.payload.data
        };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/dashboards';
const plantCaseAPIUrl = 'api/plant-case';

// Actions

export const getEntities: ICrudGetAllAction<IDashboard> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_DASHBOARD_LIST,
  payload: axios.get<IDashboard>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IDashboard> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DASHBOARD,
    payload: axios.get<IDashboard>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IDashboard> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DASHBOARD,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDashboard> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DASHBOARD,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDashboard> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DASHBOARD,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const getUnassignedCases: ICrudGetAllAction<IPlantCase> = id => {
  const requestUrl = `${plantCaseAPIUrl}/unassigned`;
  return {
    type: ACTION_TYPES.FETCH_UNASSIGNED_CASE,
    payload: axios.get<IPlantCase>(requestUrl)
  };
};

export const getAllActiveCases: ICrudGetAllAction<IPlantCase> = id => {
  const requestUrl = `${plantCaseAPIUrl}/active`;
  return {
    type: ACTION_TYPES.FETCH_ACTIVE_CASE,
    payload: axios.get<IPlantCase>(requestUrl)
  };
};



export const reset = () => ({
  type: ACTION_TYPES.RESET
});
