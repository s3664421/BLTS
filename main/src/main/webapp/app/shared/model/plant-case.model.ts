import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';
import { IPlant } from 'app/shared/model/plant.model';
import { AttentionItem } from 'app/shared/model/enumerations/attention-item.model';
import { CaseStatus } from 'app/shared/model/enumerations/case-status.model';

export interface IPlantCase {
  id?: number;
  needsAttention?: AttentionItem;
  timeOpened?: Moment;
  timeClosed?: Moment;
  status?: CaseStatus;
  caseNotes?: string;
  user?: IUser;
  plant?: IPlant;
}

export const defaultValue: Readonly<IPlantCase> = {};
