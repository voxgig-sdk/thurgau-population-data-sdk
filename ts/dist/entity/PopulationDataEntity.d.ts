import { ThurgauPopulationDataEntityBase } from '../ThurgauPopulationDataEntityBase';
import type { ThurgauPopulationDataSDK } from '../ThurgauPopulationDataSDK';
import type { Control } from '../types';
import type { PopulationData, PopulationDataLoadMatch, PopulationDataListMatch } from '../ThurgauPopulationDataTypes';
declare class PopulationDataEntity extends ThurgauPopulationDataEntityBase<PopulationData> {
    constructor(client: ThurgauPopulationDataSDK, entopts: any);
    make(this: PopulationDataEntity): PopulationDataEntity;
    load(this: any, reqmatch?: PopulationDataLoadMatch, ctrl?: Control): Promise<PopulationDataEntity>;
    list(this: any, reqmatch?: PopulationDataListMatch, ctrl?: Control): Promise<PopulationDataEntity[]>;
}
export { PopulationDataEntity };
