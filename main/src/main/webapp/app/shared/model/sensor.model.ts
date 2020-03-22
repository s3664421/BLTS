import { IUser } from 'app/shared/model/user.model';

export interface ISensor {
  id?: number;
  sensorNo?: string;
  description?: string;
  user?: IUser;
}

export const defaultValue: Readonly<ISensor> = {};
