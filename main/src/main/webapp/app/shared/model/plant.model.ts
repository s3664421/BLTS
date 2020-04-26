import { IPlantThresholds } from 'app/shared/model/plant-thresholds.model';
import { IPlantCase } from 'app/shared/model/plant-case.model';
import { ICustomer } from 'app/shared/model/customer.model';

// plant.reducer imports 'plant.model' to  obtain/edit the values assigned to each plant variable
export interface IPlant {
  id?: number;
  name?: string;
  description?: string;
  location?: string;
  sensorID?: string;
  plantthresholds?: IPlantThresholds;
  plantcases?: IPlantCase[];
  customer?: ICustomer;
  avgTemp?: number;
  avgHumidity?: number;
  avgLight?: number;
  avgMoisture?: number;
}

export const defaultValue: Readonly<IPlant> = {};
