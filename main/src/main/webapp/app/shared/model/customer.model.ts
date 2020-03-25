import { IUser } from 'app/shared/model/user.model';
import { IPlant } from 'app/shared/model/plant.model';
import { State } from 'app/shared/model/enumerations/state.model';

export interface ICustomer {
  id?: number;
  address?: string;
  postcode?: number;
  city?: string;
  state?: State;
  phoneNo?: string;
  user?: IUser;
  plants?: IPlant[];
}

export const defaultValue: Readonly<ICustomer> = {};
