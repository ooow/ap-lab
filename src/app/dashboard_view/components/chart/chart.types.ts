export type ChartDataType = {
  fieldNames: any[]; data: Array<(string | number)[]>;
};

export type ChartConfigsType = Record<string, unknown>;

export enum ChartType {
  PIE_CHART = 'PieChart',
  BAR_CHART = 'BarChart'
}
