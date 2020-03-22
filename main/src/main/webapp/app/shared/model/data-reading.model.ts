import { Moment } from 'moment';
import { ISensor } from 'app/shared/model/sensor.model';

export interface IDataReading {
  id?: number;
  time?: Moment;
  temp?: number;
  humidity?: number;
  light?: number;
  moisture?: number;
  sensor?: ISensor;
}

export const defaultValue: Readonly<IDataReading> = {};
