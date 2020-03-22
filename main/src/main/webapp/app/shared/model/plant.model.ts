import { ISensor } from 'app/shared/model/sensor.model';

export interface IPlant {
  id?: number;
  name?: string;
  description?: string;
  location?: string;
  sensor?: ISensor;
}

export const defaultValue: Readonly<IPlant> = {};
