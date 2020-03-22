import { IPlant } from 'app/shared/model/plant.model';

export interface IRequirments {
  id?: number;
  tempLow?: number;
  tempHigh?: number;
  humidityLow?: number;
  humidityHigh?: number;
  lightLow?: number;
  lightHigh?: number;
  moistureLow?: number;
  moistureHigh?: number;
  plant?: IPlant;
}

export const defaultValue: Readonly<IRequirments> = {};
