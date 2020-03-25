import { IPlantThresholds } from 'app/shared/model/plant-thresholds.model';
import { IPlantCase } from 'app/shared/model/plant-case.model';
import { ICustomer } from 'app/shared/model/customer.model';

export interface IPlant {
  id?: number;
  name?: string;
  description?: string;
  location?: string;
  sensorID?: string;
  plantthresholds?: IPlantThresholds;
  plantcases?: IPlantCase[];
  customer?: ICustomer;
}

export const defaultValue: Readonly<IPlant> = {};
