import { PopulationDataEntity } from './entity/PopulationDataEntity';
export type * from './ThurgauPopulationDataTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { ThurgauPopulationDataEntityBase } from './ThurgauPopulationDataEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class ThurgauPopulationDataSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    PopulationData(entopts?: Record<string, any>): PopulationDataEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): ThurgauPopulationDataSDK;
    tester(testopts?: any, sdkopts?: any): ThurgauPopulationDataSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof ThurgauPopulationDataSDK;
export { stdutil, config, BaseFeature, ThurgauPopulationDataEntityBase, ThurgauPopulationDataSDK, SDK, };
