export interface PopulationData {
    record?: Record<string, any>;
}
export interface PopulationDataLoadMatch {
    delimiter?: string;
    refine?: string;
    where?: string;
}
export interface PopulationDataListMatch {
    exclude?: string;
    limit?: number;
    offset?: number;
    order_by?: string;
    refine?: string;
    select?: string;
    where?: string;
}
