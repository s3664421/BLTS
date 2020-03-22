import { Moment } from 'moment';
import { IPlant } from 'app/shared/model/plant.model';

export interface IPlantCase {
  id?: number;
  timeOpened?: Moment;
  timeClosed?: Moment;
  status?: string;
  open?: boolean;
  plant?: IPlant;
}

export const defaultValue: Readonly<IPlantCase> = {
  open: false
};
