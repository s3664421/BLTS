import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import plant, {
  PlantState
} from 'app/entities/plant/plant.reducer';
// prettier-ignore
import plantThresholds, {
  PlantThresholdsState
} from 'app/entities/plant-thresholds/plant-thresholds.reducer';
// prettier-ignore
import dataReading, {
  DataReadingState
} from 'app/entities/data-reading/data-reading.reducer';
// prettier-ignore
import plantCase, {
  PlantCaseState
} from 'app/entities/plant-case/plant-case.reducer';
// prettier-ignore
import customer, {
  CustomerState
} from 'app/entities/customer/customer.reducer';
// prettier-ignore
import dashboard, {
  DashboardState
} from 'app/entities/dashboard/dashboard.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly plant: PlantState;
  readonly plantThresholds: PlantThresholdsState;
  readonly dataReading: DataReadingState;
  readonly plantCase: PlantCaseState;
  readonly customer: CustomerState;
  readonly dashboard: DashboardState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  plant,
  plantThresholds,
  dataReading,
  plantCase,
  customer,
  dashboard,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
