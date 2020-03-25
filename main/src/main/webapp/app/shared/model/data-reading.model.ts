import { Moment } from 'moment';
import { IPlant } from 'app/shared/model/plant.model';

export interface IDataReading {
  id?: number;
  time?: Moment;
  temp?: number;
  humidity?: number;
  light?: number;
  moisture?: number;
  plant?: IPlant;
}

export const defaultValue: Readonly<IDataReading> = {};
